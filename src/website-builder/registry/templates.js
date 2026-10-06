// ============================================================
// TEMPLATES — قوالب موقع كاملة (نسخة احترافية)
// - مفيش إيموجي: الأيقونات بتتبعت كاسم (lucide) مثل "truck"
// - الصور من Unsplash، استبدلها بصور المتجر الحقيقية وقت الإنتاج
// ============================================================

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const IMG = {
  // عطور
  perfumeHero: u("photo-1541643600914-78b084683601", 1600),
  perfume1: u("photo-1594035910387-fea47794261f", 700),
  perfume2: u("photo-1592945403244-b3fbafd7f539", 700),
  perfume3: u("photo-1523293182086-7651a899d37f", 700),
  perfume4: u("photo-1587017539504-67cfbddac569", 700),
  perfumeStory: u("photo-1615634260167-c8cdede054de", 1000),
  // عام
  fashionHero: u("photo-1441986300917-64674bd600d8", 1600),
  fashion1: u("photo-1445205170230-053b83016050", 900),
  fashion2: u("photo-1490481651871-ab68de25d43d", 900),
  tech: u("photo-1518770660439-4636190af475", 1600),
  electronics: u("photo-1498049794561-7780e7231661", 900),
  furniture: u("photo-1555041469-a586c61ea9bc", 1600),
  home: u("photo-1556228720-195a672e8a03", 900),
  beauty: u("photo-1596462502278-27bfdc403348", 1600),
  books: u("photo-1512820790803-83ca734da794", 1200),
  books2: u("photo-1481627834876-b7833e8f5570", 900),
  prodWatch: u("photo-1523275335684-37898b6baf30", 700),
  prodShoe: u("photo-1542291026-7eec264c27ff", 700),
  prodGlasses: u("photo-1511499767150-a48a237f0083", 700),
  prodBag: u("photo-1548036328-c9fa89d128fa", 700),
  prodHeadphone: u("photo-1505740420928-5e560c06d30e", 700),
  prodCamera: u("photo-1502920917128-1aa500764cbd", 700),
  prodChair: u("photo-1555041469-a586c61ea9bc", 700),
};

const img = (url) => ({ url, publicId: "" });

// ============================================================
// بيانات تجريبية
// ============================================================
const perfumes = [
  { id: "pf1", name: "ميستيك بلان", price: 320, oldPrice: "", currency: "ج.م", image: IMG.perfume1, badge: "", rating: 4.8, inStock: true },
  { id: "pf2", name: "روز بلان", price: 450, oldPrice: 520, currency: "ج.م", image: IMG.perfume2, badge: "خصم 15%", rating: 4.9, inStock: true },
  { id: "pf3", name: "كريستال بلان", price: 620, oldPrice: "", currency: "ج.م", image: IMG.perfume3, badge: "جديد", rating: 4.7, inStock: true },
  { id: "pf4", name: "جولدن بلان", price: 950, oldPrice: "", currency: "ج.م", image: IMG.perfume4, badge: "حصري", rating: 5, inStock: true },
];

const fashionProducts = [
  { id: "p1", name: "ساعة يد كلاسيكية", price: 450, oldPrice: 600, currency: "ج.م", image: IMG.prodWatch, badge: "خصم 25%", rating: 4.5, inStock: true },
  { id: "p2", name: "حذاء رياضي أنيق", price: 620, oldPrice: "", currency: "ج.م", image: IMG.prodShoe, badge: "جديد", rating: 4.8, inStock: true },
  { id: "p3", name: "نظارة شمسية", price: 280, oldPrice: 350, currency: "ج.م", image: IMG.prodGlasses, badge: "", rating: 4.2, inStock: true },
  { id: "p4", name: "حقيبة جلدية", price: 1250, oldPrice: 1500, currency: "ج.م", image: IMG.prodBag, badge: "خصم", rating: 4.7, inStock: true },
  { id: "p5", name: "سماعات لاسلكية", price: 890, oldPrice: "", currency: "ج.م", image: IMG.prodHeadphone, badge: "الأكثر مبيعاً", rating: 4.6, inStock: true },
  { id: "p6", name: "كاميرا احترافية", price: 2800, oldPrice: 3200, currency: "ج.م", image: IMG.prodCamera, badge: "", rating: 4.8, inStock: true },
  { id: "p7", name: "كرسي مكتبي", price: 950, oldPrice: "", currency: "ج.م", image: IMG.prodChair, badge: "", rating: 4.4, inStock: true },
  { id: "p8", name: "حذاء كلاسيك", price: 740, oldPrice: "", currency: "ج.م", image: IMG.prodShoe, badge: "", rating: 4.3, inStock: true },
];

