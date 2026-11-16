import type { Project } from "../../../../domain/entities";
import { LISTING, MAGNET_EFFECT_SOURCE, PALETTE, REPOSITORY_URL, SCHEMA, SHOTS, SLUG, STACK } from "./shared";

const outOfOfficeTr: Project = {
  slug: SLUG,
  name: "Son Mesai",
  ...LISTING,
  badges: ["Unity 6", "C#", "Android · iOS", "Türkçe · English"],
  link: { kind: "source", label: "GitHub'da kaynak kod", short: "GitHub", url: REPOSITORY_URL },
  labels: {
    nav: "Oyun",
    galleryTitle: "Oyundan kareler",
    galleryHint: "Hepsi oyunun içinden, 20:9 dikey telefon ekranında alındı. Kaydırarak gez.",
    mechanicsEyebrow: "Oyunu farklı kılan üç mekanik",
    rosterTitle: "Kim kimdir, ne işe yarar?",
  },
  palette: PALETTE,
  schema: SCHEMA,

  hero: {
    eyebrow: "Mobil oyun · Sonsuz koşu · Geliştiriliyor",
    title: "Son Mesai",
    accent: "Out of Office",
    slogan: "Yapay zeka işini aldı. Sıra sende.",
    summary:
      "Şirketin son insan çalışanısın. İK robotu İK-9000 elinde çıkış belgesiyle peşinde. Üç şeritte koş, beş dünyayı geç, engellerden kaç, altın topla. Ama dikkat: oyun seni izliyor ve öğreniyor.",
    phones: [
      { image: { ...SHOTS.tr.run, alt: "Son Mesai oynanış ekranı: Yazılımcı üç şeritli yolda altın dizisine doğru koşuyor" }, caption: "Koşu" },
      { image: { ...SHOTS.tr.city, alt: "Otonom Şehir: gün batımında neon binalar, otonom otobüs ve YENİ BÖLGE afişi" }, caption: "Otonom Şehir" },
    ],
  },

  facts: [
    { value: "5", label: "Dünya, tek koşuda mesafeyle geçilir" },
    { value: "4", label: "Meslek, üçü kendi yeteneğiyle" },
    { value: "10", label: "Güçlendirme: CAPTCHA'dan Fişi Çek'e" },
    { value: "13K+", label: "Satır C#, 7 assembly, tek yönlü bağımlılık" },
  ],

  story: {
    headline: [
      { text: "Yıl 2031.", tone: "accent" },
      { text: "Yapay zeka bütün işleri aldı." },
      { text: "Bir kişi hariç.", tone: "muted" },
    ],
    paragraphs: [
      "Dev bir şirketin plazasında son insan çalışan sensin. İK robotu İK-9000 bir imza peşinde: çıkış belgesini imzalatırsa \"optimize edilirsin\".",
      "Hedefin, sinyalin çekmediği efsanevi Analog Kasaba. Plaza'dan çıkıp Otonom Şehir'i, Lojistik Deposu'nu ve Veri Merkezi'ni geçmen gerek. Yol boyunca sunucu kabinleri, forklift robotları, otonom otobüsler ve \"Çerezleri kabul et\" duvarları seni durdurmaya çalışır.",
      "Mizah kurumsal dünyayla ve yapay zeka jargonuyla dalga geçer: kalkanın adı Kıdem Kalkanı, mıknatısın adı Maaş Mıknatısı, robotu durduran şey bir CAPTCHA kutusu. Kimse hedef alınmaz; alay edilen şey ofis kültürü ve teknoloji modaları.",
    ],
    punchline: { text: "OPTİMİZE EDİLDİN", caption: "Yakalandığında ekranda yazan cümle." },
    screenshot: { image: { ...SHOTS.tr.gameOver, alt: "Oyun sonu ekranı: OPTİMİZE EDİLDİN, İK-9000 SENİ YAKALADI, Yazılımcı OTOMATİKLEŞTİ" }, caption: "Oyun sonu" },
  },

  gallery: [
    { image: { ...SHOTS.tr.driverMenu, alt: "Ana menüde yeni meslek Şoför, Sür yeteneği ve OYNA butonu" }, caption: "Yeni meslek Şoför. Meslek seç, OYNA'ya bas." },
    { image: { ...SHOTS.tr.run, alt: "Plaza'da koşu: şeritlerde altın dizileri ve sunucu kabinleri" }, caption: "Plaza'da altın dizileri ve sunucu kabinleri." },
    { image: { ...SHOTS.tr.city, alt: "Otonom Şehir: gün batımı, neon binalar, trafik konisi robotları" }, caption: "1200 m: Otonom Şehir, gün batımı ve neon." },
    { image: { ...SHOTS.tr.logistics, alt: "Lojistik Deposu: sabah sisi, hangarlar, koli duvarı ve vinç kapısı" }, caption: "2600 m: sabah sisinde Lojistik Deposu." },
    { image: { ...SHOTS.tr.dataCenter, alt: "Veri Merkezi: serin ışık, soğutma kuleleri, disk kasaları ve kablo kapısı" }, caption: "4200 m: Veri Merkezi'nde kablo kapıları." },
    { image: { ...SHOTS.tr.town, alt: "Analog Kasaba: altın saat, gaz lambaları, saman balyaları ve değirmen" }, caption: "6000 m: sinyalin çekmediği Analog Kasaba." },
    { image: { ...SHOTS.tr.driverPod, alt: "Şoför, Sür yeteneğiyle otonom kapsülde Çerez Duvarı'na doğru gidiyor" }, caption: "Sür: kapsüle bin, tek çarpışma affedilir." },
    { image: { ...SHOTS.tr.drone, alt: "Kargo Dronu güçlendirmesiyle oyuncu havada taşınıyor" }, caption: "Kargo Dronu: engellerin üstünden uç." },
    { image: { ...SHOTS.cookieWall, alt: "Çerez Duvarı engeli ve oyuncunun hemen yanında İK-9000" }, caption: "Çerez Duvarı'nın altından kay. İK-9000 ensende." },
    { image: { ...SHOTS.tr.tutorial, alt: "Öğretici: sunucu kabininin önünde sola dönük 3B ok ve Sola kaydır! ipucu" }, caption: "İlk koşuda öğretici: oyun yavaşlar, ok yolu gösterir." },
    { image: { ...SHOTS.tr.missions, alt: "Günlük görevler: Zıpla 20/20 ve Metre koş tamamlandı, AL butonları, Kay 9/15" }, caption: "Her gün üç yeni görev, ödülü AL ile topla." },
    { image: { ...SHOTS.tr.collection, alt: "Koleksiyon ekranı: Yazılımcı ve Grafiker otomatikleşmiş, Stajyer seçili" }, caption: "Yakalanan meslek otomatikleşir." },
    { image: { ...SHOTS.tr.store, alt: "Mağaza: sandalye ve giriş kartı paketleri, fiyatları altınla" }, caption: "Mağaza yalnızca oyun altınıyla çalışır." },
    { image: { ...SHOTS.tr.revive, alt: "Devam teklifi: giriş kartını okut, kaldığın yerden devam et" }, caption: "Giriş kartını okut, kaldığın yerden devam et." },
  ],

  mechanics: [
    {
      tag: "Seni öğrenen yapay zeka",
      title: "Engeller alışkanlıklarını öğrenir",
      text: "Oyun hangi şeritte ne kadar kaldığını izler ve engelleri en sevdiğin şeritlere yöneltir. Kendi verinle eğitilen bir rakibe karşı koşarsın.",
      bullets: [
        "Şerit başına geçirilen süreyi sayar, her karede eski veriyi azar azar unutur.",
        "Hafıza koşular arasında korunur; alışkanlığını değiştirirsen o da değişir.",
        "Her engel dizisinde en az bir şerit mutlaka açık kalır. Zor ama hep adil.",
      ],
      codeName: "AdaptiveDirector.cs",
      screenshot: { image: { ...SHOTS.stumble, alt: "Grafiker engele çarpıp tökezliyor, önünde yeni engeller" }, caption: "Tökezleme anı" },
    },
    {
      tag: "Meslek otomasyonu",
      title: "Yakalanan meslek robota dönüşür",
      text: "Karakterler birer meslektir. Yakalandığında oynadığın meslek \"otomatikleşir\": kilitlenir ve sonraki koşularda o mesleğin robotu karşına engel olarak çıkar.",
      bullets: [
        "Yazılımcının robotu üstüne koşar, Grafikerinki şeritler arasında gidip gelir, Şoförünki hızla üstüne sürer.",
        "Meslek altınla geri alınır: bedel 100'den başlar, her otomatikleşmede 1,5 katına çıkar.",
        "Stajyer otomatikleşmez; kilitli meslek seçiliyse koşuya o çıkar.",
      ],
      codeName: "Workforce.cs",
      screenshot: { image: { ...SHOTS.automatedRobot, alt: "Otomatikleşen Yazılımcının mavi robotu Stajyere doğru koşuyor" }, caption: "Eski işin karşıdan geliyor" },
    },
    {
      tag: "Tek koşuda beş dünya",
      title: "Koştukça dünya değişir",
      text: "Yükleme ekranı yok. Mesafe arttıkça Plaza'dan Otonom Şehir'e, oradan Lojistik Deposu'na, Veri Merkezi'ne ve Analog Kasaba'ya aynı koşuda geçersin. Gökyüzü, sis, yol ve engeller yolda yavaşça değişir.",
      bullets: [
        "Sınırlar 1200, 2600, 4200 ve 6000 metrede. Yeni bölgeye girince afiş çıkar.",
        "Hava ve ışık birkaç saniyede karışır; zemin, yol kenarı ve engel havuzu dünyaya göre değişir.",
        "Her dünyanın kendi üç engeli var: otobüsten traktöre 12 yeni engel. Yeni dünya bir asset demektir.",
      ],
      codeName: "WorldTimeline.cs",
      screenshot: { image: { ...SHOTS.tr.town, alt: "Analog Kasaba'ya girişte YENİ BÖLGE afişi, gaz lambaları ve saman balyaları" }, caption: "Son durak: Analog Kasaba" },
    },
  ],

  roster: [
    {
      id: "professions",
      title: "Meslekler",
      items: [
        { name: "Yazılımcı", detail: "Debug: öndeki 45 metredeki engelleri siler.", hint: "18 sn bekleme" },
        { name: "Grafiker", detail: "Yeniden Çiz: 3 saniye boyunca engellerin içinden geçer.", hint: "22 sn bekleme" },
        { name: "Şoför", detail: "Sür: 6 saniye açık tepeli otonom kapsüle biner, tek çarpışmayı affeder.", hint: "25 sn bekleme" },
        { name: "Stajyer", detail: "Yeteneği yok ama otomatikleşmez. Her zaman oynanabilir.", hint: "Son çare" },
      ],
    },
    {
      id: "worlds",
      title: "Dünyalar",
      items: [
        { name: "Plaza", detail: "Gündüz, şeker renkli binalar. Sunucu kabini, çerez duvarı, robot süpürge, dron ve taksi.", hint: "0 m" },
        { name: "Otonom Şehir", detail: "Gün batımı ve neon. Otonom otobüs, kontrol noktası bariyeri, trafik konisi robotu.", hint: "1200 m" },
        { name: "Lojistik Deposu", detail: "Sabah sisi ve hangarlar. Forklift robotu, koli duvarı, vinç kapısı.", hint: "2600 m" },
        { name: "Veri Merkezi", detail: "Serin yapay ışık. Yedekleme robotu, disk kasası, kablo kapısı.", hint: "4200 m" },
        { name: "Analog Kasaba", detail: "Altın saat, sinyal yok. Eski traktör, saman balyaları, kasaba kapısı.", hint: "6000 m" },
      ],
    },
    {
      id: "obstacles",
      title: "Plaza'nın engelleri",
      items: [
        { name: "Sunucu Kabini", detail: "Sabit duran dev kabin.", hint: "Şerit değiştir" },
        { name: "Çerez Duvarı", detail: "\"Çerezleri kabul et\" yazan duvar.", hint: "Kay" },
        { name: "Robot Süpürge", detail: "Yerde dolaşan alçak engel.", hint: "Zıpla" },
        { name: "Kargo Dronu", detail: "Şeritler arasında süzülür.", hint: "Kay" },
        { name: "Otonom Taksi", detail: "Sana doğru gelir.", hint: "Şerit değiştir" },
      ],
    },
    {
      id: "power-ups",
      title: "Güçlendirmeler",
      items: [
        { name: "CAPTCHA", detail: "İK-9000 \"Ben robot değilim\" kutusunda takılır.", hint: "6 sn" },
        { name: "Halüsinasyon", detail: "Engeller sahteleşir, içlerinden geçilir.", hint: "5 sn" },
        { name: "Kıdem Kalkanı", detail: "Tek çarpışmayı affeder.", hint: "12 sn" },
        { name: "Kargo Dronu", detail: "Seni havaya kaldırır, engellerin üstünden uçarsın.", hint: "8 sn" },
        { name: "Maaş Mıknatısı", detail: "Altınları sana çeker.", hint: "10 sn" },
        { name: "Fazla Mesai x2", detail: "Puanı ikiye katlar.", hint: "12 sn" },
        { name: "Çift Espresso", detail: "Daha yükseğe zıplatır.", hint: "10 sn" },
        { name: "Prompt Injection", detail: "Önündeki 30 metredeki altınları, hangi şeritte olursa olsun toplar.", hint: "8 sn" },
        { name: "Fişi Çek", detail: "İK-9000 ve bütün robotlar durur, çarpmaz.", hint: "5 sn" },
        { name: "Sürpriz Paket", detail: "Koşu sonunda açılır: altın, sandalye ya da giriş kartı.", hint: "Anında" },
      ],
    },
  ],

  architecture: {
    headline: [
      { text: "Oyun gibi değil,", tone: "accent" },
      { text: "ürün gibi kurgulanmış kod.", tone: "default" },
    ],
    intro:
      "Her klasör ayrı bir assembly ve bağımlılık yalnızca tek yöne akar. Sistemler birbirini tanımaz; tipli bir sinyal veri yoluyla haberleşir. Yeni bir karakter, engel ya da güçlendirme eklemek için kod yazılmaz.",
    layers: [
      { name: "Core", role: "Saf sözleşmeler: sinyaller, durum makinesi, servis arayüzleri.", dependsOn: [] },
      { name: "Data", role: "ScriptableObject tanımları, etkiler ve hareket desenleri.", dependsOn: ["Core"] },
      { name: "Gameplay", role: "Koşu, oyuncu, kovalayan, dünya ve etki sistemleri.", dependsOn: ["Core", "Data"] },
      { name: "Infrastructure", role: "Kayıt, nesne havuzu, girdi, çeviri, kare hızı.", dependsOn: ["Core"] },
      { name: "UI", role: "UI Toolkit sunucuları. Oynanışı hiç tanımaz.", dependsOn: ["Core"] },
      { name: "Bootstrap", role: "Somut sınıfları bilen tek yer (VContainer).", dependsOn: ["Hepsi"] },
    ],
    principles: [
      { title: "Sistemler birbirini tanımaz", text: "57 tipli sinyal, hepsi readonly struct. Arayüz istek atar, oynanış karar verir, sonucu olay olarak duyurur." },
      { title: "Oyun durumu tek elde", text: "Durumu yalnızca GameFlow değiştirir (StateMachine<GameState>). Geçersiz istek sessizce yok sayılır." },
      { title: "İçerik veridir", text: "Meslek, engel, güçlendirme, aksesuar, dünya, görev ve mağaza ürünü birer ScriptableObject. Yeni içerik bir asset demektir." },
      { title: "Yeni davranış, tek yeni sınıf", text: "Her etki EffectDefinition'dan, her hareket MovementPattern'dan türer. Var olan kod değişmez (açık/kapalı ilkesi)." },
      { title: "Koşuda bellek ayırma yok", text: "Engel, altın, zemin ve efekt havuzdan gelir. Kare döngüsünde LINQ, new liste ya da lambda yakalama yok." },
      { title: "Kıvrımlı dünya shader'ı", text: "Yol sağa sola kıvrılır, uzakta aşağı eğilir. Tamamen görsel: özel HLSL shader köşe noktalarını büker, çarpışmalar düz dünyada kalır." },
    ],
    sample: {
      filename: "Data/Effects/MagnetEffect.cs",
      caption: "Maaş Mıknatısı'nın tamamı. Yeni bir etki türü böyle eklenir; güçlendirme ise bu etkileri birleştiren bir asset'tir.",
      code: MAGNET_EFFECT_SOURCE,
    },
    stack: STACK,
  },

  workflow: {
    headline: [
      { text: "Yapay zeka ajanlarıyla,", tone: "accent" },
      { text: "insan denetiminde üretildi." },
    ],
    intro:
      "Son Mesai, yapay zeka ajanlarını bir ekip gibi yönettiğim üretim düzeninin canlı örneği. Mimari, zevk ve son karar bende; tekrar eden iş ajanlarda.",
    steps: [
      { title: "Ajanlar için yazılmış proje", text: "AGENTS.md ve docs/ klasörü hikâyeyi, tasarım dilini, mimariyi ve güncel durumu anlatır. Claude Code ve Codex aynı kurallarla çalışır; her iş belgesiyle birlikte güncellenir." },
      { title: "Editör komut satırından sürülür", text: "Unity CLI ile derle, Play moduna gir, ekran görüntüsü al, konsolu oku. Bir iş, çalıştığı görülmeden bitmiş sayılmaz. Bu sayfadaki görüntüler de böyle alındı." },
      { title: "3B modeller üretilir", text: "Karakterler ve eşyalar Meshy ile üretilir. Blender betikleri ölçeği, yönü, dokuyu ve ışıma maskesini ayarlar; Unity araçları materyali ve prefab'ı kurar." },
      { title: "İçerik koddan kurulur", text: "Bir editör aracı prefab'ları, tanım asset'lerini, çeviri tablosunu ve sahneyi baştan üretir. Ses efektleri Python ile sentezlenir." },
    ],
  },

  roadmap: {
    done: [
      "Üç şeritli koşu, zıplama, kayma ve artan zorluk",
      "Kovalayan İK-9000 ve öğrenen engel yönetmeni",
      "5 dünya ve aynı koşuda mesafeyle geçiş: Otonom Şehir, Lojistik Deposu, Veri Merkezi, Analog Kasaba",
      "4 meslek (yeni: Şoför), 17 engel, 10 güçlendirme, meslek otomasyonu",
      "Günlük görevler ve ilk koşuda yavaşlayan, ok gösteren öğretici",
      "Ofis sandalyesi, sürpriz paketler, giriş kartıyla devam, mağaza",
      "Gerçek 3B modeller ve animasyonlar, kıvrımlı dünya",
      "Ses efektleri, Ayarlar sekmesi, Türkçe ve İngilizce arayüz",
    ],
    next: [
      "Müzik",
      "Final sürprizi: İK-9000'i işinden etmeye gelen daha yeni bir model",
      "Günlük giriş ödülü, başarımlar ve lider tablosu",
      "Yeni meslekler",
      "iOS çıktısı ve mağaza yayını",
    ],
    note: "Android test çıktısı gerçek bir cihazda (Android 16) açılıp oynandı. Oyun henüz mağazada değil.",
  },

  cta: {
    title: "Aklında bir oyun mu var?",
    text: "Prototipten mağazaya, Unity ile mobil oyun geliştiriyorum. Fikrini 15 dakikada konuşalım.",
  },

  teaser: {
    kicker: "Öne çıkan oyun",
    text: "Yapay zekanın herkesin işini aldığı 2031'de şirketin son insan çalışanısın ve İK robotundan kaçıyorsun. Unity 6 ile, yapay zeka ajanlarıyla birlikte geliştirdiğim mobil sonsuz koşu oyunu.",
    ctaLabel: "Oyunu incele",
    phones: [
      { image: { ...SHOTS.tr.menu, alt: "Son Mesai ana menüsü" }, caption: "Ana menü" },
      { image: { ...SHOTS.tr.city, alt: "Otonom Şehir'de koşu" }, caption: "Otonom Şehir" },
      { image: { ...SHOTS.tr.gameOver, alt: "OPTİMİZE EDİLDİN oyun sonu ekranı" }, caption: "Oyun sonu" },
    ],
  },

  seo: {
    title: "Son Mesai (Out of Office): Unity 6 ile mobil sonsuz koşu oyunu",
    description:
      "Yapay zeka işini aldı, sıra sende. İK robotundan kaçan son insan çalışanın mobil sonsuz koşu oyunu: beş dünya, öğrenen engeller, meslek otomasyonu, günlük görevler, katmanlı C# mimarisi ve açık kaynak kod.",
    keywords: [
      "Son Mesai",
      "Out of Office oyun",
      "Unity 6 mobil oyun",
      "sonsuz koşu oyunu",
      "Unity C# mimari",
      "VContainer",
      "UI Toolkit",
      "yapay zeka ile oyun geliştirme",
      "Emrah Atalay",
    ],
  },
};

export default outOfOfficeTr;
