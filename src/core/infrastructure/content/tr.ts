import type { LocaleDictionary } from "./types";
import hatimApp from "./projects/hatim-app/tr";
import { SHOTS as hatimShots } from "./projects/hatim-app/shared";
import outOfOffice from "./projects/out-of-office/tr";
import { SHOTS as gameShots } from "./projects/out-of-office/shared";
import { EMAIL, KNOWS_ABOUT, SOCIALS } from "./shared";

const tr: LocaleDictionary = {
  profile: {
    name: "Emrah Atalay",
    brand: "eatalay",
    jobTitle: "Yapay zeka destekli mobil uygulama, oyun ve yazılım geliştirici",
    email: EMAIL,
    location: { city: "Bitlis", countryCode: "TR", label: "Bitlis, TR · uzaktan" },
    socials: SOCIALS,
    knowsAbout: KNOWS_ABOUT,
  },

  page: {
    hero: {
      eyebrow: "Yapay zeka destekli ürün geliştirme",
      titleLead: "Yapay zeka hızında,",
      titleAccent: "insan kalitesinde ürünler.",
      lead: "Ben Emrah Atalay. Yapay zeka ajanlarından oluşan bir ekibi yönetiyorum: kod yazılır, test edilir, incelenir ve her satır yayına çıkmadan önce insan onayından geçer. Mobil uygulama, oyun ve otomasyonda fikirden yayına.",
      proof: [
        { value: "10+ yıl", label: "üretim deneyimi" },
        { value: "Uçtan uca", label: "fikirden yayına tek elden" },
        { value: "%100", label: "insan onaylı kod" },
      ],
    },
    about: {
      headline: [
        { text: "Ajanlar üretir,", tone: "accent" },
        { text: "son kararı insan verir. Hız yapay zekadan, sorumluluk benden." },
      ],
      summary:
        "On yılı aşkın üretim deneyimimi yapay zeka ajanlarıyla birleştiriyorum. Araştırma, kod, test ve belge işleri paralel ilerler; mimari, ürün zevki ve yayın kararı bende kalır.",
      log: {
        title: "Teslim günlüğü",
        agent: "Ajan",
        human: "Emrah",
        entries: [
          { by: "agent", text: "Paylaşım ekranı yazıldı", tag: "kod" },
          { by: "agent", text: "24 test eklendi, hepsi geçti", tag: "test" },
          { by: "agent", text: "Erişilebilirlik incelemesi bitti", tag: "inceleme" },
          { by: "human", text: "Değişiklikler onaylandı", tag: "onay" },
          { by: "agent", text: "iOS ve Android derlendi", tag: "derleme" },
          { by: "agent", text: "Sürüm notları hazırlandı", tag: "belge" },
          { by: "human", text: "Sürüm 1.4 yayına alındı", tag: "yayın" },
        ],
      },
      experience: {
        value: "10+ yıl",
        label: "Üretim ortamında yazılım geliştirme deneyimi.",
        screens: [
          { ...hatimShots.tr.today, alt: "Hatim App Bugün ekranı" },
          { ...gameShots.tr.run, alt: "Son Mesai oynanış ekranı" },
          { ...hatimShots.tr.reader, alt: "Hatim App Kur'an okuyucu" },
        ],
      },
      disciplines: {
        items: [
          { label: "Mobil", visual: { kind: "screen", image: { ...hatimShots.tr.khatm, alt: "" } } },
          { label: "Oyun", visual: { kind: "screen", image: { ...gameShots.tr.drone, alt: "" } } },
          { label: "Tasarım", visual: { kind: "design" } },
          { label: "Otomasyon", visual: { kind: "flow" } },
        ],
        label: "4 disiplin · mobil, oyun, tasarım, otomasyon",
      },
      workflow: { value: "AI", label: "Ajan ekibiyle paralel üretim, insan denetimiyle kalite." },
      quote:
        "Ajan ekibi paralel çalışır: araştırma, test, refaktör ve belgeler aynı anda ilerler. Her satır insan denetiminden geçer.",
    },
    testimonials: {
      headline: [
        { text: "Birlikte çalıştığımız ekipler ne diyor?", tone: "accent" },
      ],
    },
    faq: {
      headline: [
        { text: "Aklınızdaki sorular,", tone: "accent" },
        { text: "net cevaplar. Başlamadan önce bilmeniz gerekenler." },
      ],
    },
    contact: {
      title: "15 dakikalık görüşme ayarla",
      text: "Sorularınız mı var? Projeye başlamadan önce kısa bir tanışma görüşmesi yapalım.",
      ctaLabel: "Ücretsiz görüşme",
    },
    footerBlurb:
      "Yapay zekayla mobil uygulama, mobil oyun, arayüz tasarımı ve otomasyon üreten bir kişilik stüdyo.",
    seo: {
      title: "Emrah Atalay — Yapay Zekayla Mobil Uygulama, Oyun ve Yazılım Geliştirici",
      description:
        "Yapay zeka ajanlarıyla mobil uygulama, mobil oyun, arayüz tasarımı ve otomasyon üreten bağımsız geliştirici. Expo, React Native, Next.js ve Unity ile fikirden yayına uçtan uca ürün geliştirme.",
      keywords: [
        "Emrah Atalay",
        "mobil uygulama geliştirme",
        "mobil oyun geliştirme",
        "yapay zeka otomasyon",
        "Unity geliştirici",
        "React Native geliştirici",
        "Expo uygulama geliştirme",
        "Flutter geliştirici",
        "Swift Kotlin geliştirici",
        "Next.js TypeScript geliştirici",
        "Unity C# oyun geliştirme",
        "mobil uygulama tasarımı",
        "iOS Android uygulama",
        "freelance yazılım geliştirici",
        "LLM ajanları",
        "n8n otomasyon",
        "Python otomasyon",
      ],
    },
  },

  services: [
    {
      id: "mobile-app",
      shortTitle: "Mobil uygulama",
      title: { lead: "Mobil", accent: "Uygulama" },
      description:
        "Expo ve React Native ile iOS ve Android'de yerel hissi veren uygulamalar; gerektiğinde Swift, Kotlin ya da Flutter. Aynı çekirdekten Next.js web sürümü.",
      tags: ["Expo · React Native", "Next.js · TypeScript", "Flutter", "Swift · Kotlin", "Mağaza yayını"],
      visual: {
        kind: "ship",
        screen: { ...hatimShots.tr.today, alt: "Hatim App'in Bugün ekranı" },
        command: "eas build --platform all",
        steps: [
          { mark: "done", text: "iOS derlemesi · 42" },
          { mark: "done", text: "Android derlemesi · 42" },
          { mark: "sent", text: "Google Play kapalı teste gönderildi" },
          { mark: "sent", text: "Web: hatim.app güncellendi" },
        ],
        badge: "Tek çekirdek · web, iOS, Android",
      },
      showcase: { projectSlug: "hatim-app", label: "Örnek proje: Hatim App" },
    },
    {
      id: "mobile-game",
      shortTitle: "Mobil oyun",
      title: { lead: "Mobil", accent: "Oyun" },
      description:
        "Unity ile hızlı prototipten yayına: oyun döngüsü, ekonomi dengesi, reklam ve uygulama içi satın alma.",
      tags: ["Prototip", "Unity · C#", "Ekonomi", "Reklam", "Satın alma"],
      visual: {
        kind: "game",
        screen: { ...gameShots.tr.magnet, alt: "Son Mesai oyunundan bir oynanış ekranı" },
        component: "PlayerRunner",
        fields: [
          { label: "Hız", value: "12" },
          { label: "Şerit", value: "3" },
          { label: "Fazla Mesai", value: "×2" },
          { label: "Devam", value: "Giriş kartı" },
        ],
        metric: { label: "Meslek geri alma bedeli", value: "×1,5" },
        badge: "Unity · prototipten yayına",
      },
      showcase: { projectSlug: "out-of-office", label: "Örnek proje: Son Mesai" },
    },
    {
      id: "product-design",
      shortTitle: "Uygulama tasarımı",
      title: { lead: "Uygulama", accent: "Tasarımı" },
      description:
        "Yapay zeka asistanlı ürünler için arayüz ve akış tasarımı; bileşen kütüphanesiyle birlikte teslim. Hatim App'in sade, büyük dokunma alanlı arayüzü bu süreçten çıktı.",
      tags: ["Araştırma", "Tel kafes", "AI ürün", "Deneyim", "Test"],
      visual: {
        kind: "design",
        screen: { ...hatimShots.tr.group, alt: "Tasarım tuvalinde seçili bir Hatim App ekranı" },
        wireframe: "Tel kafes",
        size: "390 × 844",
        component: "Button / Primary",
        cursor: "Emrah",
      },
      showcase: { projectSlug: "hatim-app", label: "Örnek proje: Hatim App" },
    },
    {
      id: "ai-automation",
      shortTitle: "AI otomasyon",
      title: { lead: "AI", accent: "Otomasyon" },
      description:
        "Tekrar eden iş akışlarını yapay zeka ajanları ve entegrasyonlarla otomatikleştiriyorum; ekibiniz karara odaklanıyor.",
      tags: ["LLM ajanları", "n8n", "Python", "Entegrasyon"],
      visual: {
        kind: "flow",
        runs: "Her yeni talepte otomatik çalışır",
        trigger: "Yeni talep",
        agent: { name: "AI ajanı", task: "sınıflandır · yanıtla" },
        outputs: ["CRM", "Slack", "E-posta"],
      },
    },
  ],

  faqs: [
    {
      id: "projects",
      question: "Hangi tür projeler alıyorsun?",
      answer:
        "Mobil uygulama (gerekirse Next.js web sürümüyle), mobil oyun, arayüz tasarımı ve yapay zeka otomasyonları. En verimli olduğum yer: net bir sorunu olan, hızlı yayın isteyen ürün ekipleri ve girişimler.",
    },
    {
      id: "mvp",
      question: "Bir MVP ne kadar sürede çıkar?",
      answer:
        "Kapsama göre değişir; örnek bir mobil MVP takvimi altı haftadır: çerçeve, prototip, üretim, yayın.",
    },
    {
      id: "ai",
      question: "Yapay zekayı tam olarak nasıl kullanıyorsun?",
      answer:
        "Ajanlar araştırma, test, refaktör ve belge işlerini paralel yürütür. Mimari, güvenlik, kod incelemesi ve son karar bende kalır.",
    },
    {
      id: "ownership",
      question: "Kod ve hesaplar kimin olur?",
      answer:
        "Tamamı sizin. Kaynak kod, mağaza hesapları ve altyapı sizin adınıza kurulur; teslimde belgeleriyle devredilir.",
    },
    {
      id: "support",
      question: "Yayından sonra destek veriyor musun?",
      answer: "Evet. Ölçüm, hata düzeltme ve yeni sürümler için aylık bakım seçenekleri var.",
    },
  ],

  // Only real, approved client quotes go here. The section stays hidden while empty.
  testimonials: [],

  // Listed newest first (by publishedAt) on the portfolio page; the home page previews the newest.
  projects: [outOfOffice, hatimApp],
};

export default tr;
