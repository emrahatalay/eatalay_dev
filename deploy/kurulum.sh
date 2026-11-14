#!/usr/bin/env bash
# eatalay.dev sunucu kurulumu (Debian 12/13, Ubuntu 24.04; x86_64). root olarak çalışır, tekrar çalıştırılabilir.
# Normalde .github/workflows/sunucu-kurulum.yml çalıştırır; elle: sudo bash deploy/kurulum.sh
# Boş bir sunucuda her şeyi kurar (nginx, certbot, bun, node + pm2, ufw). Kurulu olanlar yeniden kurulmaz ve başka
# sitelerin nginx ayarlarına dokunulmaz; sunucu başka sitelerle paylaşılabilir.
# Adımların açıklaması: deploy/KURULUM.md
set -euo pipefail

ALAN=eatalay.dev
KOK=/srv/eatalay
PORT=3030
SUREC=eatalay
ISARET=eatalay-kurulum
# Let's Encrypt süre bildirimi için isteğe bağlı: EPOSTA=ad@ornek.com bash kurulum.sh
EPOSTA="${EPOSTA:-}"
BURASI="$(cd "$(dirname "$0")" && pwd)"
export DEBIAN_FRONTEND=noninteractive
export PATH="$PATH:/usr/local/bin:/root/.bun/bin"

adim() { printf '\n==> %s\n' "$*"; }

adim "Paketler"
apt-get update -q
apt-get install -y -q nginx libnginx-mod-http-brotli-filter libnginx-mod-http-brotli-static \
  certbot rsync curl ca-certificates logrotate

adim "bun"
bash "$BURASI/bun-guncelle.sh"

adim "pm2"
# pm2'nin kendisi node ile çalışır (site bun ile çalışır). Kurulu değilse dağıtımın node'u ve npm ile kurulur.
if ! command -v pm2 >/dev/null; then
  command -v node >/dev/null && command -v npm >/dev/null || apt-get install -y -q nodejs npm
  npm install -g pm2
fi
pm2 --version
# Sunucu yeniden başlayınca pm2 ve kayıtlı süreçler (pm2 save) kendiliğinden açılsın.
if ! systemctl is-enabled pm2-root >/dev/null 2>&1; then
  pm2 startup systemd -u root --hp /root
fi
# Aynı adla eski bir süreç başka klasörden çalışıyorsa silinir: pm2 reload cwd/script değişikliğini almaz.
if pm2 describe "$SUREC" >/dev/null 2>&1; then
  eski_cwd="$(pm2 jlist | bun -e 'const l=JSON.parse(await Bun.stdin.text());const p=l.find(x=>x.name===process.argv[1]);console.log(p?.pm2_env?.pm_cwd??"")' "$SUREC" || true)"
  if [ "$eski_cwd" != "$KOK/current" ]; then
    echo "Eski pm2 süreci '$SUREC' ($eski_cwd) siliniyor."
    pm2 delete "$SUREC" && pm2 save
  fi
fi

adim "Port $PORT"
dinleyen="$(ss -ltnpH "sport = :$PORT" 2>/dev/null || true)"
if [ -n "$dinleyen" ] && ! echo "$dinleyen" | grep -q bun; then
  echo "HATA: $PORT numaralı portu başka bir süreç kullanıyor; site orada çalışamaz:"
  echo "$dinleyen"
  echo "O süreci durdurun ya da ecosystem.config.cjs, nginx.conf, kurulum.sh ve deploy.yml'de portu değiştirin."
  exit 1
fi

adim "Güvenlik duvarı"
# 3030 dışarıya kapalı olmalı (yalnız nginx'ten erişilir). Sunucu başka sitelerle paylaşıldığı için güvenlik duvarı
# burada açılmaz ya da değiştirilmez; yalnız durumu yazılır (açmak: deploy/KURULUM.md).
if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw status | head -20
  ufw status | grep -qE "^($PORT|Anywhere)[/ ].*ALLOW" && echo "UYARI: $PORT dışarıya açık görünüyor."
else
  echo "UYARI: ufw etkin değil; $PORT dışarıdan da erişilebilir (deploy/KURULUM.md → Güvenlik duvarı)."
