# Yayın: eatalay.dev

`main`'e her gönderimde `.github/workflows/deploy.yml` siteyi sunucuya yayımlar. Düzen Hatim App'ten
(`hatim-app/web/deploy/`) uyarlandı. Sunucu, üzerinde çalışan diğer sitelerle paylaşılır.

| | eatalay.dev | Diğer siteler (dokunulmaz) |
|---|---|---|
| Klasör | `/srv/eatalay` (`releases/`, `current` → son sürüm) | `/srv/huzuruislam`, `/srv/hatim` |
| pm2 süreci | `eatalay` | `huzuruislam`, `hatim`, `hatim-api` |
| Port | `3030` (yalnız nginx'ten erişilir) | `3010`, `3020`, `3021` |
| nginx | `/etc/nginx/sites-available/eatalay.dev` | kendi dosyaları |
| Kayıtlar | `/var/log/nginx/eatalay.*.log`, 14 gün | |

Ortak olanlar: nginx, certbot, root'un bun'ı (`/root/.bun/bin/bun`, en az 1.4.2) ve pm2.

## Bir yayında ne olur

1. Lint ve tip denetimi çalışır. Biri başarısızsa yayın yapılmaz ve canlı site değişmez.
2. `bun run build` çalışır (`output: "standalone"`). `.next/standalone/` içine `.next/static/` ve `public/` kopyalanır.
3. Paket GitHub'da bun ile çalıştırılır; ana adreslerin ve görüntü iyileştirmenin (`/_next/image`) çalıştığı denetlenir.
4. Paket rsync ile `releases/<commit>/` altına gönderilir. Değişmeyen dosyalar önceki sürümden bağlanır.
5. `current` yeni sürüme çevrilir, ardından `pm2 startOrReload` çalışır.
6. Sağlık kontrolü: önce `localhost:3030` üzerinden sayfalar, OG görselleri, robots, sitemap, manifest;
   sonra nginx üzerinden `https://eatalay.dev/`. Biri 200 dönmezse önceki sürüme kendiliğinden dönülür.
7. Son 5 sürüm tutulur, eskileri silinir.

Yalnız `.md` dosyası değişen gönderimler yayın başlatmaz. Elle başlatmak için: **Actions → deploy → Run workflow**.

## İlk kurulum (bir kez)

Varsayım: sunucu x86_64 Debian/Ubuntu. Eksik olan (nginx, certbot, bun, node + pm2, pm2'nin açılışta başlaması)
kurulum betiği tarafından kurulur; kurulu olan yeniden kurulmaz.

**1. DNS.** `eatalay.dev` ve `www.eatalay.dev` için A kaydı sunucunun IP'sini göstermeli (şu an gösteriyor).

**2. Yayın anahtarı ve sırlar.** Kendi bilgisayarında, `<IP>` yerine sunucunun adresini yaz.

Sunucuda yalnız bu iş için bir anahtar üretip root'a yetki ver. Gizli yarısı doğrudan GitHub sırrına gider,
ekrana yazılmaz:

```bash
ssh root@<IP> "ssh-keygen -t ed25519 -N '' -C eatalay-deploy -f ~/.ssh/eatalay_deploy -q && cat ~/.ssh/eatalay_deploy.pub >> ~/.ssh/authorized_keys && cat ~/.ssh/eatalay_deploy" | gh secret set DEPLOY_SSH_KEY -R emrahatalay/eatalay_dev
```

```bash
gh secret set DEPLOY_HOST -R emrahatalay/eatalay_dev --body "<IP>"
```

```bash
gh secret set DEPLOY_USER -R emrahatalay/eatalay_dev --body root
```

İsteğe bağlı sırlar:
- `DEPLOY_KNOWN_HOSTS`: `ssh-keyscan -t ed25519 <IP>` çıktısı. Yoksa sunucunun anahtarı her bağlantıda alınır.
- `CERTBOT_EMAIL`: Let's Encrypt süre bildirimleri için bir e-posta adresi.

Sırlar eklenene kadar `deploy` iş akışı çalışır ama yayını atlar.

**3. Sunucuyu hazırla: Actions → sunucu-kurulum → Run workflow.** `deploy/kurulum.sh` şunları yapar:
- Eksik paketleri kurar, bun'ı en az 1.4.2 yapar, pm2 yoksa kurar ve açılışta başlamasını sağlar.
- 3030 numaralı portun boş olduğunu denetler.
- `/srv/eatalay` klasörünü açar ve logrotate ayarını kurar.
- Bu alan adı için elle yazılmış eski bir nginx dosyası varsa `/root/nginx-yedek/` altına yedekleyip kaldırır
  (dosya başka alan adlarına da hizmet veriyorsa dokunmaz ve durur).
- DNS sunucuyu gösteriyorsa HTTPS sertifikasını alır ve `nginx.conf`'u kurar.

Diğer sitelerin ayarlarına dokunmaz. Yeni nginx ayarı `nginx -t`'den geçmezse eski hâline döner. Tekrar çalıştırmak güvenlidir.

**4. İlk yayın: Actions → deploy → Run workflow** (ya da `main`'e bir gönderim).

**5. Güvenlik duvarı.** 3030 dışarıya kapalı olmalı. Kurulum betiği paylaşılan sunucuda güvenlik duvarını değiştirmez,
yalnız durumunu yazar. Bakmak için:

```bash
ssh root@<IP> "ufw status | head -20"
```

ufw kapalıysa ve sunucuda dışarıya açık olması gereken başka port yoksa:

```bash
ssh root@<IP> "ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable"
```

## Sorun giderme

```bash
ssh root@<IP> "export PATH=\$PATH:/root/.bun/bin; pm2 describe eatalay; pm2 logs eatalay --lines 80 --nostream"
```

**Elle önceki sürüme dönmek:**

```bash
ssh root@<IP> "cd /srv/eatalay && ls -1t releases"
```

```bash
ssh root@<IP> "cd /srv/eatalay && ln -sfn releases/<sürüm> current.yeni && mv -T current.yeni current && PATH=\$PATH:/root/.bun/bin pm2 startOrReload ecosystem.config.cjs --update-env"
```

**Hatalarda dikkat edilecekler:**
- **Her sayfa 500 veriyor:** sunucudaki bun 1.4.2'den eski olabilir (`bun-guncelle.sh` yükseltir) ya da `HOSTNAME`
  `127.0.0.1` yapılmış olabilir (`0.0.0.0` kalmalı; açıklaması `ecosystem.config.cjs` içinde).
- **Port değişecekse** dört dosya birlikte değişir: `ecosystem.config.cjs`, `nginx.conf`, `kurulum.sh` ve `deploy.yml`.
