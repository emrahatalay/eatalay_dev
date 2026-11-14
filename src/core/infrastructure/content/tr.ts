import type { LocaleDictionary } from "./types";
import hatimApp from "./projects/hatim-app/tr";
import { SHOTS as hatimShots } from "./projects/hatim-app/shared";
import outOfOffice from "./projects/out-of-office/tr";
import { SHOTS as gameShots } from "./projects/out-of-office/shared";
import { EMAIL, IMAGES, KNOWS_ABOUT, SOCIALS, technologies } from "./shared";

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
        "iOS ve Android için yerel hissi veren, hızlı ve bakımı kolay uygulamalar. Fikir doğrulamasından mağaza yayınına.",
      tags: ["Araştırma", "Tel kafes", "Swift · Kotlin", "Flutter", "Mağaza yayını"],
      visual: {
        kind: "photo",
        image: { ...IMAGES.appPhone, alt: "Elde havada duran akıllı telefon" },
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
        kind: "photo",
        image: { ...IMAGES.gamePixel, alt: "Telefonda piksel grafikli bir oyun oynayan eller" },
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
        kind: "assistant",
        image: { ...IMAGES.handPhone, alt: "Elde tutulan akıllı telefon" },
        watermark: "AI ASİSTAN",
        prompt: "Bugün size nasıl yardımcı olabilirim?",
        caption: ["Mobil uygulama", "AI asistan", "UI/UX tasarım"],
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
        image: { ...IMAGES.aiShapes, alt: "" },
        eyebrow: "DİJİTAL",
        word: "Akış",
        steps: ["Form", "AI ajanı", "CRM", "Slack"],
        agentStep: 1,
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
