// ============================================================
// SECTION REGISTRY - كل سكشن + 5 variants لكل سكشن
// ============================================================

export const SECTION_CATEGORIES = {
  NAVIGATION: "navigation",
  HERO: "hero",
  CONTENT: "content",
  COMMERCE: "commerce",
  MARKETING: "marketing",
  SOCIAL: "social",
  FOOTER: "footer",
};

export const PAGE_TYPES = {
  HOME: "home",
  ABOUT: "about",
  SERVICES: "services",
  PRODUCTS: "products",
  PRODUCT_DETAILS: "product-details",
  CART: "cart",
  CHECKOUT: "checkout",
  MY_ORDERS: "my-orders",
  CONTACT: "contact",
  CUSTOM: "custom",
};

// ============================================================
// SECTION REGISTRY
// ============================================================
export const SECTION_REGISTRY = {
  // ============ NAVBAR ============
  navbar: {
    type: "navbar",
    label: "شريط التنقل",
    icon: "☰",
    category: SECTION_CATEGORIES.NAVIGATION,
    allowedPages: "all",
    defaultVariant: "classic",
    supportsResponsive: true,
    variants: {
      classic: {
        name: "كلاسيكي",
        description: "شعار + روابط + أيقونات",
        preview: "navbar-classic",
        defaults: {
          content: {
            title: "متجري",
            logo: null,
            links: [
              { label: "الرئيسية", href: "/" },
              { label: "المنتجات", href: "/products" },
              { label: "من نحن", href: "/about" },
              { label: "اتصل", href: "/contact" },
            ],
            showSearch: true, showUser: true, showCart: true,
            showWishlist: false, sticky: true, transparent: false,
            cartCount: 0, wishlistCount: 0,
          },
          layout: { height: "72px", align: "center" },
          style: {
            backgroundColor: "#ffffff",
            color: "#0A2947",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          },
        },
      },
      centered: {
        name: "متمركز",
        description: "شعار في المنتصف مع روابط حوله",
        defaults: {
          content: {
            title: "متجري",
            logo: null,
            links: [
              { label: "الرئيسية", href: "/" },
              { label: "المنتجات", href: "/products" },
              { label: "من نحن", href: "/about" },
              { label: "اتصل", href: "/contact" },
            ],
            showSearch: true, showUser: true, showCart: true,
            layout: "centered", sticky: true, transparent: false,
          },
          style: { backgroundColor: "#ffffff", color: "#0A2947" },
        },
      },
      minimal: {
        name: "بسيط",
        description: "شعار يسار + روابط يمين بدون أيقونات",
        defaults: {
          content: {
            title: "متجري", logo: null,
            links: [
              { label: "المنتجات", href: "/products" },
              { label: "تواصل", href: "/contact" },
            ],
            showSearch: false, showUser: false, showCart: true,
            sticky: true,
          },
          style: { backgroundColor: "#ffffff", color: "#0A2947" },
        },
      },
      "dark-premium": {
        name: "داكن فخم",
        description: "خلفية داكنة + شعار ذهبي",
        defaults: {
          content: {
            title: "LUXE", logo: null,
            links: [
              { label: "المجموعة", href: "/products" },
              { label: "القصة", href: "/about" },
              { label: "تواصل", href: "/contact" },
            ],
            showSearch: true, showUser: true, showCart: true,
            sticky: true,
          },
          style: {
            backgroundColor: "#0d0d0d",
            color: "#c5a880",
            borderBottom: "1px solid rgba(197,168,128,0.2)",
          },
        },
      },
      "ecommerce-full": {
        name: "تجاري كامل",
        description: "بحث مدمج + كل الأيقونات",
        defaults: {
          content: {
            title: "متجري", logo: null,
            links: [
              { label: "الأقسام", href: "/products" },
              { label: "العروض", href: "/products?sale=1" },
              { label: "تتبع طلبك", href: "/orders" },
            ],
            showSearch: true, showUser: true, showCart: true, showWishlist: true,
            searchInline: true, sticky: true,
          },
          style: { backgroundColor: "#ffffff", color: "#0A2947" },
        },
      },
    },
  },

  // ============ ANNOUNCEMENT BAR ============
  announcementBar: {
    type: "announcementBar",
    label: "شريط الإعلان",
    icon: "📢",
    category: SECTION_CATEGORIES.NAVIGATION,
    allowedPages: "all",
    defaultVariant: "simple",
    variants: {
      simple: {
        name: "بسيط",
        defaults: {
          content: { text: "توصيل مجاني للطلبات فوق 500 ج.م", showClose: true },
          style: { backgroundColor: "#0A2947", color: "#ffffff" },
        },
      },
      marquee: {
        name: "متحرك",
        defaults: {
          content: { text: "🔥 خصم 30% على أول طلب - استخدم كود WELCOME30", animated: true },
          style: { backgroundColor: "#8B5E3C", color: "#ffffff" },
        },
      },
      "two-tone": {
        name: "لونين",
        defaults: {
          content: { text: "شحن سريع 🚚", ctaText: "اعرف المزيد", ctaLink: "#" },
          style: { backgroundColor: "#0A2947", color: "#ffffff" },
        },
      },
      minimal: {
        name: "مختصر",
        defaults: {
          content: { text: "وصلت التشكيلة الجديدة" },
          style: { backgroundColor: "#F3E4C9", color: "#0A2947" },
        },
      },
      countdown: {
        name: "عداد تنازلي",
        defaults: {
          content: { text: "ينتهي العرض بعد", countdown: true, hours: 24 },
          style: { backgroundColor: "#dc2626", color: "#ffffff" },
        },
      },
    },
  },

  // ============ HERO ============
  hero: {
    type: "hero",
    label: "قسم رئيسي",
    icon: "🌟",
    category: SECTION_CATEGORIES.HERO,
    allowedPages: "all",
    defaultVariant: "fullscreen-image",
    supportsBackgroundImage: true,
    supportsOverlay: true,
    variants: {
      "fullscreen-image": {
        name: "صورة كاملة",
        description: "خلفية ملء الشاشة مع نص متمركز",
        defaults: {
          content: {
            badge: "تشكيلة 2026",
            title: "اكتشف أحدث التشكيلات",
            subtitle: "تسوق أفضل المنتجات بجودة عالية وتوصيل سريع",
            buttonText: "تسوق الآن", buttonLink: "/products",
            secondaryButtonText: "اكتشف", secondaryButtonLink: "#",
            backgroundImage: null, overlayEnabled: true, overlayOpacity: 0.5,
            fullHeight: true, contentAlign: "center",
          },
          style: { color: "#ffffff", minHeight: "600px" },
        },
      },
      "split-text-image": {
        name: "نص + صورة",
        description: "نص يسار وصورة يمين",
        defaults: {
          content: {
            badge: "جديد",
            title: "تصاميم عصرية بأسعار منافسة",
            subtitle: "اكتشف مجموعتنا الجديدة المصممة بعناية لتناسب ذوقك",
            buttonText: "تسوق الآن", buttonLink: "/products",
            image: null, imagePosition: "right",
          },
          layout: { direction: "row", gap: "48px" },
          style: { backgroundColor: "#F3E4C9", color: "#0A2947", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "minimal-typography": {
        name: "طباعي بسيط",
        description: "عنوان كبير فقط",
        defaults: {
          content: {
            title: "منتجات. جودة. أسلوب.",
            subtitle: "كل ما تحتاجه في مكان واحد",
            buttonText: "ابدأ التسوق", buttonLink: "/products",
            showImage: false,
          },
          style: { backgroundColor: "#ffffff", color: "#0A2947", paddingTop: "120px", paddingBottom: "120px", textAlign: "center" },
        },
      },
      "split-screen": {
        name: "شاشة مقسومة",
        description: "صورة 50% + محتوى 50%",
        defaults: {
          content: {
            title: "تسوق بذكاء",
            subtitle: "تجربة تسوق فريدة",
            buttonText: "اكتشف", buttonLink: "/products",
            image: null, imagePosition: "left",
          },
          layout: { split: true },
          style: { minHeight: "500px" },
        },
      },
      "promo-cards": {
        name: "بطاقات ترويجية",
        description: "عنوان + بطاقات منتجات",
        defaults: {
          content: {
            badge: "عرض محدود",
            title: "خصومات تصل إلى 50%",
            subtitle: "على مجموعة مختارة من المنتجات",
            buttonText: "اكتشف العروض", buttonLink: "/products?sale=1",
            productCards: [
              { id: "p1", name: "منتج 1", price: "199" },
              { id: "p2", name: "منتج 2", price: "299" },
              { id: "p3", name: "منتج 3", price: "399" },
            ],
          },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
    },
  },

  // ============ CATEGORIES ============
  categories: {
    type: "categories",
    label: "الأقسام",
    icon: "🗂️",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.HOME, PAGE_TYPES.PRODUCTS],
    defaultVariant: "grid-overlay",
    variants: {
      "grid-overlay": {
        name: "شبكة مع overlay",
        defaults: {
          content: {
            title: "تسوق حسب القسم",
            subtitle: "اختر من مجموعاتنا",
            columns: 4,
            items: [],
            source: "categories", // fetch from real categories API
            limit: 4,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "circle-grid": {
        name: "دوائر",
        defaults: {
          content: {
            title: "الأقسام",
            layout: "circles",
            columns: 6,
            items: [],
            source: "categories",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "horizontal-scroll": {
        name: "تمرير أفقي",
        defaults: {
          content: {
            title: "تصفح الأقسام",
            layout: "scroll",
            items: [],
            source: "categories",
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "masonry": {
        name: "شبكة غير منتظمة",
        defaults: {
          content: {
            title: "اكتشف",
            layout: "masonry",
            items: [],
            source: "categories",
            limit: 6,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "list-with-count": {
        name: "قائمة مع عداد",
        defaults: {
          content: {
            title: "كل الأقسام",
            layout: "list",
            items: [],
            source: "categories",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
    },
  },

  // ============ PRODUCTS / FEATURED ============
  products: {
    type: "products",
    label: "شبكة منتجات",
    icon: "🛍️",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.HOME, PAGE_TYPES.PRODUCTS],
    defaultVariant: "grid-modern",
    variants: {
      "grid-modern": {
        name: "شبكة عصرية",
        defaults: {
          content: {
            title: "المنتجات المميزة",
            subtitle: "تصفح أحدث ما وصلنا",
            source: "latest", // latest | featured | sale | category
            categoryId: null,
            limit: 8,
            columns: 4,
            cardVariant: "elevated",
            showRating: true,
            showBadge: true,
            showQuickAdd: true,
            showWishlist: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "grid-masonry": {
        name: "شبكة masonry",
        defaults: {
          content: {
            title: "مختارات",
            source: "featured", limit: 6, layout: "masonry",
            cardVariant: "minimal",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "carousel": {
        name: "سلايدر",
        defaults: {
          content: {
            title: "الأكثر مبيعاً",
            source: "best-sellers", limit: 10, layout: "carousel",
            cardVariant: "hover",
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "list-view": {
        name: "عرض قائمة",
        defaults: {
          content: {
            title: "كل المنتجات",
            source: "latest", limit: 6, layout: "list",
            cardVariant: "horizontal",
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "grid-with-filter": {
        name: "شبكة مع فلتر",
        defaults: {
          content: {
            title: "تسوق",
            source: "latest", limit: 12, columns: 3,
            showFilter: true,
            cardVariant: "luxury",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
    },
  },

  // ============ PROMOTIONAL BANNER ============
  promotionalBanner: {
    type: "promotionalBanner",
    label: "بانر ترويجي",
    icon: "🎯",
    category: SECTION_CATEGORIES.MARKETING,
    allowedPages: "all",
    defaultVariant: "fullwidth",
    variants: {
      fullwidth: {
        name: "عرض كامل",
        defaults: {
          content: {
            title: "خصم 40% على المجموعة الصيفية",
            subtitle: "لفترة محدودة",
            buttonText: "اكتشف العرض", buttonLink: "/products",
            backgroundImage: null, overlayOpacity: 0.6,
          },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "split-image": {
        name: "صورة + نص",
        defaults: {
          content: {
            title: "مجموعة جديدة",
            subtitle: "تصاميم حصرية",
            buttonText: "اكتشف", buttonLink: "/products",
            image: null, imagePosition: "right",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      countdown: {
        name: "مع عداد",
        defaults: {
          content: {
            title: "العرض ينتهي قريباً",
            subtitle: "لا تفوّت الفرصة",
            buttonText: "تسوق", buttonLink: "/products",
            showCountdown: true, hours: 48,
          },
          style: { backgroundColor: "#dc2626", color: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "two-cards": {
        name: "بطاقتين",
        defaults: {
          content: {
            card1: { title: "للرجال", buttonText: "تسوق", link: "/products?gender=men" },
            card2: { title: "للنساء", buttonText: "تسوق", link: "/products?gender=women" },
          },
          style: { paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      minimal: {
        name: "بسيط",
        defaults: {
          content: {
            title: "شحن مجاني",
            subtitle: "لكل الطلبات",
            buttonText: "اعرف المزيد", buttonLink: "#",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "40px", paddingBottom: "40px", textAlign: "center" },
        },
      },
    },
  },

  // ============ SERVICES ============
 services: {
  title: { type: "text", label: "العنوان" },
  subtitle: { type: "textarea", label: "الوصف" },
  
  // ⭐ التحكم في الشبكة
  columnsMobile: {
    type: "select", label: "أعمدة الموبايل",
    options: [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
    ],
  },
  columnsTablet: {
    type: "select", label: "أعمدة التابلت",
    options: [
      { value: 2, label: "2" },
      { value: 3, label: "3" },
    ],
  },
  columnsDesktop: {
    type: "select", label: "أعمدة الديسكتوب",
    options: [
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
    ],
  },
  
  // ⭐ حجم الأيقونة
  iconSize: {
    type: "select", label: "حجم الأيقونة",
    options: [
      { value: "sm", label: "صغير" },
      { value: "md", label: "متوسط" },
      { value: "lg", label: "كبير" },
    ],
  },
  
  // ⭐ نمط البطاقة
  cardStyle: {
    type: "select", label: "نمط البطاقة",
    options: [
      { value: "elevated", label: "مرتفعة (ظل)" },
      { value: "outlined", label: "بإطار" },
      { value: "flat", label: "بدون" },
      { value: "glass", label: "زجاجية" },
    ],
  },
  
  // ⭐ حجم البطاقة
  cardPadding: {
    type: "select", label: "حجم البطاقة",
    options: [
      { value: "compact", label: "مضغوطة" },
      { value: "normal", label: "عادية" },
      { value: "spacious", label: "واسعة" },
    ],
  },
  
  // ⭐ محاذاة المحتوى
  contentAlign: {
    type: "select", label: "محاذاة المحتوى",
    options: [
      { value: "center", label: "وسط" },
      { value: "start", label: "يسار" },
      { value: "end", label: "يمين" },
    ],
  },
  
  // ⭐ إظهار الوصف
  showDescription: { type: "toggle", label: "إظهار الوصف" },
  
  // ⭐ لون الأيقونة
  iconColor: { type: "color", label: "لون الأيقونة" },
}
,
  // ============ TESTIMONIALS ============
  testimonials: {
    type: "testimonials",
    label: "شهادات العملاء",
    icon: "💬",
    category: SECTION_CATEGORIES.SOCIAL,
    allowedPages: "all",
    defaultVariant: "grid",
    variants: {
      grid: {
        name: "شبكة",
        defaults: {
          content: {
            title: "ماذا يقول عملاؤنا",
            columns: 3,
            items: [
              { id: "t1", name: "أحمد محمد", role: "عميل", text: "خدمة ممتازة ومنتجات عالية الجودة", rating: 5, avatar: null },
              { id: "t2", name: "سارة علي", role: "عميلة", text: "تجربة تسوق رائعة، سأطلب مرة أخرى", rating: 5, avatar: null },
              { id: "t3", name: "محمد حسن", role: "عميل", text: "توصيل سريع وتغليف احترافي", rating: 4, avatar: null },
            ],
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      carousel: {
        name: "سلايدر",
        defaults: {
          content: { title: "آراء العملاء", layout: "carousel", items: [] },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "single-featured": {
        name: "مميز",
        defaults: {
          content: { title: "قال أحد عملائنا", layout: "featured", items: [] },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "100px", paddingBottom: "100px" },
        },
      },
      "with-images": {
        name: "مع صور",
        defaults: {
          content: { title: "شهادات", items: [], showAvatars: true },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      masonry: {
        name: "masonry",
        defaults: {
          content: { title: "آراء متنوعة", layout: "masonry", items: [] },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
    },
  },

  // ============ CTA ============
  cta: {
    type: "cta",
    label: "دعوة للعمل",
    icon: "📣",
    category: SECTION_CATEGORIES.MARKETING,
    allowedPages: "all",
    defaultVariant: "centered",
    variants: {
      centered: {
        name: "متمركز",
        defaults: {
          content: {
            title: "جاهز للبدء؟",
            subtitle: "اطلب الآن واستمتع بالتوصيل المجاني",
            buttonText: "ابدأ التسوق", buttonLink: "/products",
          },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "80px", paddingBottom: "80px", textAlign: "center" },
        },
      },
      "split": {
        name: "مقسوم",
        defaults: {
          content: {
            title: "عرض خاص",
            subtitle: "خصم 25% على أول طلب",
            buttonText: "اكتشف", buttonLink: "/products",
            imagePosition: "right",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      banner: {
        name: "بانر",
        defaults: {
          content: {
            title: "لا تفوّت العروض",
            buttonText: "تسوق", buttonLink: "/products",
          },
          style: { backgroundColor: "#8B5E3C", color: "#ffffff", paddingTop: "50px", paddingBottom: "50px" },
        },
      },
      "with-form": {
        name: "مع نموذج",
        defaults: {
          content: {
            title: "انضم لنشرتنا",
            subtitle: "احصل على خصم 10%",
            placeholder: "بريدك الإلكتروني",
            buttonText: "اشترك",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px", textAlign: "center" },
        },
      },
      minimal: {
        name: "بسيط",
        defaults: {
          content: { title: "تسوق الآن", buttonText: "ابدأ", buttonLink: "/products" },
          style: { backgroundColor: "#ffffff", paddingTop: "50px", paddingBottom: "50px", textAlign: "center" },
        },
      },
    },
  },

  // ============ NEWSLETTER ============
  newsletter: {
    type: "newsletter",
    label: "النشرة البريدية",
    icon: "✉️",
    category: SECTION_CATEGORIES.MARKETING,
    allowedPages: "all",
    defaultVariant: "centered",
    variants: {
      centered: {
        name: "متمركز",
        defaults: {
          content: {
            title: "اشترك في نشرتنا",
            subtitle: "احصل على آخر العروض والمنتجات",
            placeholder: "بريدك الإلكتروني",
            buttonText: "اشترك",
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px", textAlign: "center" },
        },
      },
      "with-image": {
        name: "مع صورة",
        defaults: {
          content: { title: "اشترك", image: null, imagePosition: "right" },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      inline: {
        name: "أفقي",
        defaults: {
          content: { title: "اشترك", placeholder: "بريدك", buttonText: "اشترك" },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "40px", paddingBottom: "40px" },
        },
      },
      "with-benefits": {
        name: "مع مميزات",
        defaults: {
          content: {
            title: "اشترك واستفد",
            benefits: ["خصم 10%", "عروض حصرية", "أخبار المنتجات"],
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      minimal: {
        name: "بسيط",
        defaults: {
          content: { title: "النشرة", placeholder: "بريدك", buttonText: "→" },
          style: { backgroundColor: "#ffffff", paddingTop: "40px", paddingBottom: "40px" },
        },
      },
    },
  },

  // ============ FAQ ============
  faq: {
    type: "faq",
    label: "الأسئلة الشائعة",
    icon: "❓",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: "all",
    defaultVariant: "accordion",
    variants: {
      accordion: {
        name: "أكورديون",
        defaults: {
          content: {
            title: "الأسئلة الشائعة",
            items: [
              { id: "f1", question: "ما هي مدة التوصيل؟", answer: "24-48 ساعة داخل القاهرة والجيزة" },
              { id: "f2", question: "هل يمكنني الإرجاع؟", answer: "نعم، خلال 14 يوم من الاستلام" },
              { id: "f3", question: "ما هي طرق الدفع؟", answer: "كاش عند الاستلام، بطاقة، محفظة إلكترونية" },
            ],
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "two-columns": {
        name: "عمودان",
        defaults: {
          content: { title: "الأسئلة الشائعة", layout: "columns", items: [] },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "cards": {
        name: "بطاقات",
        defaults: {
          content: { title: "الأسئلة", layout: "cards", items: [] },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "with-contact": {
        name: "مع تواصل",
        defaults: {
          content: { title: "الأسئلة", showContact: true, contactText: "لم تجد إجابتك؟" },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      minimal: {
        name: "بسيط",
        defaults: {
          content: { title: "FAQ", items: [] },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
    },
  },

  // ============ ABOUT SECTIONS ============
  aboutHero: {
    type: "aboutHero",
    label: "عنوان About",
    icon: "📖",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.ABOUT],
    defaultVariant: "with-image",
    variants: {
      "with-image": {
        name: "مع صورة",
        defaults: {
          content: {
            title: "من نحن",
            subtitle: "قصة شغفنا بالجودة",
            image: null,
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "100px", paddingBottom: "100px" },
        },
      },
      centered: {
        name: "متمركز",
        defaults: {
          content: { title: "قصتنا", subtitle: "منذ 2020" },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "120px", paddingBottom: "120px", textAlign: "center" },
        },
      },
      minimal: {
        name: "بسيط",
        defaults: {
          content: { title: "من نحن", subtitle: "نبذة عنا" },
          style: { paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "full-bg": {
        name: "خلفية كاملة",
        defaults: {
          content: { title: "من نحن", backgroundImage: null, overlayOpacity: 0.5 },
          style: { minHeight: "500px" },
        },
      },
      "split": {
        name: "مقسوم",
        defaults: {
          content: { title: "قصتنا", image: null, imagePosition: "left" },
          style: { paddingTop: "100px", paddingBottom: "100px" },
        },
      },
    },
  },

  story: {
    type: "story",
    label: "قصتنا",
    icon: "📜",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.ABOUT],
    defaultVariant: "text-image",
    variants: {
      "text-image": {
        name: "نص + صورة",
        defaults: {
          content: {
            title: "رحلتنا",
            paragraphs: ["بدأنا في 2020 برؤية واضحة...", "اليوم نخدم أكثر من 10,000 عميل..."],
            image: null,
            imagePosition: "right",
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      timeline: {
        name: "خط زمني",
        defaults: {
          content: {
            title: "محطات مهمة",
            events: [
              { year: "2020", title: "التأسيس", description: "..." },
              { year: "2022", title: "التوسع", description: "..." },
              { year: "2024", title: "10K عميل", description: "..." },
            ],
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "two-columns": {
        name: "عمودان",
        defaults: {
          content: { title: "من نحن", left: "...", right: "..." },
          style: { paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      quotes: {
        name: "اقتباسات",
        defaults: {
          content: { title: "قيمنا", quote: "الجودة أولاً" },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "100px", paddingBottom: "100px" },
        },
      },
      stats: {
        name: "إحصائيات",
        defaults: {
          content: {
            stats: [
              { value: "10K+", label: "عميل" },
              { value: "5K+", label: "منتج" },
              { value: "98%", label: "رضا" },
            ],
          },
          style: { paddingTop: "80px", paddingBottom: "80px" },
        },
      },
    },
  },

  // ============ SERVICES PAGE ============
  servicesHero: {
    type: "servicesHero",
    label: "عنوان الخدمات",
    icon: "🎯",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.SERVICES],
    defaultVariant: "centered",
    variants: {
      centered: {
        name: "متمركز",
        defaults: {
          content: { title: "خدماتنا", subtitle: "ما نقدمه لك" },
          style: { backgroundColor: "#F3E4C9", paddingTop: "100px", paddingBottom: "100px", textAlign: "center" },
        },
      },
      "with-image": {
        name: "مع صورة",
        defaults: { content: { title: "خدماتنا", image: null }, style: { paddingTop: "80px", paddingBottom: "80px" } },
      },
      minimal: {
        name: "بسيط",
        defaults: { content: { title: "خدماتنا" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "full-bg": {
        name: "خلفية كاملة",
        defaults: { content: { title: "خدماتنا", backgroundImage: null }, style: { minHeight: "400px" } },
      },
      "with-breadcrumb": {
        name: "مع مسار",
        defaults: { content: { title: "خدماتنا", breadcrumb: ["الرئيسية", "الخدمات"] }, style: { paddingTop: "80px", paddingBottom: "80px" } },
      },
    },
  },

  servicesGrid: {
    type: "servicesGrid",
    label: "شبكة الخدمات",
    icon: "⊞",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.SERVICES],
    defaultVariant: "cards",
    variants: {
      cards: {
        name: "بطاقات",
        defaults: {
          content: {
            items: [
              { id: "sg1", icon: "🚀", title: "خدمة 1", description: "..." },
              { id: "sg2", icon: "💎", title: "خدمة 2", description: "..." },
            ],
            columns: 3,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "with-images": {
        name: "مع صور",
        defaults: { content: { items: [], showImages: true }, style: { paddingTop: "80px", paddingBottom: "80px" } },
      },
      "icon-list": {
        name: "قائمة",
        defaults: { content: { items: [], layout: "list" }, style: { paddingTop: "80px", paddingBottom: "80px" } },
      },
      numbered: {
        name: "مرقّم",
        defaults: { content: { items: [], layout: "numbered" }, style: { paddingTop: "80px", paddingBottom: "80px" } },
      },
      "alternating": {
        name: "متبادل",
        defaults: { content: { items: [], layout: "alternating" }, style: { paddingTop: "80px", paddingBottom: "80px" } },
      },
    },
  },

  // ============ SEARCH ============
  search: {
    type: "search",
    label: "بحث",
    icon: "🔍",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.PRODUCTS, PAGE_TYPES.HOME],
    defaultVariant: "inline",
    variants: {
      inline: {
        name: "أفقي",
        defaults: {
          content: {
            placeholder: "ابحث عن منتج...",
            buttonText: "بحث",
            showCategories: true,
            showFilters: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "40px", paddingBottom: "40px" },
        },
      },
      "large-centered": {
        name: "كبير متمركز",
        defaults: {
          content: { placeholder: "ابحث...", buttonText: "بحث", large: true },
          style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" },
        },
      },
      "with-voice": {
        name: "مع صوت",
        defaults: { content: { placeholder: "ابحث...", showVoice: true } },
        style: { paddingTop: "40px", paddingBottom: "40px" },
      },
      "with-suggestions": {
        name: "مع اقتراحات",
        defaults: { content: { placeholder: "ابحث...", suggestions: ["ساعات", "أحذية", "عطور"] } },
        style: { paddingTop: "40px", paddingBottom: "40px" },
      },
      minimal: {
        name: "بسيط",
        defaults: { content: { placeholder: "بحث", buttonText: "→" } },
        style: { paddingTop: "30px", paddingBottom: "30px" },
      },
    },
  },

  // ============ FILTERS ============
  filters: {
    type: "filters",
    label: "فلاتر",
    icon: "🎚️",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.PRODUCTS],
    defaultVariant: "sidebar",
    variants: {
      sidebar: {
        name: "شريط جانبي",
        defaults: {
          content: {
            categories: true, price: true, rating: true,
            brands: false, availability: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "40px", paddingBottom: "40px" },
        },
      },
      "top-bar": {
        name: "شريط علوي",
        defaults: { content: { layout: "horizontal" }, style: { paddingTop: "20px", paddingBottom: "20px" } },
      },
      "drawer": {
        name: "درج جانبي",
        defaults: { content: { layout: "drawer" }, style: {} },
      },
      accordion: {
        name: "أكورديون",
        defaults: { content: { layout: "accordion" }, style: { paddingTop: "40px", paddingBottom: "40px" } },
      },
      pills: {
        name: "كبسولات",
        defaults: { content: { layout: "pills" }, style: { paddingTop: "20px", paddingBottom: "20px" } },
      },
    },
  },

  // ============ PRODUCT DETAILS ============
  productDetails: {
    type: "productDetails",
    label: "تفاصيل المنتج",
    icon: "📄",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.PRODUCT_DETAILS],
    defaultVariant: "gallery-left",
    variants: {
      "gallery-left": {
        name: "معرض يسار",
        defaults: {
          content: {
            showThumbnails: true,
            showRating: true,
            showVariants: true,
            showQuantity: true,
            showAddToCart: true,
            showBuyNow: true,
            showWishlist: true,
            showFeatures: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "gallery-right": {
        name: "معرض يمين",
        defaults: { content: { galleryPosition: "right", showThumbnails: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "gallery-top": {
        name: "معرض أعلى",
        defaults: { content: { galleryPosition: "top", layout: "stacked" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "split-gallery": {
        name: "معرض مقسوم",
        defaults: { content: { galleryLayout: "split" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "sticky-info": {
        name: "معلومات ثابتة",
        defaults: { content: { stickyInfo: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
    },
  },

  // ============ RELATED PRODUCTS ============
  relatedProducts: {
    type: "relatedProducts",
    label: "منتجات مشابهة",
    icon: "🔗",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.PRODUCT_DETAILS],
    defaultVariant: "grid",
    variants: {
      grid: { name: "شبكة", defaults: { content: { title: "منتجات مشابهة", limit: 4, columns: 4 }, style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" } } },
      carousel: { name: "سلايدر", defaults: { content: { layout: "carousel", limit: 6 }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      list: { name: "قائمة", defaults: { content: { layout: "list", limit: 4 }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      compact: { name: "مختصر", defaults: { content: { compact: true, limit: 4 }, style: { paddingTop: "40px", paddingBottom: "40px" } } },
      "with-tabs": { name: "مع تبويبات", defaults: { content: { tabs: ["مشابهة", "الأكثر مبيعاً"] }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
    },
  },

  // ============ REVIEWS ============
  reviews: {
    type: "reviews",
    label: "التقييمات",
    icon: "⭐",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.PRODUCT_DETAILS],
    defaultVariant: "list",
    variants: {
      list: { name: "قائمة", defaults: { content: { title: "التقييمات", showForm: true }, style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" } } },
      grid: { name: "شبكة", defaults: { content: { layout: "grid" }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      "with-summary": { name: "مع ملخص", defaults: { content: { showSummary: true, showForm: true }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      "compact": { name: "مختصر", defaults: { content: { compact: true }, style: { paddingTop: "40px", paddingBottom: "40px" } } },
      "with-images": { name: "مع صور", defaults: { content: { showImages: true }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
    },
  },

  // ============ CART ============
  cart: {
    type: "cart",
    label: "سلة التسوق",
    icon: "🛒",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.CART],
    defaultVariant: "sidebar-summary",
    variants: {
      "sidebar-summary": {
        name: "ملخص جانبي",
        defaults: {
          content: {
            title: "سلة التسوق",
            emptyText: "سلتك فارغة",
            showCoupon: true,
            showShipping: true,
            checkoutText: "إتمام الشراء",
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "full-width": {
        name: "عرض كامل",
        defaults: { content: { layout: "full" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      minimal: {
        name: "بسيط",
        defaults: { content: { minimal: true }, style: { paddingTop: "40px", paddingBottom: "40px" } },
      },
      "with-recommendations": {
        name: "مع توصيات",
        defaults: { content: { showRecommendations: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      drawer: {
        name: "درج",
        defaults: { content: { layout: "drawer" }, style: {} },
      },
    },
  },

  // ============ CHECKOUT ============
  checkout: {
    type: "checkout",
    label: "إتمام الشراء",
    icon: "💳",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.CHECKOUT],
    defaultVariant: "two-column",
    variants: {
      "two-column": {
        name: "عمودان",
        defaults: {
          content: {
            title: "إتمام الشراء",
            showShippingForm: true,
            showPaymentMethods: true,
            showOrderSummary: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "single-column": {
        name: "عمود واحد",
        defaults: { content: { layout: "single" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "steps": {
        name: "خطوات",
        defaults: { content: { layout: "steps", steps: ["الشحن", "الدفع", "التأكيد"] }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "with-progress": {
        name: "مع شريط تقدم",
        defaults: { content: { showProgress: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      "express": {
        name: "سريع",
        defaults: { content: { express: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
    },
  },

  // ============ MY ORDERS ============
  myOrders: {
    type: "myOrders",
    label: "طلباتي",
    icon: "📦",
    category: SECTION_CATEGORIES.COMMERCE,
    allowedPages: [PAGE_TYPES.MY_ORDERS],
    defaultVariant: "list",
    variants: {
      list: {
        name: "قائمة",
        defaults: {
          content: {
            title: "طلباتي",
            emptyText: "لا توجد طلبات بعد",
            showReorder: true,
            showTrack: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      cards: {
        name: "بطاقات",
        defaults: { content: { layout: "cards" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      timeline: {
        name: "خط زمني",
        defaults: { content: { layout: "timeline" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      table: {
        name: "جدول",
        defaults: { content: { layout: "table" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      minimal: {
        name: "بسيط",
        defaults: { content: { minimal: true }, style: { paddingTop: "40px", paddingBottom: "40px" } },
      },
    },
  },

  // ============ FOOTER ============
  footer: {
    type: "footer",
    label: "التذييل",
    icon: "⬛",
    category: SECTION_CATEGORIES.FOOTER,
    allowedPages: "all",
    defaultVariant: "four-columns",
    variants: {
      "four-columns": {
        name: "4 أعمدة",
        defaults: {
          content: {
            description: "متجرك الموثوق لأفضل المنتجات",
            logo: null,
            columns: [
              { title: "روابط سريعة", links: [{ label: "الرئيسية", href: "/" }, { label: "المنتجات", href: "/products" }] },
              { title: "الخدمات", links: [{ label: "توصيل", href: "#" }, { label: "إرجاع", href: "#" }] },
              { title: "تواصل", links: [{ label: "اتصل بنا", href: "/contact" }] },
            ],
            phone: "+20 100 000 0000",
            email: "info@store.com",
            social: { facebook: "", twitter: "", instagram: "", whatsapp: "" },
            copyright: "© 2026 جميع الحقوق محفوظة",
          },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "60px", paddingBottom: "30px" },
        },
      },
      minimal: {
        name: "بسيط",
        defaults: {
          content: {
            copyright: "© 2026 متجري",
            links: [{ label: "الرئيسية", href: "/" }, { label: "اتصل", href: "/contact" }],
          },
          style: { backgroundColor: "#ffffff", color: "#0A2947", paddingTop: "30px", paddingBottom: "30px" },
        },
      },
      "with-newsletter": {
        name: "مع نشرة",
        defaults: {
          content: { description: "...", showNewsletter: true },
          style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "60px", paddingBottom: "40px" },
        },
      },
      "dark-modern": {
        name: "داكن عصري",
        defaults: {
          content: { logo: null, columns: [] },
          style: { backgroundColor: "#0d0d0d", color: "#f5f5f5", paddingTop: "80px", paddingBottom: "40px" },
        },
      },
      "with-payments": {
        name: "مع طرق دفع",
        defaults: {
          content: { showPayments: true, paymentMethods: ["visa", "mastercard", "paypal", "cod"] },
          style: { backgroundColor: "#F3E4C9", color: "#0A2947", paddingTop: "60px", paddingBottom: "30px" },
        },
      },
    },
  },

  // ============ CONTACT ============
  contact: {
    type: "contact",
    label: "تواصل معنا",
    icon: "📞",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.CONTACT],
    defaultVariant: "with-form",
    variants: {
      "with-form": {
        name: "مع نموذج",
        defaults: {
          content: {
            title: "تواصل معنا",
            subtitle: "نحن هنا لمساعدتك",
            showForm: true,
            showInfo: true,
            showMap: true,
          },
          style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      "info-only": {
        name: "معلومات فقط",
        defaults: { content: { showForm: false, showInfo: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      split: {
        name: "مقسوم",
        defaults: { content: { layout: "split" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      map: {
        name: "مع خريطة",
        defaults: { content: { showMap: true, mapPosition: "top" }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      minimal: {
        name: "بسيط",
        defaults: { content: { minimal: true }, style: { paddingTop: "40px", paddingBottom: "40px" } },
      },
    },
  },

  // ============ STATS ============
  stats: {
    type: "stats",
    label: "إحصائيات",
    icon: "📊",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.HOME, PAGE_TYPES.ABOUT],
    defaultVariant: "four-columns",
    variants: {
      "four-columns": {
        name: "4 أعمدة",
        defaults: {
          content: {
            items: [
              { id: "st1", value: "10K+", label: "عميل سعيد" },
              { id: "st2", value: "5K+", label: "منتج" },
              { id: "st3", value: "98%", label: "رضا" },
              { id: "st4", value: "24/7", label: "دعم" },
            ],
          },
          style: { backgroundColor: "#F3E4C9", paddingTop: "60px", paddingBottom: "60px" },
        },
      },
      centered: {
        name: "متمركز",
        defaults: { content: { items: [] }, style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "80px", paddingBottom: "80px", textAlign: "center" } },
      },
      "with-icons": {
        name: "مع أيقونات",
        defaults: { content: { items: [], showIcons: true }, style: { paddingTop: "60px", paddingBottom: "60px" } },
      },
      gradient: {
        name: "تدرج",
        defaults: { content: { items: [] }, style: { backgroundColor: "#8B5E3C", color: "#ffffff", paddingTop: "60px", paddingBottom: "60px" } },
      },
      minimal: {
        name: "بسيط",
        defaults: { content: { items: [], minimal: true }, style: { paddingTop: "40px", paddingBottom: "40px" } },
      },
    },
  },

  // ============ BRANDS ============
  brands: {
    type: "brands",
    label: "العلامات التجارية",
    icon: "🏷️",
    category: SECTION_CATEGORIES.SOCIAL,
    allowedPages: "all",
    defaultVariant: "grid",
    variants: {
      grid: { name: "شبكة", defaults: { content: { title: "شركاؤنا", items: [] }, style: { backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" } } },
      carousel: { name: "سلايدر", defaults: { content: { layout: "carousel" }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      grayscale: { name: "رمادي", defaults: { content: { grayscale: true }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      "with-title": { name: "مع عنوان", defaults: { content: { title: "علاماتنا" }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
      minimal: { name: "بسيط", defaults: { content: { items: [] }, style: { paddingTop: "40px", paddingBottom: "40px" } } },
    },
  },

  // ============ TEAM ============
  team: {
    type: "team",
    label: "الفريق",
    icon: "👥",
    category: SECTION_CATEGORIES.CONTENT,
    allowedPages: [PAGE_TYPES.ABOUT],
    defaultVariant: "grid",
    variants: {
      grid: { name: "شبكة", defaults: { content: { title: "فريقنا", columns: 4, items: [] }, style: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" } } },
      circles: { name: "دوائر", defaults: { content: { layout: "circles" }, style: { paddingTop: "80px", paddingBottom: "80px" } } },
      cards: { name: "بطاقات", defaults: { content: { layout: "cards" }, style: { backgroundColor: "#F3E4C9", paddingTop: "80px", paddingBottom: "80px" } } },
      list: { name: "قائمة", defaults: { content: { layout: "list" }, style: { paddingTop: "80px", paddingBottom: "80px" } } },
      minimal: { name: "بسيط", defaults: { content: { minimal: true }, style: { paddingTop: "60px", paddingBottom: "60px" } } },
    },
  },
};

// ============================================================
// HELPERS
// ============================================================
export const getSectionMeta = (type) => SECTION_REGISTRY[type] || null;

export const getSectionVariants = (type) => {
  const meta = SECTION_REGISTRY[type];
  if (!meta) return [];
  return Object.entries(meta.variants).map(([key, v]) => ({
    key,
    ...v,
  }));
};

export const getSectionsByCategory = () => {
  const grouped = {};
  Object.values(SECTION_REGISTRY).forEach((section) => {
    if (!grouped[section.category]) grouped[section.category] = [];
    grouped[section.category].push(section);
  });
  return grouped;
};

export const getSectionsForPage = (pageType) => {
  return Object.values(SECTION_REGISTRY).filter((section) => {
    if (section.allowedPages === "all") return true;
    if (Array.isArray(section.allowedPages)) return section.allowedPages.includes(pageType);
    return false;
  });
};

export const CATEGORY_LABELS = {
  navigation: "التنقل",
  hero: "القسم الرئيسي",
  content: "المحتوى",
  commerce: "التجارة",
  marketing: "التسويق",
  social: "التفاعل الاجتماعي",
  footer: "التذييل",
};

// ============================================================
// FIELD SCHEMAS — تحديد نوع كل حقل لعرض كنترول مناسب
// ============================================================
export const FIELD_SCHEMAS = {
  // ⭐ Feature Strip
featureStrip: {
  columnsMobile: {
    type: "select", label: "أعمدة الموبايل",
    options: [{ value: 1, label: "1" }, { value: 2, label: "2" }],
  },
  columnsTablet: {
    type: "select", label: "أعمدة التابلت",
    options: [{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 4, label: "4" }],
  },
  columnsDesktop: {
    type: "select", label: "أعمدة الديسكتوب",
    options: [{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 4, label: "4" }],
  },
  iconSize: {
    type: "select", label: "حجم الأيقونة",
    options: [
      { value: "sm", label: "صغير" },
      { value: "md", label: "متوسط" },
      { value: "lg", label: "كبير" },
    ],
  },
  fullWidth: { type: "toggle", label: "عرض كامل" },
},

// ⭐ Category Tabs
categoryTabs: {
  columnsMobile: {
    type: "select", label: "أعمدة الموبايل",
    options: [{ value: 1, label: "1" }, { value: 2, label: "2" }, { value: 3, label: "3" }],
  },
  columnsTablet: {
    type: "select", label: "أعمدة التابلت",
    options: [{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 4, label: "4" }],
  },
  columnsDesktop: {
    type: "select", label: "أعمدة الديسكتوب",
    options: [{ value: 3, label: "3" }, { value: 4, label: "4" }, { value: 5, label: "5" }, { value: 6, label: "6" }],
  },
  showDescription: { type: "toggle", label: "إظهار الوصف" },
  cardStyle: { type: "toggle", label: "بطاقات" },
},

// ⭐ Marquee
marquee: {
  speed: {
    type: "select", label: "سرعة الحركة",
    options: [
      { value: "slow", label: "بطيئة" },
      { value: "normal", label: "عادية" },
      { value: "fast", label: "سريعة" },
    ],
  },
  ticker: { type: "toggle", label: "نمط شريط الأخبار" },
},

// ⭐ Contact Form
contactForm: {
  title: { type: "text", label: "العنوان" },
  subtitle: { type: "textarea", label: "الوصف" },
  buttonText: { type: "text", label: "نص الزر" },
  phone: { type: "text", label: "رقم الهاتف" },
  email: { type: "text", label: "البريد الإلكتروني" },
  address: { type: "text", label: "العنوان" },
  showInfo: { type: "toggle", label: "إظهار المعلومات" },
  showMap: { type: "toggle", label: "إظهار الخريطة" },
  centered: { type: "toggle", label: "متمركز" },
},
  // ============ HERO ============
  hero: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "العنوان الفرعي" },
    badge: { type: "text", label: "الشارة" },
    buttonText: { type: "text", label: "نص الزر الأساسي" },
    buttonLink: { type: "text", label: "رابط الزر" },
    secondaryButtonText: { type: "text", label: "نص الزر الثانوي" },
    secondaryButtonLink: { type: "text", label: "رابط الزر الثانوي" },
    backgroundImage: { type: "image", label: "صورة الخلفية" },
    image: { type: "image", label: "الصورة" },
    overlayEnabled: { type: "toggle", label: "تفعيل الطبقة الداكنة" },
    overlayOpacity: { type: "slider", label: "شفافية الطبقة", min: 0, max: 1, step: 0.05 },
    fullHeight: { type: "toggle", label: "ملء الشاشة" },
    contentAlign: {
      type: "select", label: "محاذاة المحتوى",
      options: [
        { value: "start", label: "يسار" },
        { value: "center", label: "وسط" },
        { value: "end", label: "يمين" },
      ],
    },
    imagePosition: {
      type: "select", label: "موضع الصورة",
      options: [
        { value: "left", label: "يسار" },
        { value: "right", label: "يمين" },
      ],
    },
  },

  // ============ NAVBAR ============
  navbar: {
    title: { type: "text", label: "اسم المتجر" },
    logo: { type: "image", label: "الشعار" },
    backgroundColor: { type: "color", label: "خلفية الشريط" },
    textColor: { type: "color", label: "لون النص" },
    sticky: { type: "toggle", label: "ملتصق بالأعلى" },
    showSearch: { type: "toggle", label: "إظهار البحث" },
    showUser: { type: "toggle", label: "إظهار المستخدم" },
    showCart: { type: "toggle", label: "إظهار السلة" },
    showWishlist: { type: "toggle", label: "إظهار المفضلة" },
    searchInline: { type: "toggle", label: "بحث مدمج" },
    cartCount: { type: "number", label: "عدد السلة", min: 0 },
    wishlistCount: { type: "number", label: "عدد المفضلة", min: 0 },
  },

  // ============ ANNOUNCEMENT BAR ============
  announcementBar: {
    text: { type: "text", label: "النص" },
    ctaText: { type: "text", label: "نص الزر" },
    ctaLink: { type: "text", label: "رابط الزر" },
    animated: { type: "toggle", label: "متحرك" },
    countdown: { type: "toggle", label: "عداد تنازلي" },
    hours: { type: "number", label: "عدد الساعات", min: 1, max: 168 },
  },

  // ============ CATEGORIES ============
  categories: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "text", label: "العنوان الفرعي" },
    source: {
      type: "select", label: "المصدر",
      options: [
        { value: "categories", label: "من الأقسام الحقيقية" },
        { value: "manual", label: "يدوي" },
      ],
    },
    columns: {
      type: "select", label: "عدد الأعمدة",
      options: [
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 6, label: "6" },
      ],
    },
    limit: { type: "number", label: "أقصى عدد", min: 1, max: 24 },
  },

  // ============ PRODUCTS ============
  products: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "text", label: "العنوان الفرعي" },
    source: {
      type: "select", label: "مصدر المنتجات",
      options: [
        { value: "latest", label: "الأحدث" },
        { value: "featured", label: "المميزة" },
        { value: "best-sellers", label: "الأكثر مبيعاً" },
        { value: "sale", label: "العروض" },
        { value: "category", label: "قسم محدد" },
      ],
    },
    cardVariant: {
      type: "select", label: "نمط البطاقة",
      options: [
        { value: "elevated", label: "مرتفعة (افتراضي)" },
        { value: "minimal", label: "بسيطة" },
        { value: "image-heavy", label: "صورة كبيرة" },
        { value: "luxury", label: "فخمة" },
        { value: "hover-modern", label: "عصرية" },
      ],
    },
    columns: {
      type: "select", label: "عدد الأعمدة (ديسكتوب)",
      options: [
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
      ],
    },
    limit: { type: "number", label: "أقصى عدد منتجات", min: 1, max: 24 },
    showRating: { type: "toggle", label: "إظهار التقييم" },
    showBadge: { type: "toggle", label: "إظهار الشارة" },
    showQuickAdd: { type: "toggle", label: "زر إضافة سريعة" },
    showWishlist: { type: "toggle", label: "زر المفضلة" },
  },

  // ============================================================
// NEW SECTIONS - القوالب الجديدة
// ============================================================

// ⭐ Feature Strip — شريط المميزات
featureStrip: {
  type: "featureStrip",
  label: "شريط المميزات",
  icon: "⚡",
  category: "content",
  allowedPages: "all",
  defaultVariant: "boxed",
  variants: {
    boxed: {
      name: "بطاقات مع إطار",
      defaults: {
        content: {
          columnsMobile: 1,
          columnsTablet: 2,
          columnsDesktop: 4,
          items: [
            { id: "f1", icon: "truck", title: "شحن سريع", description: "توصيل خلال 2-3 أيام" },
            { id: "f2", icon: "shield", title: "ضمان الأصالة", description: "منتجات أصلية 100%" },
          ],
        },
        style: { backgroundColor: "#ffffff", paddingTop: "32px", paddingBottom: "32px" },
      },
    },
    minimal: {
      name: "بسيط",
      defaults: {
        content: {
          columnsMobile: 2,
          columnsTablet: 2,
          columnsDesktop: 4,
          items: [],
          iconSize: "sm",
        },
        style: { backgroundColor: "#F9FAFB", paddingTop: "24px", paddingBottom: "24px" },
      },
    },
    "with-icons": {
      name: "مع أيقونات كبيرة",
      defaults: {
        content: {
          columnsMobile: 1,
          columnsTablet: 2,
          columnsDesktop: 4,
          items: [],
          iconSize: "lg",
        },
        style: { paddingTop: "48px", paddingBottom: "48px" },
      },
    },
    "icon-list": {
      name: "قائمة أيقونات",
      defaults: {
        content: {
          columnsMobile: 1,
          columnsTablet: 2,
          columnsDesktop: 2,
          items: [],
        },
        style: { paddingTop: "40px", paddingBottom: "40px" },
      },
    },
    "full-width": {
      name: "عرض كامل",
      defaults: {
        content: {
          columnsMobile: 1,
          columnsTablet: 2,
          columnsDesktop: 4,
          items: [],
          fullWidth: true,
        },
        style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "32px", paddingBottom: "32px" },
      },
    },
  },
},

// ⭐ Category Tabs — تبويبات الأقسام
categoryTabs: {
  type: "categoryTabs",
  label: "تبويبات الأقسام",
  icon: "🗂️",
  category: "commerce",
  allowedPages: "all",
  defaultVariant: "default",
  variants: {
    default: {
      name: "افتراضي",
      defaults: {
        content: {
          columnsMobile: 2,
          columnsTablet: 3,
          columnsDesktop: 5,
          items: [
            { id: "k1", icon: "layers", title: "الفئة 1", description: "وصف الفئة" },
            { id: "k2", icon: "layers", title: "الفئة 2", description: "وصف الفئة" },
          ],
        },
        style: { paddingTop: "48px", paddingBottom: "48px" },
      },
    },
    "yellow-strip": {
      name: "شريط ملون",
      defaults: {
        content: {
          columnsMobile: 2,
          columnsTablet: 3,
          columnsDesktop: 5,
          items: [
            { id: "k1", icon: "user", title: "لها", description: "أنثوي وناعم" },
            { id: "k2", icon: "users", title: "له", description: "رجولي وقوي" },
            { id: "k3", icon: "layers", title: "للجنسين", description: "متعدد الاستخدام" },
          ],
        },
        style: { backgroundColor: "#FFE600", color: "#0B0B0B", paddingTop: "32px", paddingBottom: "32px" },
      },
    },
    cards: {
      name: "بطاقات",
      defaults: {
        content: {
          columnsMobile: 1,
          columnsTablet: 2,
          columnsDesktop: 3,
          items: [],
          cardStyle: true,
        },
        style: { paddingTop: "48px", paddingBottom: "48px" },
      },
    },
    "icon-only": {
      name: "أيقونات فقط",
      defaults: {
        content: {
          columnsMobile: 3,
          columnsTablet: 4,
          columnsDesktop: 6,
          items: [],
          showDescription: false,
        },
        style: { paddingTop: "32px", paddingBottom: "32px" },
      },
    },
    pills: {
      name: "كبسولات",
      defaults: {
        content: {
          columnsMobile: 2,
          columnsTablet: 4,
          columnsDesktop: 6,
          items: [],
        },
        style: { paddingTop: "24px", paddingBottom: "24px" },
      },
    },
  },
},

// ⭐ Marquee — شريط متحرك
marquee: {
  type: "marquee",
  label: "شريط متحرك",
  icon: "🎞️",
  category: "marketing",
  allowedPages: "all",
  defaultVariant: "text",
  variants: {
    text: {
      name: "نص متحرك",
      defaults: {
        content: {
          speed: "normal",
          items: [
            { id: "m1", text: "نص متحرك" },
            { id: "m2", text: "نص متحرك 2" },
          ],
        },
        style: { backgroundColor: "#0A2947", color: "#ffffff", paddingTop: "16px", paddingBottom: "16px" },
      },
    },
    "image-text": {
      name: "صورة + نص",
      defaults: {
        content: {
          speed: "slow",
          items: [
            { id: "m1", text: "ملابس رجالي", image: null },
            { id: "m2", text: "ملابس حريمي", image: null },
          ],
        },
        style: { paddingTop: "24px", paddingBottom: "24px" },
      },
    },
    logos: {
      name: "شعارات",
      defaults: {
        content: {
          speed: "normal",
          items: [
            { id: "m1", image: null, alt: "شعار 1" },
            { id: "m2", image: null, alt: "شعار 2" },
          ],
        },
        style: { backgroundColor: "#F9FAFB", paddingTop: "24px", paddingBottom: "24px" },
      },
    },
    ticker: {
      name: "شريط أخبار",
      defaults: {
        content: {
          speed: "fast",
          items: [],
          ticker: true,
        },
        style: { backgroundColor: "#DC2626", color: "#ffffff", paddingTop: "12px", paddingBottom: "12px" },
      },
    },
    minimal: {
      name: "بسيط",
      defaults: {
        content: { speed: "normal", items: [] },
        style: { paddingTop: "16px", paddingBottom: "16px" },
      },
    },
  },
},

// ⭐ Contact Form — نموذج تواصل
contactForm: {
  type: "contactForm",
  label: "نموذج تواصل",
  icon: "✉️",
  category: "content",
  allowedPages: [PAGE_TYPES.CONTACT, PAGE_TYPES.CUSTOM, PAGE_TYPES.HOME],
  defaultVariant: "two-columns",
  variants: {
    "two-columns": {
      name: "عمودان",
      defaults: {
        content: {
          title: "تواصل معنا",
          subtitle: "سنرد عليك في أقرب وقت",
          fields: ["name", "email", "phone", "message"],
          buttonText: "إرسال",
          showInfo: true,
          phone: "+20 100 000 0000",
          email: "info@store.com",
          address: "القاهرة، مصر",
        },
        style: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
    centered: {
      name: "متمركز",
      defaults: {
        content: {
          title: "تواصل معنا",
          fields: ["name", "email", "message"],
          buttonText: "إرسال",
          centered: true,
        },
        style: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
    minimal: {
      name: "بسيط",
      defaults: {
        content: {
          title: "تواصل معنا",
          fields: ["email", "message"],
          buttonText: "إرسال",
        },
        style: { paddingTop: "48px", paddingBottom: "48px" },
      },
    },
    "with-map": {
      name: "مع خريطة",
      defaults: {
        content: {
          title: "تواصل معنا",
          fields: ["name", "email", "message"],
          buttonText: "إرسال",
          showMap: true,
        },
        style: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
    "with-info": {
      name: "مع معلومات",
      defaults: {
        content: {
          title: "تواصل معنا",
          fields: ["name", "email", "message"],
          buttonText: "إرسال",
          showInfo: true,
          phone: "+20 100 000 0000",
          email: "info@store.com",
        },
        style: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
  },
},

  // ============ CTA ============
  cta: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "text", label: "العنوان الفرعي" },
    buttonText: { type: "text", label: "نص الزر" },
    buttonLink: { type: "text", label: "رابط الزر" },
    placeholder: { type: "text", label: "نص الحقل" },
  },

  // ============ FOOTER ============
  footer: {
    title: { type: "text", label: "عنوان المتجر" },
    description: { type: "textarea", label: "الوصف" },
    copyright: { type: "text", label: "حقوق النشر" },
    phone: { type: "text", label: "رقم الهاتف" },
    email: { type: "text", label: "البريد الإلكتروني" },
    address: { type: "text", label: "العنوان" },
    logo: { type: "image", label: "الشعار" },
    showNewsletter: { type: "toggle", label: "إظهار النشرة" },
    showPayments: { type: "toggle", label: "إظهار طرق الدفع" },
  },

  // ============ SERVICES ============
  services: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "الوصف" },
  },

  // ============ TESTIMONIALS ============
  testimonials: {
    title: { type: "text", label: "العنوان" },
    columns: {
      type: "select", label: "عدد الأعمدة",
      options: [
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
      ],
    },
  },

  // ============ FAQ ============
  faq: {
    title: { type: "text", label: "العنوان" },
  },

  // ============ NEWSLETTER ============
  newsletter: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "الوصف" },
    placeholder: { type: "text", label: "نص الحقل" },
    buttonText: { type: "text", label: "نص الزر" },
  },

  // ============ PROMO BANNER ============
  promotionalBanner: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "الوصف" },
    buttonText: { type: "text", label: "نص الزر" },
    buttonLink: { type: "text", label: "رابط الزر" },
    backgroundImage: { type: "image", label: "صورة الخلفية" },
    overlayOpacity: { type: "slider", label: "شفافية الطبقة", min: 0, max: 1, step: 0.05 },
  },

  // ============ PRODUCT DETAILS ============
  productDetails: {
    galleryPosition: {
      type: "select", label: "موضع الصور",
      options: [
        { value: "left", label: "يسار" },
        { value: "right", label: "يمين" },
        { value: "top", label: "أعلى" },
      ],
    },
    showThumbnails: { type: "toggle", label: "إظهار المصغرات" },
    showRating: { type: "toggle", label: "إظهار التقييم" },
    showVariants: { type: "toggle", label: "إظهار الخيارات" },
    showQuantity: { type: "toggle", label: "إظهار الكمية" },
    showAddToCart: { type: "toggle", label: "زر إضافة للسلة" },
    showBuyNow: { type: "toggle", label: "زر اشتر الآن" },
    showFeatures: { type: "toggle", label: "إظهار المميزات" },
  },

  // ============ CART ============
  cart: {
    title: { type: "text", label: "العنوان" },
    emptyText: { type: "text", label: "نص السلة الفارغة" },
    checkoutText: { type: "text", label: "نص زر الشراء" },
    showCoupon: { type: "toggle", label: "إظهار كود الخصم" },
    showShipping: { type: "toggle", label: "إظهار الشحن" },
  },

  // ============ CHECKOUT ============
  checkout: {
    title: { type: "text", label: "العنوان" },
    showProgress: { type: "toggle", label: "شريط التقدم" },
    showShippingForm: { type: "toggle", label: "نموذج الشحن" },
    showPaymentMethods: { type: "toggle", label: "طرق الدفع" },
    showOrderSummary: { type: "toggle", label: "ملخص الطلب" },
  },

  // ============ MY ORDERS ============
  myOrders: {
    title: { type: "text", label: "العنوان" },
    emptyText: { type: "text", label: "نص لا توجد طلبات" },
    showReorder: { type: "toggle", label: "زر إعادة الطلب" },
    showTrack: { type: "toggle", label: "زر التتبع" },
  },

  // ============ SEARCH ============
  search: {
    placeholder: { type: "text", label: "نص الحقل" },
    buttonText: { type: "text", label: "نص الزر" },
    showCategories: { type: "toggle", label: "إظهار الأقسام" },
    showFilters: { type: "toggle", label: "إظهار الفلاتر" },
    showVoice: { type: "toggle", label: "البحث الصوتي" },
  },

  // ============ CONTACT ============
  contact: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "الوصف" },
    phone: { type: "text", label: "الهاتف" },
    email: { type: "text", label: "البريد" },
    address: { type: "text", label: "العنوان" },
    showForm: { type: "toggle", label: "إظهار النموذج" },
    showInfo: { type: "toggle", label: "إظهار المعلومات" },
    showMap: { type: "toggle", label: "إظهار الخريطة" },
  },

  // ============ ABOUT ============
  aboutHero: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "الوصف" },
    image: { type: "image", label: "الصورة" },
    backgroundImage: { type: "image", label: "صورة الخلفية" },
    overlayOpacity: { type: "slider", label: "شفافية الطبقة", min: 0, max: 1, step: 0.05 },
  },

  story: {
    title: { type: "text", label: "العنوان" },
    image: { type: "image", label: "الصورة" },
    imagePosition: {
      type: "select", label: "موضع الصورة",
      options: [
        { value: "left", label: "يسار" },
        { value: "right", label: "يمين" },
      ],
    },
  },

  team: {
    title: { type: "text", label: "العنوان" },
    columns: {
      type: "select", label: "عدد الأعمدة",
      options: [
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
      ],
    },
  },

  stats: {
    title: { type: "text", label: "العنوان" },
  },

  brands: {
    title: { type: "text", label: "العنوان" },
  },

  servicesHero: {
    title: { type: "text", label: "العنوان" },
    subtitle: { type: "textarea", label: "الوصف" },
  },
};

// ============================================================
// صفحة → الحقول المطلوبة
// ============================================================
export const PAGE_DEFINITIONS = [
  {
    type: PAGE_TYPES.HOME,
    label: "الرئيسية",
    icon: "🏠",
    slug: "",
    defaultSections: ["navbar", "announcementBar", "hero", "categories", "products", "testimonials", "cta", "footer"],
  },
  {
    type: PAGE_TYPES.ABOUT,
    label: "من نحن",
    icon: "📖",
    slug: "about",
    defaultSections: ["navbar", "aboutHero", "story", "stats", "team", "cta", "footer"],
  },
  {
    type: PAGE_TYPES.SERVICES,
    label: "الخدمات",
    icon: "⚙️",
    slug: "services",
    defaultSections: ["navbar", "servicesHero", "servicesGrid", "testimonials", "faq", "cta", "footer"],
  },
  {
    type: PAGE_TYPES.PRODUCTS,
    label: "المنتجات",
    icon: "🛍️",
    slug: "products",
    defaultSections: ["navbar", "search", "filters", "products", "footer"],
  },
  {
    type: PAGE_TYPES.PRODUCT_DETAILS,
    label: "تفاصيل منتج",
    icon: "📄",
    slug: "product",
    defaultSections: ["navbar", "productDetails", "reviews", "relatedProducts", "footer"],
  },
  {
    type: PAGE_TYPES.CART,
    label: "سلة التسوق",
    icon: "🛒",
    slug: "cart",
    defaultSections: ["navbar", "cart", "footer"],
  },
  {
    type: PAGE_TYPES.CHECKOUT,
    label: "إتمام الشراء",
    icon: "💳",
    slug: "checkout",
    defaultSections: ["navbar", "checkout", "footer"],
  },
  {
    type: PAGE_TYPES.MY_ORDERS,
    label: "طلباتي",
    icon: "📦",
    slug: "orders",
    defaultSections: ["navbar", "myOrders", "footer"],
  },
  {
    type: PAGE_TYPES.CONTACT,
    label: "تواصل معنا",
    icon: "📞",
    slug: "contact",
    defaultSections: ["navbar", "contact", "footer"],
  },
  {
    type: PAGE_TYPES.CUSTOM,
    label: "صفحة مخصصة",
    icon: "➕",
    slug: "",
    defaultSections: ["navbar", "footer"],
  },
];

// ============================================================
// Helper للحقول
// ============================================================
export const getFieldSchema = (sectionType) => FIELD_SCHEMAS[sectionType] || {};

export const getPageDefinition = (pageType) =>
  PAGE_DEFINITIONS.find((p) => p.type === pageType) || PAGE_DEFINITIONS[0];


// ============================================================
// LINK SOURCES — روابط جاهزة للاختيار
// ============================================================
export const INTERNAL_PAGES = [
  { value: "/", label: "الرئيسية" },
  { value: "/products", label: "المنتجات" },
  { value: "/about", label: "من نحن" },
  { value: "/services", label: "الخدمات" },
  { value: "/contact", label: "تواصل معنا" },
  { value: "/cart", label: "سلة التسوق" },
  { value: "/checkout", label: "إتمام الشراء" },
  { value: "/orders", label: "طلباتي" },
];

export const EXTERNAL_LINKS = [
  { value: "https://facebook.com", label: "Facebook" },
  { value: "https://instagram.com", label: "Instagram" },
  { value: "https://twitter.com", label: "Twitter" },
  { value: "https://wa.me/", label: "WhatsApp" },
  { value: "https://youtube.com", label: "YouTube" },
  { value: "https://tiktok.com", label: "TikTok" },
];

/**
 * الحقول التي يجب أن تعرض Select للروابط
 */
export const LINK_FIELDS = [
  "buttonLink", "secondaryButtonLink", "ctaLink", "href", "link",
];