const testimonials = [
  { id: "t1", name: "أحمد محمد", role: "عميل دائم", text: "جودة ممتازة وتغليف راقي، التجربة كانت أفضل من المتوقع.", rating: 5 },
  { id: "t2", name: "سارة علي", role: "عميلة", text: "التوصيل سريع والمنتج مطابق للصور تماماً. هطلب تاني بالتأكيد.", rating: 5 },
  { id: "t3", name: "محمد حسن", role: "عميل", text: "خدمة عملاء محترمة وسريعة في الرد، شكراً لكم.", rating: 4 },
];

// ============================================================
// عناصر مشتركة (تقلل التكرار)
// ============================================================
const features = (items, extra = {}) => ({
  type: "featureStrip",
  variant: "boxed",
  content: {
    columnsDesktop: items.length, columnsTablet: 2, columnsMobile: 1,
    items: items.map(([icon, title, description], i) => ({ id: `f${i + 1}`, icon, title, description })),
  },
  style: { paddingTop: "32px", paddingBottom: "32px", ...extra },
});

const footerBasic = (title, desc, email, variant = "four-columns", dark = false) => ({
  type: "footer",
  variant,
  content: {
    title, description: desc,
    columns: [
      { title: "روابط سريعة", links: [{ label: "الرئيسية", href: "/" }, { label: "المنتجات", href: "/products" }, { label: "من نحن", href: "/about" }] },
      { title: "المساعدة", links: [{ label: "الشحن والتوصيل", href: "/contact" }, { label: "الاستبدال والاسترجاع", href: "/contact" }, { label: "تواصل معنا", href: "/contact" }] },
    ],
    phone: "+20 100 000 0000", email,
    social: [{ icon: "instagram", href: "#" }, { icon: "facebook", href: "#" }, { icon: "tiktok", href: "#" }],
    copyright: `© 2026 ${title} - جميع الحقوق محفوظة`,
  },
  style: dark ? { backgroundColor: "#0a0a0a" } : {},
});