fi

adim "Klasörler ve logrotate"
install -d -m 755 "$KOK" "$KOK/releases"
install -m 644 "$BURASI/logrotate.conf" /etc/logrotate.d/eatalay

adim "nginx ve HTTPS"
# Sunucunun mevcut ayarı zaten bozuksa (ör. sites-enabled'da kırık bağlantı) hiçbir şeye dokunulmadan durulur:
# aksi hâlde yeni ayarın denetimi başarısız görünür ve asıl sorun gözden kaçar.
if ! nginx -t 2>/tmp/eatalay-nginx-t.log; then
  grep -E "emerg|failed" /tmp/eatalay-nginx-t.log || cat /tmp/eatalay-nginx-t.log
  echo "HATA: sunucunun mevcut nginx ayarı eatalay.dev'e dokunulmadan önce de geçmiyor; önce yukarıdaki sorun giderilmeli."
  kirik="$(find /etc/nginx/sites-enabled -xtype l 2>/dev/null || true)"
  [ -z "$kirik" ] || echo "sites-enabled'daki kırık bağlantılar: $kirik"
  exit 1
fi
install -d /var/www/certbot
# Görsel önbelleği (deploy/nginx.conf → proxy_cache_path): nginx yalnız son klasörü kendisi açar.
install -d -m 700 -o www-data -g www-data /var/cache/nginx/eatalay_img
SITE=/etc/nginx/sites-available/$ALAN
SERTIFIKA=/etc/letsencrypt/live/$ALAN/fullchain.pem

# Bu alan adı için elle kurulmuş eski yapılandırmalar (işaretsiz) yedeklenip devreden çıkarılır.
# Dosya başka alan adlarına da hizmet veriyorsa dokunulmaz ve kurulum durur: diğer siteler bozulmasın.
YEDEK=/root/nginx-yedek/$(date +%Y%m%d-%H%M%S)
geri_al() {
  [ -d "$YEDEK" ] || return 0
  echo "Eski yapılandırmalar geri konuyor ($YEDEK)."
  # Bağlantıysa (sites-enabled → sites-available) asıl dosya yerinde duruyor; yalnız bağlantı yeniden kurulur.
  while IFS=$'\t' read -r yol hedef; do
    if [ "$yol" != "$hedef" ] && [ -f "$hedef" ]; then ln -sf "$hedef" "$yol"; else cp -a "$YEDEK/$(basename "$yol")" "$yol"; fi
  done < "$YEDEK/liste.tsv"
  systemctl reload nginx || true
}
eskiler="$(grep -RlsE "server_name[^;]*[[:space:]]$ALAN[;[:space:]]" /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null \
  | xargs -r grep -L "$ISARET" 2>/dev/null || true)"
for dosya in $eskiler; do
  baska="$(grep -hE '^[[:space:]]*server_name' "$dosya" | sed -E 's/^[[:space:]]*server_name//; s/;//' | tr ' ' '\n' \
    | grep -vE "^(|$ALAN|www\.$ALAN)$" | sort -u || true)"
  if [ -n "$baska" ]; then
    echo "HATA: $dosya başka alan adlarına da hizmet veriyor ($baska); elle ayrılmalı."
    exit 1
  fi
  install -d -m 700 "$YEDEK"
  gercek="$(readlink -f "$dosya")"
  cp -a "$gercek" "$YEDEK/$(basename "$dosya")"
  printf '%s\t%s\n' "$dosya" "$gercek" >> "$YEDEK/liste.tsv"
  echo "Eski yapılandırma yedeklendi ve kaldırıldı: $dosya → $YEDEK"
  echo "--- içeriği:"; cat "$gercek"; echo "---"
  rm -f "$dosya"
done

ln -sf "$SITE" /etc/nginx/sites-enabled/$ALAN

