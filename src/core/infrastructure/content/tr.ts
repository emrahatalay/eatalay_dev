import type { LocaleDictionary } from "./types";
import hatimApp from "./projects/hatim-app/tr";
import { SHOTS as hatimShots } from "./projects/hatim-app/shared";
import outOfOffice from "./projects/out-of-office/tr";
import { SHOTS as gameShots } from "./projects/out-of-office/shared";
import { EMAIL, KNOWS_ABOUT, SOCIALS, technologies } from "./shared";

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
      greeting: "Ben Emrah Atalay",
      titleLead: "Yapay zekayla",
      titleTail: "üreten geliştirici",
    },
    about: {
      headline: [
        { text: "Fikri otomatikleştir, yayını hızlandır.", tone: "accent" },
        { text: "Yapay zeka destekli üretimle" },
        { text: "ölçülebilir büyüme ve operasyonel mükemmellik.", tone: "muted" },
      ],
      summary:
        "Yapay zeka ajanlarını bir ekip gibi yöneterek fikirleri mağazada yayında olan ürünlere dönüştürüyorum. Mimari, zevk ve son karar insanda kalıyor.",
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
          { label: "Yazılım", visual: { kind: "code" } },
          { label: "Otomasyon", visual: { kind: "flow" } },
        ],
        label: "4 disiplin · mobil, oyun, yazılım, otomasyon",
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
      "Yapay zekayla mobil uygulama, mobil oyun, yazılım ve otomasyon üreten bir kişilik stüdyo.",
    seo: {
      title: "Emrah Atalay — Yapay Zekayla Mobil Uygulama, Oyun ve Yazılım Geliştirici",
      description:
        "Yapay zeka ajanlarıyla mobil uygulama, mobil oyun, yazılım ve otomasyon üreten bağımsız geliştirici. Fikirden mağaza yayınına uçtan uca ürün geliştirme.",
      keywords: [
        "Emrah Atalay",
        "mobil uygulama geliştirme",
        "mobil oyun geliştirme",
        "yapay zeka otomasyon",
        "Unity geliştirici",
        "React Native geliştirici",
        "Expo uygulama geliştirme",
        "Flutter geliştirici",
        "iOS Android uygulama",
        "freelance yazılım geliştirici",
        "LLM ajanları",
        "n8n otomasyon",
      ],
    },
  },

  services: [
    {
      id: "mobile-app",
      shortTitle: "Mobil uygulama",
      title: { lead: "Mobil", accent: "Uygulama" },
      description:
        "Expo ve React Native ile iOS ve Android'de yerel hissi veren, hızlı ve bakımı kolay uygulamalar. Fikir doğrulamasından mağaza yayınına.",
      tags: ["Expo · React Native", "Flutter", "Swift · Kotlin", "Araştırma", "Mağaza yayını"],
      visual: {
        kind: "ship",
        screen: { ...hatimShots.tr.today, alt: "Yayındaki Hatim App'in Bugün ekranı" },
        command: "eas build --platform all",
        steps: [
          { mark: "done", text: "iOS derlemesi · 42" },
          { mark: "done", text: "Android derlemesi · 42" },
          { mark: "sent", text: "App Store'a gönderildi" },
          { mark: "sent", text: "Google Play'e gönderildi" },
        ],
        badge: "App Store · Google Play",
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
          { label: "Coin çarpanı", value: "×1.5" },
          { label: "Canlanma", value: "Ödüllü reklam" },
        ],
        metric: { label: "1. gün tutma", value: "%42" },
        badge: "Unity · prototipten yayına",
      },
      showcase: { projectSlug: "out-of-office", label: "Örnek proje: Son Mesai" },
    },
    {
      id: "product-design",
      shortTitle: "Uygulama tasarımı",
      title: { lead: "Uygulama", accent: "Tasarımı" },
      description:
        "Yapay zeka asistanlı ürünler için arayüz ve akış tasarımı; bileşen kütüphanesiyle birlikte teslim.",
      tags: ["Araştırma", "Tel kafes", "AI ürün", "Deneyim", "Test"],
      visual: {
        kind: "design",
        screen: { ...hatimShots.tr.group, alt: "Tasarım tuvalinde seçili bir Hatim App ekranı" },
        wireframe: "Tel kafes",
        size: "390 × 844",
        component: "Button / Primary",
        cursor: "Emrah",
      },
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
        runs: "Bu hafta 128 iş otomatik",
        trigger: "Yeni talep",
        agent: { name: "AI ajanı", task: "sınıflandır · yanıtla" },
        outputs: ["CRM", "Slack", "E-posta"],
      },
    },
  ],

  technologies: technologies("LLM ajanları"),

  faqs: [
    {
      id: "projects",
      question: "Hangi tür projeler alıyorsun?",
      answer:
        "Mobil uygulama, mobil oyun, web yazılımı ve yapay zeka otomasyonları. En verimli olduğum yer: net bir sorunu olan, hızlı yayın isteyen ürün ekipleri ve girişimler.",
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
