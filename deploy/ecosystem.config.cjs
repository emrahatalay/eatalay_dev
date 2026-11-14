// eatalay.dev: pm2 süreç tanımı (deploy iş akışı /srv/eatalay/ecosystem.config.cjs olarak kopyalar).
// Site root'un bun'ıyla (/root/.bun/bin/bun, en az 1.4.2), en son sürümü gösteren /srv/eatalay/current klasöründen çalışır.
//
// Port 3030: aynı sunucuda Huzuru İslam 3010'u, Hatim App 3020/3021'i kullanıyor.
// Değişirse nginx.conf, kurulum.sh ve deploy.yml de değişir.
// HOSTNAME 0.0.0.0: 127.0.0.1 olursa Next, proxy.ts'teki (next-intl) dil yeniden yazımlarını dış adres sanıp 500 verebilir;
// localhost olursa bun IPv6'da (::1) dinleyebilir ve nginx'in 127.0.0.1:3030 adresine ulaşılamaz.
// 0.0.0.0 ile 3030 dışarıya da açılır; güvenlik duvarında kapalı tutulmalı (deploy/KURULUM.md).
//
// Bellek: Next + bun boştayken ~240 MB tutar; görsel iyileştirici (sharp, AVIF) ve OG çizimi bunu kısa sürede
// 450-700 MB'a çıkarabilir. 384M sınırında pm2 süreci yük altında yeniden başlatabiliyordu (her seferinde birkaç saniye 502).
// Büyüyen kısım çoğunlukla sharp/libvips'in yerel belleği (JS yığını değil). MALLOC_ARENA_MAX=2: glibc'nin iş parçacığı
// başına açtığı bellek alanlarını sınırlar; sharp belgelerinin Linux için önerdiği, parçalanmayı azaltan ayar.
module.exports = {
  apps: [
    {
      name: "eatalay",
      cwd: "/srv/eatalay/current",
      script: "server.js",
      interpreter: "/root/.bun/bin/bun",
      env: { NODE_ENV: "production", HOSTNAME: "0.0.0.0", PORT: "3030", MALLOC_ARENA_MAX: "2" },
      max_memory_restart: "640M",
    },
  ],
};