# Sertifika yokken: yalnız Let's Encrypt doğrulaması ve siteye düz HTTP.
# default_server kullanılmaz; aynı sunucudaki diğer siteler etkilenmesin.
gecici_yapilandirma() {
  cat > "$SITE" <<EOF
# $ISARET: geçici yapılandırma, sertifika alınınca deploy/nginx.conf ile değiştirilir.
server {
    listen 80;
    listen [::]:80;
    server_name $ALAN www.$ALAN;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF
  if ! nginx -t; then
    echo "HATA: geçici nginx yapılandırması geçmedi; kaldırıldı."
    rm -f "$SITE" "/etc/nginx/sites-enabled/$ALAN"; geri_al; exit 1
  fi
  systemctl reload nginx
}

if [ ! -f "$SERTIFIKA" ]; then
  gecici_yapilandirma
  SUNUCU_IP="$(curl -fsS4 https://api.ipify.org || true)"
  dns_tamam=true
  for ad in "$ALAN" "www.$ALAN"; do
    ip="$(getent ahostsv4 "$ad" | awk '{print $1; exit}' || true)"
    echo "$ad → ${ip:-yok} (sunucu: ${SUNUCU_IP:-bilinmiyor})"
    [ -n "$ip" ] && [ "$ip" = "$SUNUCU_IP" ] || dns_tamam=false
  done
  if $dns_tamam; then
    if [ -n "$EPOSTA" ]; then eposta_secenegi=(-m "$EPOSTA" --no-eff-email); else eposta_secenegi=(--register-unsafely-without-email); fi
    certbot certonly --webroot -w /var/www/certbot -d "$ALAN" -d "www.$ALAN" --cert-name "$ALAN" \
      --non-interactive --agree-tos "${eposta_secenegi[@]}"
  else
    echo "UYARI: $ALAN ve www.$ALAN henüz bu sunucuyu göstermiyor; HTTPS kurulmadı."
    echo "DNS kayıtları düzeltildikten sonra bu iş akışını yeniden çalıştırın."
  fi
fi

if [ -f "$SERTIFIKA" ]; then
  # certbot'un nginx eklentisi kurulu olmadığında bu dosya yoktur; Mozilla'nın "intermediate" ayarlarıyla yazılır.
  [ -f /etc/letsencrypt/options-ssl-nginx.conf ] || cat > /etc/letsencrypt/options-ssl-nginx.conf <<'EOF'
ssl_session_cache shared:le_nginx_SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;
EOF
  # Yeni yapılandırma hatalıysa eskisi geri konur: bozuk bir dosya sunucudaki tüm sitelerin nginx yenilemesini durdurur.
  cp "$SITE" "$SITE.onceki" 2>/dev/null || true
  install -m 644 "$BURASI/nginx.conf" "$SITE"
  if ! nginx -t; then
    echo "HATA: nginx yapılandırması geçmedi; önceki dosyaya dönülüyor."
    if [ -f "$SITE.onceki" ]; then mv "$SITE.onceki" "$SITE"; else rm -f "$SITE" "/etc/nginx/sites-enabled/$ALAN"; geri_al; fi
    exit 1
  fi
  rm -f "$SITE.onceki"
  systemctl reload nginx
  install -d /etc/letsencrypt/renewal-hooks/deploy
  printf '#!/bin/sh\nsystemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/nginx-reload
  chmod 755 /etc/letsencrypt/renewal-hooks/deploy/nginx-reload
  # Önceden alınmış sertifika www'yi kapsamıyorsa genişletilir (doğrulama yukarıda kurulan 80 bloğundan yapılır).
  if ! openssl x509 -in "$SERTIFIKA" -noout -ext subjectAltName | grep -q "DNS:www.$ALAN"; then
    echo "Sertifika www.$ALAN adını kapsamıyor; genişletiliyor."
    if [ -n "$EPOSTA" ]; then eposta_secenegi=(-m "$EPOSTA" --no-eff-email); else eposta_secenegi=(--register-unsafely-without-email); fi
    certbot certonly --webroot -w /var/www/certbot -d "$ALAN" -d "www.$ALAN" --cert-name "$ALAN" --expand \
      --non-interactive --agree-tos "${eposta_secenegi[@]}"
    systemctl reload nginx
  fi
  echo "HTTPS hazır."
fi

adim "Bitti"
echo "Site ilk yayında pm2 ile başlar (deploy iş akışı). Durum: pm2 describe $SUREC"