// ============================================================
// القوالب
// ============================================================
export const TEMPLATES = {
  // ============ 1. عطور (مرجع: Auraface) ============
  perfumeStore: {
    id: "perfumeStore",
    name: "متجر عطور",
    description: "قالب جريء بخطوط ضخمة وألوان قوية لمتاجر العطور",
    thumbnail: IMG.perfumeHero,
    badge: "جديد",
    theme: {
      primaryColor: "#0B0B0B",
      secondaryColor: "#FFE600",
      accentColor: "#FFE600",
      backgroundColor: "#ffffff",
      surfaceColor: "#F4F4F2",
      textPrimaryColor: "#0B0B0B",
      textSecondaryColor: "#5C5C5C",
      fontFamily: "'IBM Plex Sans Arabic', 'Cairo', sans-serif",
      headingFontFamily: "'Cairo', sans-serif",
      headingWeight: 900,
      radius: "2px",
      shadow: "flat",
      border: "1px solid #E5E5E5",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        {
          type: "navbar", variant: "minimal-overlay",
          content: {
            title: "AURA",
            links: [{ label: "العطور", href: "/products" }, { label: "قصتنا", href: "/about" }, { label: "تواصل", href: "/contact" }],
            showSearch: true, showUser: false, showCart: true, sticky: true,
            ctaText: "تسوق الآن", ctaLink: "/products",
          },
        },
        {
          type: "hero", variant: "editorial-bottom-title",
          content: {
            badge: "وصل حديثاً",
            eyebrow: "إصدار 2026",
            title: "عطر يلهمك",
            subtitle: "تصميم بسيط وعطر مميز يرافقك في كل لحظة",
            tag: "تصميم مينيمال . رائحة مميزة",
            buttonText: "اكتشف العطور",
            buttonLink: "/products",
            backgroundImage: img(IMG.perfumeHero),
            overlayEnabled: true, overlayOpacity: 0.25,
            titleColor: "#FFE600", titleSize: "xxl", fullHeight: true,
          },
        },
        {
          type: "products", variant: "grid-bordered",
          content: {
            title: "عطور مختارة", titleAlign: "center", titleSize: "xl",
            source: "featured", limit: 4, columns: 4,
            cardVariant: "boxed-flat", buttonStyle: "outline-full", buttonText: "أضف للحقيبة",
            showRating: false, showBadge: true, showQuickAdd: true,
            items: perfumes,
          },
          style: { paddingTop: "72px", paddingBottom: "72px" },
        },
        {
          type: "categoryTabs", variant: "yellow-strip",
          content: {
            items: [
              { id: "k1", icon: "user", title: "لها", description: "أنثوي وناعم" },
              { id: "k2", icon: "users", title: "له", description: "رجولي وقوي" },
              { id: "k3", icon: "layers", title: "للجنسين", description: "متعدد الاستخدام" },
              { id: "k4", icon: "crown", title: "فاخر", description: "حصري ونادر" },
              { id: "k5", icon: "gift", title: "هدايا", description: "تغليف مميز" },
            ],
          },
          style: { backgroundColor: "#FFE600", textColor: "#0B0B0B" },
        },
        {
          type: "story", variant: "image-with-floating-card",
          content: {
            title: "قصتنا",
            paragraphs: [
              "منذ 2012 ونحن نصنع عطوراً تحمل هوية واضحة، مختارة من أجود الزيوت العطرية وبتركيبات متوازنة تدوم طويلاً.",
              "نؤمن أن العطر توقيع شخصي، لذلك نقدم تشكيلة تناسب كل ذوق ومناسبة.",
            ],
            buttonText: "اقرأ القصة", buttonLink: "/about",
            image: img(IMG.perfumeStory), imagePosition: "background",
          },
        },
        features([
          ["droplet", "زيوت أصلية", "تركيبات عالية التركيز"],
          ["truck", "شحن سريع", "توصيل خلال 2-3 أيام"],
          ["shield", "ضمان الأصالة", "منتجات أصلية 100%"],
          ["gift", "تغليف هدايا", "مجاناً عند الطلب"],
        ]),
        {
          type: "testimonials", variant: "grid",
          content: { title: "آراء عملائنا", columns: 3, items: testimonials },
        },
        {
          type: "newsletter", variant: "inline-bar",
          content: { title: "اشترك واحصل على 10% خصم", placeholder: "بريدك الإلكتروني", buttonText: "اشتراك" },
          style: { backgroundColor: "#0B0B0B", textColor: "#ffffff" },
        },
        footerBasic("AURA", "عطور بتصميم بسيط ورائحة لا تُنسى", "info@aura.com", "four-columns", true),
      ],
    }],
  },

  // ============ 2. أزياء (مرجع: Silkify) ============
  modernFashion: {
    id: "modernFashion",
    name: "أزياء عصرية",
    description: "قالب أنيق بتخطيط Bento لمتاجر الملابس",
    thumbnail: IMG.fashion1,
    badge: "الأكثر استخداماً",
    theme: {
      primaryColor: "#111827",
      secondaryColor: "#BFD8F2",
      accentColor: "#111827",
      backgroundColor: "#ffffff",
      surfaceColor: "#F5F6F7",
      textPrimaryColor: "#111827",
      textSecondaryColor: "#6B7280",
      fontFamily: "'Cairo', sans-serif",
      radius: "14px",
      shadow: "soft",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        {
          type: "announcementBar", variant: "simple",
          content: { text: "استخدم كود WELCOME10 واحصل على خصم 10% على أول طلب" },
          style: { backgroundColor: "#BFD8F2", textColor: "#111827" },
        },
        {
          type: "navbar", variant: "classic",
          content: {
            title: "Silk",
            links: [{ label: "الرئيسية", href: "/" }, { label: "المنتجات", href: "/products" }, { label: "متجرنا", href: "/about" }, { label: "تواصل", href: "/contact" }],
            showSearch: true, showUser: true, showCart: true, showWishlist: true, sticky: true,
          },
        },
        {
          type: "hero", variant: "bento-grid",
          content: {
            title: "ارتقِ بخزانتك مع أحدث صيحات الموضة",
            subtitle: "ستجد في متجرنا أسلوباً يجمع بين الأناقة والراحة.",
            proof: { avatars: [IMG.fashion1, IMG.fashion2, IMG.fashion1], value: "+80 ألف", label: "عميل راضٍ" },
            tiles: [
              { id: "b1", title: "معاطف رجالي", label: "تخفيضات الشهر", buttonText: "تسوق", link: "/products", image: img(IMG.fashion1), size: "small" },
              { id: "b2", title: "تيشيرتات قطن", label: "تخفيضات الموسم", buttonText: "تسوق", link: "/products", image: img(IMG.fashion2), size: "small" },
              { id: "b3", title: "استكشف تخفيضات العام الماضي", label: "العرض ينتهي قريباً", buttonText: "اطلب الآن", link: "/products", image: img(IMG.fashionHero), size: "large" },
            ],
          },
        },
        {
          type: "marquee", variant: "image-text",
          content: {
            speed: "slow",
            items: [
              { text: "ملابس رجالي", image: img(IMG.fashion1, 200) },
              { text: "ملابس حريمي", image: img(IMG.fashion2, 200) },
              { text: "الأكثر طلباً", image: img(IMG.fashion1, 200) },
              { text: "وصل حديثاً", image: img(IMG.fashion2, 200) },
            ],
          },
        },
        features([
          ["truck", "شحن سريع", "توصيل مجاني"],
          ["package", "استلام بدون تلامس", "توصيل لباب البيت"],
          ["shield", "دفع آمن", "حماية كاملة للمعاملات"],
          ["rotate", "استبدال سهل", "خلال 14 يوم"],
        ]),
        {
          type: "products", variant: "grid-tabs",
          content: {
            title: "الأكثر مبيعاً", subtitle: "اختيارات عملائنا",
            tabs: ["رجالي", "حريمي"],
            source: "best-sellers", limit: 8, columns: 4,
            cardVariant: "minimal", showRating: true, showBadge: true, showQuickAdd: true,
            items: fashionProducts,
          },
        },
        {
          type: "promotionalBanner", variant: "split",
          content: {
            title: "خصم 40% على المجموعة الصيفية", subtitle: "لفترة محدودة",
            buttonText: "اكتشف العرض", buttonLink: "/products",
            backgroundImage: img(IMG.fashion1), overlayOpacity: 0.45,
          },
        },
        { type: "testimonials", variant: "grid", content: { title: "ماذا يقول عملاؤنا", columns: 3, items: testimonials } },
        footerBasic("Silk", "وجهتك لأحدث صيحات الموضة بجودة عالية", "info@silk.com"),
      ],
    }],
  },

  // ============ 3. كتب وتعليم (مرجع: Redex) ============
  bookStore: {
    id: "bookStore",
    name: "مكتبة وكتب",
    description: "قالب حيوي بألوان بنفسجية لمتاجر الكتب والدورات",
    thumbnail: IMG.books,
    theme: {
      primaryColor: "#4F46E5",
      secondaryColor: "#FDE8D7",
      accentColor: "#F472B6",
      backgroundColor: "#ffffff",
      surfaceColor: "#FFF4EA",
      textPrimaryColor: "#1E1B4B",
      textSecondaryColor: "#6B7280",
      fontFamily: "'Tajawal', sans-serif",
      radius: "24px",
      shadow: "soft",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        {
          type: "hero", variant: "rounded-panel-centered",
          content: {
            navbar: { title: "Redex", links: [{ label: "الرئيسية", href: "/" }, { label: "الكتب", href: "/products" }, { label: "من نحن", href: "/about" }, { label: "تواصل", href: "/contact" }], ctaText: "اشترِ كتاباً", ctaLink: "/products" },
            title: "وسّع عقلك بقراءة كتاب",
            subtitle: "القراءة وسيلة رائعة لقضاء وقتك وبناء علاقات مع الآخرين.",
            buttonText: "حمّل الآن", buttonLink: "/products",
            secondaryButtonText: "اقرأ مجاناً", secondaryButtonLink: "/products",
            image: img(IMG.books), imageStyle: "bottom-cutout",
          },
          style: { backgroundColor: "#4F46E5", textColor: "#ffffff" },
        },
        {
          type: "story", variant: "text-image-card",
          content: {
            title: "عن مكتبة ريدكس",
            paragraphs: ["نجمع لك أفضل الكتب في مكان واحد، من الأدب إلى التطوير الذاتي، بأسعار مناسبة وتوصيل سريع."],
            image: img(IMG.books2), imagePosition: "left",
            stats: [{ label: "الكتب", value: "+260" }, { label: "المؤلفون", value: "+90" }],
          },
          style: { backgroundColor: "#FFF4EA" },
        },
        {
          type: "products", variant: "grid-modern",
          content: {
            title: "وصل حديثاً", source: "latest", limit: 4, columns: 4,
            cardVariant: "pastel", showRating: true, showBadge: true, showQuickAdd: true,
            items: fashionProducts.slice(0, 4).map((p, i) => ({ ...p, image: i % 2 ? IMG.books2 : IMG.books })),
          },
        },
        { type: "testimonials", variant: "grid", content: { title: "آراء القرّاء", columns: 3, items: testimonials } },
        {
          type: "cta", variant: "rounded-card",
          content: { title: "هيا نبدأ رحلة القراءة معاً", buttonText: "اشترك الآن", buttonLink: "/products" },
          style: { backgroundColor: "#4F46E5", textColor: "#ffffff" },
        },
        footerBasic("Redex", "مكتبتك الأولى للكتب والمعرفة", "info@redex.com"),
      ],
    }],
  },

  // ============ 4. عناية وتجميل (مرجع: Ar-Shakir) ============
  beautyStore: {
    id: "beautyStore",
    name: "عناية وتجميل",
    description: "قالب مرح بلمسة برتقالية لمنتجات العناية",
    thumbnail: IMG.beauty,
    theme: {
      primaryColor: "#EA580C",
      secondaryColor: "#2F9FB8",
      accentColor: "#2F9FB8",
      backgroundColor: "#ffffff",
      surfaceColor: "#F1F2F4",
      textPrimaryColor: "#111827",
      textSecondaryColor: "#6B7280",
      fontFamily: "'Cairo', sans-serif",
      radius: "6px",
      shadow: "flat",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        {
          type: "navbar", variant: "classic",
          content: { title: "SHAKIR", links: [{ label: "الرئيسية", href: "/" }, { label: "المنتجات", href: "/products" }, { label: "من نحن", href: "/about" }, { label: "التقييمات", href: "/" }], showSearch: true, showCart: true, sticky: true },
        },
        {
          type: "hero", variant: "split-text-image",
          content: {
            badge: "2 في 1",
            title: "بلسم وشامبو للعناية اليومية",
            subtitle: "تركيبة لطيفة تنظف وترطب في خطوة واحدة.",
            buttonText: "تصفح المجموعة", buttonLink: "/products",
            image: img(IMG.beauty), imagePosition: "right",
            details: [{ label: "المكونات", value: "خلاصات طبيعية" }, { label: "العناية", value: "مناسب للاستخدام اليومي" }],
          },
          style: { backgroundColor: "#F1F2F4" },
        },
        {
          type: "products", variant: "grid-modern",
          content: {
            title: "الأكثر مبيعاً", source: "best-sellers", limit: 8, columns: 4,
            cardVariant: "image-heavy", showRating: true, showBadge: true, showQuickAdd: true,
            items: fashionProducts,
          },
        },
        features([
          ["droplet", "تركيبة لطيفة", "خالية من المواد القاسية"],
          ["shield", "اختبار الجودة", "معتمدة ومجربة"],
          ["truck", "شحن سريع", "لكل المحافظات"],
        ]),
        { type: "testimonials", variant: "slider", content: { title: "آراء العملاء", items: testimonials } },
        {
          type: "newsletter", variant: "centered",
          content: { title: "اشترك في نشرتنا", subtitle: "أحدث العروض والنصائح على بريدك", placeholder: "بريدك الإلكتروني", buttonText: "اشتراك" },
        },
        {
          type: "contactForm", variant: "two-columns",
          content: { title: "تواصل معنا", subtitle: "سنرد عليك في أقرب وقت", fields: ["name", "email", "phone", "message"], buttonText: "إرسال" },
        },
        footerBasic("SHAKIR", "عناية يومية بجودة تثق بها", "info@shakir.com", "minimal"),
      ],
    }],
  },

  // ============ 5. بسيط وأنيق ============
  minimalStore: {
    id: "minimalStore",
    name: "بسيط وأنيق",
    description: "قالب نظيف ومينيمال للمتاجر العصرية",
    thumbnail: IMG.home,
    theme: {
      primaryColor: "#171717", secondaryColor: "#525252", accentColor: "#171717",
      backgroundColor: "#ffffff", surfaceColor: "#FAFAFA",
      textPrimaryColor: "#171717", textSecondaryColor: "#737373",
      fontFamily: "'IBM Plex Sans Arabic', system-ui", radius: "4px", shadow: "flat",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        { type: "navbar", variant: "minimal", content: { title: "STORE", links: [{ label: "المنتجات", href: "/products" }, { label: "تواصل", href: "/contact" }], showSearch: false, showUser: false, showCart: true, sticky: true } },
        { type: "hero", variant: "minimal-typography", content: { title: "منتجات. جودة. أسلوب.", subtitle: "كل ما تحتاجه في مكان واحد", buttonText: "ابدأ التسوق", buttonLink: "/products" } },
        { type: "products", variant: "grid-modern", content: { title: "منتجاتنا", source: "latest", limit: 8, columns: 4, cardVariant: "minimal", showRating: false, showBadge: false, showQuickAdd: true, items: fashionProducts } },
        { type: "cta", variant: "minimal", content: { title: "تسوق الآن", buttonText: "ابدأ", buttonLink: "/products" } },
        { type: "footer", variant: "minimal", content: { copyright: "© 2026 STORE", links: [{ label: "الرئيسية", href: "/" }, { label: "اتصل", href: "/contact" }] } },
      ],
    }],
  },

  // ============ 6. فخم داكن ============
  luxuryDark: {
    id: "luxuryDark",
    name: "فخم داكن",
    description: "قالب راقٍ للمتاجر الفاخرة",
    thumbnail: IMG.fashion2,
    theme: {
      primaryColor: "#C5A880", secondaryColor: "#C5A880", accentColor: "#C5A880",
      backgroundColor: "#0D0D0D", surfaceColor: "#161616",
      textPrimaryColor: "#F5F5F5", textSecondaryColor: "#A3A3A3",
      fontFamily: "'Amiri', 'Times New Roman', serif", radius: "0px", shadow: "dramatic",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        { type: "navbar", variant: "dark-premium", content: { title: "LUXE", links: [{ label: "المجموعة", href: "/products" }, { label: "القصة", href: "/about" }, { label: "تواصل", href: "/contact" }], showSearch: true, showUser: true, showCart: true, sticky: true } },
        { type: "hero", variant: "fullscreen-image", content: { badge: "مجموعة حصرية", title: "أناقة لا تُضاهى", subtitle: "تصاميم فاخرة بتفاصيل استثنائية", buttonText: "اكتشف المجموعة", buttonLink: "/products", backgroundImage: img(IMG.fashion2), overlayEnabled: true, overlayOpacity: 0.6, fullHeight: true } },
        { type: "products", variant: "grid-modern", content: { title: "المجموعة المختارة", source: "featured", limit: 6, columns: 3, cardVariant: "luxury", showRating: false, showBadge: false, showQuickAdd: false, items: fashionProducts.slice(0, 6) } },
        { type: "testimonials", variant: "single-featured", content: { title: "قال أحد عملائنا", items: [testimonials[0]] } },
        { type: "cta", variant: "centered", content: { title: "تجربة تسوق استثنائية", subtitle: "اكتشف الفرق بنفسك", buttonText: "ابدأ الآن", buttonLink: "/products" } },
        footerBasic("LUXE", "الفخامة في كل التفاصيل", "info@luxe.com", "dark-modern", true),
      ],
    }],
  },

  // ============ 7. إلكترونيات ============
  techStore: {
    id: "techStore",
    name: "متجر إلكترونيات",
    description: "قالب عصري لمتاجر التقنية",
    thumbnail: IMG.tech,
    theme: {
      primaryColor: "#1E40AF", secondaryColor: "#3B82F6", accentColor: "#06B6D4",
      backgroundColor: "#F8FAFC", surfaceColor: "#ffffff",
      textPrimaryColor: "#0F172A", textSecondaryColor: "#64748B",
      fontFamily: "'Tajawal', Arial, sans-serif", radius: "12px", shadow: "soft",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        { type: "navbar", variant: "ecommerce-full", content: { title: "Tech Store", links: [{ label: "اللابتوبات", href: "/products" }, { label: "الهواتف", href: "/products" }, { label: "الإكسسوارات", href: "/products" }, { label: "العروض", href: "/products" }], showSearch: true, showUser: true, showCart: true, showWishlist: true, searchInline: true, sticky: true } },
        { type: "hero", variant: "split-text-image", content: { badge: "أحدث الإصدارات", title: "تقنية المستقبل بين يديك", subtitle: "أحدث الأجهزة بأسعار تنافسية وضمان معتمد", buttonText: "تصفح الآن", buttonLink: "/products", image: img(IMG.electronics), imagePosition: "right" } },
        features([
          ["wrench", "صيانة معتمدة", "خدمة احترافية"],
          ["truck", "توصيل مجاني", "للطلبات فوق 1000 ج.م"],
          ["shield", "ضمان الوكيل", "ضمان أصلي معتمد"],
        ]),
        { type: "products", variant: "grid-modern", content: { title: "الأكثر مبيعاً", source: "best-sellers", limit: 8, columns: 4, cardVariant: "elevated", showRating: true, showBadge: true, showQuickAdd: true, items: fashionProducts } },
        { type: "cta", variant: "centered", content: { title: "جاهز لترقية أجهزتك؟", subtitle: "استفد من عروضنا الحصرية", buttonText: "تسوق الآن", buttonLink: "/products" } },
        { ...footerBasic("Tech Store", "وجهتك الأولى للتقنية", "info@techstore.com", "with-payments"), content: { ...footerBasic("Tech Store", "وجهتك الأولى للتقنية", "info@techstore.com").content, showPayments: true, paymentMethods: ["visa", "mastercard", "paypal", "cod"] } },
      ],
    }],
  },

  // ============ 8. أثاث ============
  furnitureStore: {
    id: "furnitureStore",
    name: "أثاث ومفروشات",
    description: "قالب أنيق لمتاجر الأثاث والديكور",
    thumbnail: IMG.furniture,
    theme: {
      primaryColor: "#5D4037", secondaryColor: "#8D6E63", accentColor: "#A1887F",
      backgroundColor: "#FAF8F5", surfaceColor: "#ffffff",
      textPrimaryColor: "#3E2723", textSecondaryColor: "#795548",
      fontFamily: "'El Messiri', sans-serif", radius: "8px", shadow: "soft",
    },
    pages: [{
      name: "الرئيسية", slug: "", pageType: "home",
      sections: [
        { type: "navbar", variant: "centered", content: { title: "بيتي", links: [{ label: "الغرف", href: "/products" }, { label: "الصالونات", href: "/products" }, { label: "غرف النوم", href: "/products" }, { label: "الإضاءة", href: "/products" }], showSearch: true, showUser: true, showCart: true, sticky: true } },
        { type: "hero", variant: "fullscreen-image", content: { badge: "مجموعة 2026", title: "أثاث يليق ببيتك", subtitle: "تصاميم عصرية وجودة عالية بأسعار مناسبة", buttonText: "تصفح المجموعة", buttonLink: "/products", backgroundImage: img(IMG.furniture), overlayEnabled: true, overlayOpacity: 0.5, fullHeight: true } },
        { type: "categories", variant: "grid-overlay", content: { title: "تصفح حسب الغرفة", source: "manual", columns: 4, items: [
          { id: "c1", name: "غرفة المعيشة", image: IMG.home, count: 45 },
          { id: "c2", name: "غرفة النوم", image: IMG.furniture, count: 32 },
          { id: "c3", name: "المطبخ", image: IMG.home, count: 28 },
          { id: "c4", name: "المكتب", image: IMG.prodChair, count: 20 },
        ] } },
        { type: "products", variant: "grid-modern", content: { title: "الأكثر مبيعاً", source: "best-sellers", limit: 8, columns: 4, cardVariant: "elevated", showRating: true, showBadge: true, showQuickAdd: true, items: fashionProducts } },
        { type: "story", variant: "text-image", content: { title: "قصة بيتي", paragraphs: ["بدأنا في 2015 برؤية واضحة: أثاث عالي الجودة بأسعار في متناول الجميع.", "اليوم نخدم أكثر من 10,000 عميل في جميع أنحاء مصر."], image: img(IMG.furniture), imagePosition: "right" } },
        { type: "cta", variant: "centered", content: { title: "هل تحتاج مساعدة في الاختيار؟", subtitle: "فريقنا جاهز لمساعدتك", buttonText: "تواصل معنا", buttonLink: "/contact" } },
        footerBasic("بيتي", "أثاث يليق ببيتك", "info@beity.com"),
      ],
    }],
  },
};

// ============================================================
// HELPERS
// ============================================================
export const getTemplate = (id) => TEMPLATES[id] || null;

export const getTemplateList = () =>
  Object.entries(TEMPLATES).map(([key, tpl]) => ({
    key, id: tpl.id, name: tpl.name, description: tpl.description,
    thumbnail: tpl.thumbnail, badge: tpl.badge, theme: tpl.theme,
    pageCount: tpl.pages.length,
    sectionCount: tpl.pages.reduce((s, p) => s + p.sections.length, 0),
  }));
