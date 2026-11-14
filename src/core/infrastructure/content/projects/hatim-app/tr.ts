import type { Project } from "../../../../domain/entities";
import { LISTING, MEMBER_ACTION_SOURCE, PALETTE, SCHEMA, SHOTS, SLUG, STACK, WEBSITE_URL } from "./shared";

const hatimAppTr: Project = {
  slug: SLUG,
  name: "Hatim App",
  ...LISTING,
  badges: ["Next.js · Expo", "TypeScript", "Web · Android · iOS", "Türkçe · English"],
  link: { kind: "website", label: "hatim.app'i aç", short: "hatim.app", url: WEBSITE_URL },
  labels: {
    nav: "Uygulama",
    galleryTitle: "Uygulamadan kareler",
    galleryHint: "Hepsi uygulamanın içinden, iPhone 18 Pro ekranında alındı. Kaydırarak gez.",
    mechanicsEyebrow: "Uygulamayı farklı kılan iki şey",
    rosterTitle: "Neler var, ne işe yarar?",
  },
  palette: PALETTE,
  schema: SCHEMA,

  hero: {
    eyebrow: "Web + mobil uygulama · Ücretsiz · Canlı",
    title: "Hatim App",
    accent: "hatim.app",
    slogan: "Kur'an'ı birlikte hatmedelim.",
    summary:
      "Ailenle, arkadaşlarınla ya da camideki cemaatle bir hatim grubu kur. Herkes cüzünü alır, okuyunca işaretler; halka dolunca hatim tamam. Kur'an'ı kitap gibi oku, Afâsî'den dinle, kaldığın yerden devam et.",
    phones: [
      { image: { ...SHOTS.tr.khatm, alt: "Hatim App grup hatmi ekranı: 30 cüzün durumu ve ilerleme halkası" }, caption: "Grup hatmi" },
      { image: { ...SHOTS.tr.reader, alt: "Hatim App Kur'an okuyucu: mushaf sayfası düzeninde âyetler" }, caption: "Kur'an okuyucu" },
    ],
  },

  facts: [
    { value: "3", label: "Platform tek çekirdekte: web, iOS ve Android" },
    { value: "52", label: "Use case; kural bir kez yazılır, üç taraf kullanır" },
    { value: "272", label: "Otomatik test, gerçek Postgres'te yarış testleri dahil" },
    { value: "29K+", label: "Satır TypeScript, tek monorepo" },
  ],

  story: {
    headline: [
      { text: "Bir hatim,", tone: "accent" },
      { text: "otuz cüz, tek ekran." },
      { text: "Kimse liste tutmasın.", tone: "muted" },
    ],
    paragraphs: [
      "Grup hatmi eski ve güzel bir gelenek: ailede, camide, WhatsApp grubunda cüzler paylaştırılır. Ama \"kim hangi cüzü aldı, kim bitirdi\" listesi elle tutulur ve mesajların arasında kaybolur.",
      "Hatim App bunu tek ekrana taşıyor. Yönetici hatmi açar, herkes boş cüze dokunup alır, okuyunca \"Okudum\" der. Biri cüz aldığında gruptaki herkesin ekranı kendiliğinden yenilenir; halka dolunca hatim tamamlanır.",
      "Hedef, 60 yaşındaki birinin yardımsız kullanabilmesi: büyük düğmeler, sade Türkçe, okumak için hesap bile gerekmez. Görsel dil de dini hassasiyetle sınırlı: yalnız 8 köşeli yıldız ve geometrik desen, canlı figür yok, göğe yükselen efekt yok.",
    ],
    punchline: { text: "Allah kabul etsin", caption: "Halka dolup hatim tamamlanınca ekranda beliren cümle." },
    screenshot: { image: { ...SHOTS.tr.juz, alt: "Boş cüze dokununca açılan pencere: Okudum, Okumaya başla, Cüzü bırak" }, caption: "Cüzünü al, okuyunca işaretle" },
  },

  gallery: [
    { image: { ...SHOTS.tr.today, alt: "Bugün ekranı: bugünkü cüz, kaldığın yer ve açık hatimler" }, caption: "Bugün: sıradaki cüzün ve kaldığın yer." },
    { image: { ...SHOTS.tr.khatm, alt: "Grup hatmi: 30 cüzün kimde olduğu ve ilerleme halkası" }, caption: "Otuz cüz tek ekranda: kim aldı, kim bitirdi." },
    { image: { ...SHOTS.tr.juz, alt: "Cüz penceresi: Okudum, Okumaya başla, Cüzü bırak" }, caption: "Cüze dokun: okudum, okumaya başla, bırak." },
    { image: { ...SHOTS.tr.fold, alt: "Kur'an okuyucuda sayfa kitap gibi katlanarak çevriliyor" }, caption: "Sayfa parmağının tuttuğu yerden katlanır." },
    { image: { ...SHOTS.tr.translation, alt: "Âyete basılı tutunca açılan meal penceresi" }, caption: "Âyete basılı tut: meal, dinle, yer imi." },
    { image: { ...SHOTS.tr.recitation, alt: "Afâsî tilâveti çalarken oynatıcı ve vurgulanan âyet" }, caption: "Afâsî'den âyet âyet dinle." },
    { image: { ...SHOTS.tr.group, alt: "Grup ekranı: açık ve biten hatimler, üyeler, davet bağlantısı" }, caption: "Grup: açık hatimler, üyeler, WhatsApp daveti." },
    { image: { ...SHOTS.tr.admin, alt: "Açık grupta katılma istekleri ve Onayla düğmeleri" }, caption: "Yönetici katılma isteklerini tek dokunuşla onaylar." },
    { image: { ...SHOTS.tr.dhikr, alt: "10.000 Salavat adetli hatmi: kaç tane alacağını seç" }, caption: "Adetli hatim: kaç tane alacağını seç." },
    { image: { ...SHOTS.tr.darkFatiha, alt: "Koyu temada Fâtiha sûresi" }, caption: "Gece koyu temayla oku." },
  ],

  mechanics: [
    {
      tag: "Kitap gibi okuyucu",
      title: "Sayfa, parmağının tuttuğu yerden katlanır",
      text: "Âyetler Medine mushafının sayfa düzeninde dizilir ve sayfa gerçek bir kitap gibi sağdan sola çevrilir. Katlanma geometrisi ve sayfaya sığan yazı boyutu ortak bir pakette; web ve mobil aynı motoru kullanır.",
      bullets: [
        "Gerçek bir sayfa çevirme kaydı yaprağı izler: sayfa yarıda tutulunca ses de durur, geri bırakılırsa söner.",
        "Dokuz yazı boyutu; büyük yazıda sayfa kendi içinde kayar, meal de büyür.",
        "Tilâvette okunan âyet hep oynatıcının üstünde görünür kalır.",
      ],
      codeName: "@hatim/book",
      screenshot: { image: { ...SHOTS.tr.fold, alt: "Kitap gibi katlanan Kur'an sayfası" }, caption: "Sayfa çevirme" },
    },
    {
      tag: "Grup hatmi",
      title: "Canlı güncellenir, çift dokunuşa dayanıklıdır",
      text: "Biri cüz alınca ya da okuyunca gruptaki herkesin ekranı kendiliğinden yenilenir. Aynı cüze iki kişi aynı anda dokunsa da cüzün tek sahibi olur; aynı düğmeye iki kez basmak hiçbir şeyi bozmaz.",
      bullets: [
        "Kural çekirdekte saf fonksiyon: aynı işlem ikinci kez gelirse durum değişmez.",
        "Sunucuda satır kilidi ve koşullu güncelleme; yeni kayıtta Idempotency-Key.",
        "Adetli hatim: sûre, Âyetü'l-Kürsî ya da zikir için hedef sayı, üye başına pay.",
      ],
      codeName: "MarkJuzRead.ts",
      screenshot: { image: { ...SHOTS.tr.khatm, alt: "Grup hatmi ekranı" }, caption: "Grup hatmi" },
    },
  ],

  roster: [
    {
      id: "khatms",
      title: "Hatim türleri",
      items: [
        { name: "Kur'an hatmi", detail: "30 cüz gruba dağılır; halka dolunca hatim tamam.", hint: "30 cüz" },
        { name: "Sûre hatmi", detail: "Bir sûre için hedef sayı, üye başına pay.", hint: "Adetli" },
        { name: "Âyetü'l-Kürsî", detail: "Grupça belli sayıda okuma.", hint: "Adetli" },
        { name: "Zikir", detail: "Salavat, istiğfar, tesbih, hamd, tekbir, kelime-i tevhid.", hint: "Sayaçlı" },
      ],
    },
    {
      id: "reading",
      title: "Okuma",
      items: [
        { name: "Diyanet meali", detail: "Âyete basılı tutunca ya da bilgisayarda sayfanın yanında.", hint: "TR · EN" },
        { name: "Afâsî tilâveti", detail: "Âyet âyet çalar, ekran kilitliyken de sürer.", hint: "Sesli" },
        { name: "İnternetsiz okuma", detail: "Kur'an metni ve meal uygulamanın içinde.", hint: "Çevrimdışı" },
        { name: "Kaldığın yer", detail: "Okuduğun âyet kendiliğinden kaydedilir, her cihazda devam.", hint: "Otomatik" },
        { name: "Yer imleri", detail: "Âyeti işaretle, istediğin an dön." },
      ],
    },
    {
      id: "community",
      title: "Topluluk",
      items: [
        { name: "Açık ve gizli gruplar", detail: "Açık grubu arayan bulur; gizliye istekle katılınır.", hint: "Onaylı" },
        { name: "WhatsApp daveti", detail: "Bağlantıya dokunan grubu takip eder, kod yazmak yok." },
        { name: "Bildirimler", detail: "Yeni hatim, okunan cüz, tamamlanan hatim.", hint: "Push" },
        { name: "Günlük hatırlatma", detail: "Seçtiğin saatte okuma hatırlatması.", hint: "Saatli" },
        { name: "Hesapsız okuma", detail: "Okumak için giriş gerekmez; gruba katılırken e-postayla tek adım." },
      ],
    },
  ],

  architecture: {
    headline: [
      { text: "Üç uygulama,", tone: "accent" },
      { text: "tek kural kitabı.", tone: "default" },
    ],
    intro:
      "Web sitesi, iOS/Android uygulaması ve sunucu aynı çekirdeği kullanır. İş kuralı bir kez yazılır; arayüz de sunucu da onu yeniden yazmaz. Bağımlılık yalnız içe akar ve sınırları ESLint korur.",
    layers: [
      { name: "@hatim/core", role: "Saf iş kuralları ve portlar: hatim, cüz, pay, grup, bildirim. React yok, DOM yok.", dependsOn: [] },
      { name: "@hatim/book", role: "Kitap motoru: sayfa katlama geometrisi, dizgi, sayfa çevirme sesi.", dependsOn: [] },
      { name: "@hatim/data", role: "Port uygulamaları: API istemcisi, sahte veri, cihazda saklanan ayar ve yer imi.", dependsOn: ["core"] },
      { name: "api", role: "Bun + Hono + PostgreSQL. Uç yalnız doğrular ve use case'i çağırır.", dependsOn: ["core"] },
      { name: "web", role: "Next.js 16 site ve PWA; çevrimdışı okuma.", dependsOn: ["core", "data", "book"] },
      { name: "mobile", role: "Expo + React Native: iOS ve Android.", dependsOn: ["core", "data", "book"] },
    ],
    principles: [
      { title: "Kural bir kez yazılır", text: "İş kuralı arayüzde ya da API ucunda yeniden yazılmaz; @hatim/core'a girer, üç taraf oradan kullanır." },
      { title: "Bağımlılık içe akar", text: "domain → application → infrastructure → di → presentation. Arayüz depoya doğrudan bağlanamaz." },
      { title: "Çift dokunuşa dayanıklı", text: "Veritabanı kısıtı, satır kilidi ve Idempotency-Key. Aynı istek ikinci kez gelirse hiçbir şey değişmez." },
      { title: "Çekirdek metin üretmez", text: "Hata bir kod olarak döner, arayüz sözlükten çevirir. Türkçe ve İngilizce tek sözlük, web ve mobil ortak." },
      { title: "Aynı ad, aynı iş", text: "Atomic Design: Button, Sheet, KhatmScreen web'de ve mobilde aynı adla aynı işi yapar." },
      { title: "İnternetsiz çalışır", text: "Kur'an metni ve meal gömülü; web'de service worker gezilen sayfaları saklar." },
    ],
    sample: {
      filename: "packages/core/src/application/use-cases/khatm/index.ts",
      caption:
        "Cüz alma, bırakma, okudum ve pay işlemlerinin ortak akışı. Kural saf fonksiyon; durum değişmediyse hiçbir şey yazılmaz, bildirim de gitmez.",
      code: MEMBER_ACTION_SOURCE,
    },
    stack: STACK,
  },

  workflow: {
    headline: [
      { text: "Yapay zekâ ajanlarıyla,", tone: "accent" },
      { text: "insan denetiminde üretildi." },
    ],
    intro:
      "Hatim App, yapay zekâ ajanlarını bir ekip gibi yönettiğim üretim düzeninin bir örneği daha. Mimari, dini ve görsel kurallar, son karar bende; tekrar eden iş ajanlarda.",
    steps: [
      { title: "Her paketin kendi hafızası", text: "Kökte ve her alt projede CLAUDE.md: mimari, kod kuralları, dini ve görsel kurallar. Ajan projeyi baştan taramaz, ilgili belgeyi okur." },
      { title: "Ekranda görmeden bitmiş sayılmaz", text: "Web önizlemede, mobil iOS simülatöründe ekran görüntüsüyle doğrulanır; Android bildirimleri gerçek cihazda denendi." },
      { title: "Tek dokunuşla yayın", text: "main'e gönderim: test, derleme, sunucu, sağlık kontrolü, hata olursa geri dönüş. Mobilde EAS derlemesi ve uygulama içi güncelleme." },
      { title: "Instagram için video motoru", text: "Hatim Reels serisi kendi motorunda üretilir: Afâsî tilâveti, âyet metni ve kapanışta hatim ilerleme çubuğu." },
    ],
  },

  roadmap: {
    done: [
      "hatim.app canlı: site, API, e-posta kodu ve Google ile giriş",
      "Kitap gibi Kur'an okuyucu, Diyanet meali, Afâsî tilâveti",
      "Grup hatmi: canlı güncelleme, açık ve gizli grup, davet",
      "Adetli hatim: sûre, Âyetü'l-Kürsî ve zikir",
      "Bildirimler: FCM, Web Push ve günlük hatırlatma",
      "Android uygulaması Google Play kapalı testinde",
    ],
    next: [
      "Google Play'de herkese açık yayın",
      "App Store ve iOS bildirimleri",
      "Apple ile giriş",
      "Türk mushafı sayfa düzeni",
      "Kur'an okumayı öğrenme",
    ],
    note: "Web sürümü hatim.app'te canlı ve ücretsiz. Android uygulaması Google Play'de kapalı testte, iOS sürümü henüz mağazada değil. Kaynak kod özel depoda.",
  },

  cta: {
    title: "Aklında bir uygulama mı var?",
    text: "Web, iOS ve Android'i tek kod tabanında, fikirden mağazaya kadar geliştiriyorum. Fikrini 15 dakikada konuşalım.",
  },

  teaser: {
    kicker: "Öne çıkan proje",
    text: "Kur'an'ı ailenle ve arkadaşlarınla birlikte hatmetmek için ücretsiz uygulama. Tek çekirdekten web, iOS ve Android; web sürümü hatim.app'te canlı.",
    ctaLabel: "Uygulamayı incele",
    phones: [
      { image: { ...SHOTS.tr.today, alt: "Bugün ekranı" }, caption: "Bugün" },
      { image: { ...SHOTS.tr.khatm, alt: "Grup hatmi ekranı" }, caption: "Grup hatmi" },
      { image: { ...SHOTS.tr.reader, alt: "Kur'an okuyucu" }, caption: "Okuyucu" },
    ],
  },

  seo: {
    title: "Hatim App: Kur'an'ı birlikte hatmetme uygulaması (web, iOS, Android)",
    description:
      "Ailenle ve arkadaşlarınla grup hatmi: 30 cüz tek ekranda, canlı güncelleme, kitap gibi Kur'an okuyucu, Diyanet meali ve Afâsî tilâveti. Next.js, Expo ve Clean Architecture ile tek çekirdekten üç platform.",
    keywords: [
      "Hatim App",
      "hatim uygulaması",
      "grup hatmi",
      "Kur'an hatmi uygulaması",
      "cüz paylaşımı",
      "Next.js Expo monorepo",
      "React Native uygulama geliştirme",
      "Clean Architecture TypeScript",
    ],
  },
};

export default hatimAppTr;
