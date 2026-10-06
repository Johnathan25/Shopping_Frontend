<<<<<<< HEAD
// ============================================================
// 🏪 STORE BUILDER - Complete Single-File Implementation
// ============================================================
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Monitor, Tablet, Smartphone, Save, Plus, Trash2, Layout, Palette,
  FileText, ArrowUp, ArrowDown, ShoppingBag, Search, User, ShoppingCart,
  X, Menu, Eye, EyeOff, Copy, ChevronDown, ChevronUp, Image as ImageIcon,
  Star, Heart, Filter, Grid, List, Tag, Settings, Layers, Package,
  AlertCircle, Check, Loader2, Percent, Truck, Shield, Home,
} from "lucide-react";
import api from "../services/api";

// ============================================================
// 🎨 SECTION 1: CONSTANTS & TEMPLATES
// ============================================================
const ARABIC_FONTS = [
  { label: "Cairo (عصري)", value: "'Cairo', Arial, sans-serif" },
  { label: "Tajawal (نظيف)", value: "'Tajawal', Arial, sans-serif" },
  { label: "Almarai (ودود)", value: "'Almarai', sans-serif" },
  { label: "El Messiri (أنيق)", value: "'El Messiri', sans-serif" },
  { label: "Amiri (فخم)", value: "'Amiri', 'Times New Roman', serif" },
  { label: "Reem Kufi", value: "'Reem Kufi', sans-serif" },
  { label: "Changa", value: "'Changa', sans-serif" },
  { label: "Alexandria", value: "'Alexandria', sans-serif" },
  { label: "IBM Plex Arabic", value: "'IBM Plex Sans Arabic', system-ui" },
  { label: "System Default", value: "system-ui, sans-serif" },
];

const TEMPLATES = {
  modern: {
    name: "Modern",
    theme: {
      primaryColor: "#0A2947", secondaryColor: "#8B5E3C", accentColor: "#8B5E3C",
      backgroundColor: "#F3E4C9", surfaceColor: "#ffffff",
      textPrimaryColor: "#0A2947", textSecondaryColor: "#8B5E3C",
      fontFamily: "'Cairo', Arial, sans-serif", radius: "12px", shadow: "soft",
    },
    sections: ["navbar", "hero", "categories", "products", "footer"],
  },
  luxury: {
    name: "Luxury",
    theme: {
      primaryColor: "#c5a880", secondaryColor: "#0b0b0b", accentColor: "#c5a880",
      backgroundColor: "#0d0d0d", surfaceColor: "#161616",
      textPrimaryColor: "#f5f5f5", textSecondaryColor: "#a3a3a3",
      fontFamily: "'Amiri', 'Times New Roman', serif", radius: "0px", shadow: "dramatic",
    },
    sections: ["navbar", "hero", "products", "footer"],
  },
  minimal: {
    name: "Minimal",
    theme: {
      primaryColor: "#0A2947", secondaryColor: "#8B5E3C", accentColor: "#8B5E3C",
      backgroundColor: "#ffffff", surfaceColor: "#fafafa",
      textPrimaryColor: "#171717", textSecondaryColor: "#737373",
      fontFamily: "'IBM Plex Sans Arabic', system-ui", radius: "4px", shadow: "flat",
    },
    sections: ["navbar", "products", "footer"],
  },
  bold: {
    name: "Bold",
    theme: {
      primaryColor: "#0A2947", secondaryColor: "#8B5E3C", accentColor: "#8B5E3C",
      backgroundColor: "#F3E4C9", surfaceColor: "#ffffff",
      textPrimaryColor: "#0A2947", textSecondaryColor: "#8B5E3C",
      fontFamily: "'Tajawal', Arial, sans-serif", radius: "20px", shadow: "dramatic",
    },
    sections: ["navbar", "hero", "categories", "products", "footer"],
  },
  soft: {
    name: "Soft",
    theme: {
      primaryColor: "#8B5E3C", secondaryColor: "#0A2947", accentColor: "#8B5E3C",
      backgroundColor: "#F3E4C9", surfaceColor: "#ffffff",
      textPrimaryColor: "#0A2947", textSecondaryColor: "#8B5E3C",
      fontFamily: "'El Messiri', sans-serif", radius: "24px", shadow: "soft",
    },
    sections: ["navbar", "hero", "categories", "products", "footer"],
  },
  classic: {
    name: "Classic",
    theme: {
      primaryColor: "#0A2947", secondaryColor: "#8B5E3C", accentColor: "#8B5E3C",
      backgroundColor: "#F3E4C9", surfaceColor: "#ffffff",
      textPrimaryColor: "#0A2947", textSecondaryColor: "#8B5E3C",
      fontFamily: "'Noto Naskh Arabic', Georgia, serif", radius: "8px", shadow: "soft",
    },
    sections: ["navbar", "hero", "products", "footer"],
  },
};

const SECTION_LIBRARY = [
  { type: "navbar", label: "شريط التنقل", icon: "☰", description: "شريط علوي مع الشعار" },
  { type: "hero", label: "قسم رئيسي", icon: "🌟", description: "قسم ترحيبي بكامل الشاشة" },
  { type: "categories", label: "الأقسام", icon: "🗂️", description: "شبكة الأقسام" },
  { type: "products", label: "شبكة المنتجات", icon: "🛍️", description: "عرض المنتجات" },
  { type: "searchBar", label: "شريط البحث", icon: "🔍", description: "بحث مع فلاتر" },
  { type: "cart", label: "سلة التسوق", icon: "🛒", description: "عرض السلة" },
  { type: "productDetails", label: "تفاصيل منتج", icon: "📄", description: "صفحة منتج" },
  { type: "footer", label: "التذييل", icon: "⬛", description: "تذييل الصفحة" },
];

// ============================================================
// 🛠️ SECTION 2: UTILITY FUNCTIONS
// ============================================================
let _idCounter = 0;
const genId = (prefix = "id") =>
  `${prefix}_${Date.now()}_${++_idCounter}_${Math.random().toString(36).slice(2, 7)}`;

const resolveSectionStyles = (style = {}, responsive = {}, currentDevice = "desktop", theme = {}) => {
  const deviceOverrides = responsive?.[currentDevice] || {};
  const merged = { ...style, ...deviceOverrides };

  const shadowMap = {
    flat: "none",
    soft: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    dramatic: "0 10px 25px rgba(0,0,0,0.15)",
    glow: `0 0 24px ${theme.primaryColor || "#0A2947"}33`,
  };

  return {
    color: merged.color || "inherit",
    backgroundColor: merged.backgroundColor || "transparent",
    backgroundImage: merged.backgroundImage ? `url(${merged.backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: merged.opacity !== undefined ? merged.opacity : 1,
    borderWidth: merged.border?.width || "0px",
    borderStyle: merged.border?.type || "none",
    borderColor: merged.border?.color || "transparent",
    borderRadius: merged.border?.radius || "0px",
    boxShadow: shadowMap[merged.shadow] || shadowMap.soft,
    marginTop: merged.spacing?.margin?.top || "0px",
    marginRight: merged.spacing?.margin?.right || "0px",
    marginBottom: merged.spacing?.margin?.bottom || "0px",
    marginLeft: merged.spacing?.margin?.left || "0px",
    paddingTop: merged.spacing?.padding?.top || "0px",
    paddingRight: merged.spacing?.padding?.right || "0px",
    paddingBottom: merged.spacing?.padding?.bottom || "0px",
    paddingLeft: merged.spacing?.padding?.left || "0px",
    fontSize: merged.text?.fontSize || "inherit",
    fontWeight: merged.text?.fontWeight || "inherit",
    lineHeight: merged.text?.lineHeight || "inherit",
    letterSpacing: merged.text?.letterSpacing || "inherit",
    textAlign: merged.text?.textAlign || "inherit",
    textTransform: merged.text?.textTransform || "none",
  };
};

const getCardShadow = (shadowKey = "soft") => {
  const map = {
    flat: "none",
    soft: "0 2px 8px rgba(10,41,71,0.06)",
    dramatic: "0 12px 32px rgba(10,41,71,0.18)",
  };
  return map[shadowKey] || map.soft;
};

// ============================================================
// 🧱 SECTION 3: FACTORY (DEFAULT SECTION DATA)
// ============================================================
const createDefaultSection = (type, order = 0) => {
  const base = {
    id: genId("sec"),
    type,
    order,
    visible: true,
    layout: {
      display: "block", position: "static", width: "100%", height: "auto",
      flex: { direction: "row", wrap: "nowrap", justifyContent: "flex-start", alignItems: "stretch", gap: "0px" },
      grid: { columns: "1", rows: "auto", gap: "0px", columnGap: "0px", rowGap: "0px" },
      order: 0, alignSelf: "auto",
    },
    style: {
      color: "", background: "", backgroundColor: "", backgroundImage: "",
      opacity: 1, shadow: "soft",
      border: { width: "0px", type: "none", color: "#000000", radius: "0px" },
      spacing: {
        margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
        padding: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
      },
      text: {
        fontSize: "16px", fontWeight: "400", lineHeight: "1.5",
        letterSpacing: "0px", textAlign: "center", textTransform: "none",
      },
    },
    animation: { name: "none", duration: 0.5, delay: 0, iterationCount: "1" },
    elements: [],
    responsive: { desktop: {}, tablet: {}, mobile: {} },
  };

  const contentMap = {
    navbar: {
      title: "متجري", logoUrl: "",
      links: ["الرئيسية", "المنتجات", "العروض", "تواصل معنا"],
      showSearch: true, showUser: true, showCart: true, cartCount: 0, sticky: true,
    },
    hero: {
      badge: "تشكيلة حصرية 2026",
      title: "اكتشف أحدث التشكيلات العصرية",
      subtitle: "تسوق أفضل المنتجات بجودة عالية وتوصيل سريع لباب بيتك",
      buttonText: "تسوق الآن", buttonLink: "/products",
      secondaryButtonText: "اكتشف المزيد",
      backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
      overlayOpacity: 0.55, layout: "center", fullHeight: true,
    },
    categories: {
      title: "تسوق حسب القسم",
      subtitle: "اختر من مجموعاتنا المنسقة بعناية",
      items: [
        { id: genId("cat"), name: "إلكترونيات", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600", count: 120 },
        { id: genId("cat"), name: "أزياء", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600", count: 240 },
        { id: genId("cat"), name: "منزل", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600", count: 85 },
        { id: genId("cat"), name: "جمال", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600", count: 60 },
      ],
    },
    products: {
      title: "المنتجات المميزة", subtitle: "تصفح أحدث ما وصلنا هذا الأسبوع",
      columns: 4, layout: "grid", cardStyle: "elevated",
      showQuickAdd: true, showRating: true, showBadge: true,
      items: [
        { id: genId("prod"), name: "ساعة يد كلاسيكية", price: "450", oldPrice: "600", currency: "ج.م", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", badge: "خصم 25%", rating: 4.5, category: "إلكترونيات", description: "ساعة أنيقة بحركة دقيقة", inStock: true },
        { id: genId("prod"), name: "حذاء رياضي أنيق", price: "620", oldPrice: "", currency: "ج.م", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", badge: "جديد", rating: 4.8, category: "أزياء", description: "مريح للاستخدام اليومي", inStock: true },
        { id: genId("prod"), name: "نظارة شمسية بريميوم", price: "280", oldPrice: "350", currency: "ج.م", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", badge: "", rating: 4.2, category: "أزياء", description: "حماية UV400", inStock: true },
        { id: genId("prod"), name: "عطر فاخر 100 مل", price: "790", oldPrice: "", currency: "ج.م", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600", badge: "حصري", rating: 4.9, category: "جمال", description: "رائحة تدوم طويلاً", inStock: true },
        { id: genId("prod"), name: "حقيبة جلدية", price: "1250", oldPrice: "1500", currency: "ج.م", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600", badge: "خصم", rating: 4.7, category: "أزياء", description: "جلد طبيعي", inStock: true },
        { id: genId("prod"), name: "سماعات لاسلكية", price: "890", oldPrice: "", currency: "ج.م", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", badge: "الأكثر مبيعاً", rating: 4.6, category: "إلكترونيات", description: "صوت نقي", inStock: true },
      ],
    },
    searchBar: {
      placeholder: "ابحث عن منتج...", buttonText: "بحث",
      showCategories: true, showFilters: true,
      categories: ["الكل", "إلكترونيات", "أزياء", "منزل", "جمال"],
    },
    cart: {
      title: "سلة التسوق", emptyText: "سلتك فارغة حالياً",
      checkoutText: "إتمام الشراء", continueText: "متابعة التسوق",
      currency: "ج.م", showCoupon: true,
      items: [
        { id: genId("cart"), name: "ساعة يد كلاسيكية", price: 450, qty: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200" },
        { id: genId("cart"), name: "نظارة شمسية بريميوم", price: 280, qty: 2, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200" },
      ],
    },
    productDetails: {
      galleryPosition: "left", showThumbnails: true,
      showRelated: true, showReviews: true,
      addToCartText: "أضف للسلة", buyNowText: "اشتري الآن",
    },
    footer: {
      copyright: "جميع الحقوق محفوظة © 2026 متجري",
      description: "متجرك الموثوق لأفضل المنتجات",
      showSocial: true,
      social: { facebook: "#", twitter: "#", instagram: "#", whatsapp: "#" },
      linksTitle: "روابط سريعة", contactTitle: "تواصل معنا",
      contactPhone: "+20 100 000 0000", contactEmail: "info@store.com",
    },
  };

  base.content = contentMap[type] || {};
  return base;
};

const createDefaultPage = (name, slug, order = 0) => ({
  id: genId("page"), name, slug, order, visible: true,
  sections: [
    createDefaultSection("navbar", 0),
    createDefaultSection("hero", 1),
    createDefaultSection("categories", 2),
    createDefaultSection("products", 3),
    createDefaultSection("footer", 4),
  ],
});

// ============================================================
// 🎨 SECTION 4: STORE FRONTEND COMPONENTS
// ============================================================

/* ---------- 4.1 Navbar ---------- */
function NavbarComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = content.links || [];

  return (
    <nav
      className="w-full transition-all duration-300"
      style={{
        ...resolvedStyles,
        backgroundColor: resolvedStyles.backgroundColor || theme.surfaceColor || "#ffffff",
        color: resolvedStyles.color || theme.textPrimaryColor || "#0A2947",
        position: content.sticky ? "sticky" : "relative",
        top: 0, zIndex: 50, backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="lg:hidden p-2 -ms-2 rounded-lg hover:bg-black/5"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {content.logoUrl ? (
            <img src={content.logoUrl} alt="logo" className="h-9 md:h-10 w-auto object-contain" />
          ) : (
            <span className="text-lg md:text-xl font-extrabold tracking-tight">
              {content.title || "متجري"}
            </span>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-1 font-semibold text-sm">
          {links.map((link, i) => (
            <a key={i} href="#" className="px-3 py-2 rounded-lg hover:bg-black/5 transition-colors">
              {typeof link === "string" ? link : link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {content.showSearch !== false && (
            <button className="p-2 rounded-lg hover:bg-black/5"><Search size={18} /></button>
          )}
          {content.showUser !== false && (
            <button className="p-2 rounded-lg hover:bg-black/5"><User size={18} /></button>
          )}
          {content.showCart !== false && (
            <button className="relative p-2 rounded-lg hover:bg-black/5">
              <ShoppingBag size={18} />
              <span
                className="absolute -top-0.5 -right-0.5 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: theme.secondaryColor || "#8B5E3C", color: "#fff" }}
              >
                {content.cartCount || 0}
              </span>
            </button>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          {links.map((link, i) => (
            <a key={i} href="#" className="block px-3 py-2 rounded-lg hover:bg-black/5 font-semibold">
              {typeof link === "string" ? link : link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ---------- 4.2 Hero (Full Screen) ---------- */
function HeroComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const isFull = content.fullHeight !== false;
  const bg = content.backgroundImage || "";

  return (
    <section
      className={`relative w-full flex items-center justify-center overflow-hidden ${isFull ? "min-h-screen" : "py-20"}`}
      style={resolvedStyles}
    >
      {bg && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(10,41,71,${content.overlayOpacity ?? 0.55})` }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {content.badge && (
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wider"
            style={{
              backgroundColor: `${theme.secondaryColor || "#8B5E3C"}25`,
              color: bg ? "#fff" : theme.secondaryColor,
              backdropFilter: "blur(8px)",
            }}
          >
            {content.badge}
          </span>
        )}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-5"
          style={{ color: bg ? "#ffffff" : resolvedStyles.color || theme.textPrimaryColor }}
        >
          {content.title}
        </h1>
        <p
          className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8"
          style={{ color: bg ? "rgba(255,255,255,0.85)" : theme.textSecondaryColor }}
        >
          {content.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="px-8 py-3.5 rounded-xl font-bold text-sm md:text-base shadow-xl transition-all active:scale-95 hover:shadow-2xl"
            style={{
              backgroundColor: theme.secondaryColor || "#8B5E3C",
              color: "#ffffff",
            }}
          >
            {content.buttonText || "تسوق الآن"}
          </button>
          {content.secondaryButtonText && (
            <button
              className="px-8 py-3.5 rounded-xl font-bold text-sm md:text-base border-2 transition-all active:scale-95"
              style={{
                borderColor: bg ? "#fff" : theme.primaryColor,
                color: bg ? "#fff" : theme.primaryColor,
                backgroundColor: "transparent",
              }}
            >
              {content.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4.3 Product Card ---------- */
function ProductCardComponent({ product = {}, theme = {}, cardStyle = "elevated", showQuickAdd, showRating, showBadge }) {
  const [hovered, setHovered] = useState(false);

  const styleVariants = {
    elevated: {
      bg: theme.surfaceColor || "#ffffff",
      border: "none",
      shadow: hovered ? getCardShadow("dramatic") : getCardShadow("soft"),
    },
    flat: {
      bg: theme.surfaceColor || "#ffffff",
      border: "1px solid rgba(0,0,0,0.06)",
      shadow: "none",
    },
    outline: {
      bg: "transparent",
      border: `2px solid ${theme.primaryColor}20`,
      shadow: "none",
    },
    glass: {
      bg: "rgba(255,255,255,0.7)",
      border: "1px solid rgba(255,255,255,0.4)",
      shadow: "0 8px 32px rgba(31,38,135,0.1)",
      backdropFilter: "blur(12px)",
    },
  };
  const s = styleVariants[cardStyle] || styleVariants.elevated;

  return (
    <div
      className="group flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: s.bg,
        border: s.border,
        boxShadow: s.shadow,
        borderRadius: theme.radius || "12px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: `${theme.primaryColor}08` }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageIcon size={40} />
          </div>
        )}
        {showBadge && product.badge && (
          <span
            className="absolute top-3 start-3 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md"
            style={{ backgroundColor: theme.secondaryColor, color: "#fff" }}
          >
            {product.badge}
          </span>
        )}
        {hovered && (
          <button
            className="absolute top-3 end-3 p-2 rounded-full shadow-md bg-white/90 hover:bg-white transition-all"
            style={{ color: theme.secondaryColor }}
          >
            <Heart size={15} />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold truncate mb-1" style={{ color: theme.textPrimaryColor }}>
            {product.name}
          </h3>
          {showRating && product.rating !== undefined && (
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i <= Math.round(product.rating) ? theme.secondaryColor : "transparent"}
                  color={theme.secondaryColor}
                />
              ))}
              <span className="text-[10px] ms-1 opacity-60">({product.rating})</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex flex-col">
            <span className="text-base font-black" style={{ color: theme.primaryColor }}>
              {product.price} {product.currency || "ج.م"}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] line-through opacity-50">
                {product.oldPrice} {product.currency || "ج.م"}
              </span>
            )}
          </div>
          {showQuickAdd && (
            <button
              className="p-2 rounded-lg transition-all active:scale-90 hover:shadow-lg"
              style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
            >
              <ShoppingCart size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 4.4 Categories ---------- */
function CategoriesComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const items = content.items || [];
  return (
    <div className="py-14 px-6 max-w-7xl mx-auto" style={resolvedStyles}>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: theme.textPrimaryColor }}>
          {content.title}
        </h2>
        <p className="text-sm opacity-70" style={{ color: theme.textSecondaryColor }}>
          {content.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((cat) => (
          <div
            key={cat.id}
            className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/5]"
            style={{ boxShadow: getCardShadow(theme.shadow) }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 start-4 end-4 text-white">
              <h3 className="text-lg font-black mb-0.5">{cat.name}</h3>
              <p className="text-xs opacity-80">{cat.count} منتج</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 4.5 Products Grid ---------- */
function ProductsGridComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const [layoutMode, setLayoutMode] = useState(content.layout || "grid");
  const columns = content.columns || 4;
  const items = content.items || [];

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
  }[columns] || "grid-cols-2 md:grid-cols-4";

  return (
    <div className="py-14 px-6 max-w-7xl mx-auto" style={resolvedStyles}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black mb-1" style={{ color: theme.textPrimaryColor }}>
            {content.title}
          </h2>
          <p className="text-sm opacity-70" style={{ color: theme.textSecondaryColor }}>
            {content.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLayoutMode("grid")}
            className="p-2 rounded-lg transition-all"
            style={{
              backgroundColor: layoutMode === "grid" ? theme.primaryColor : "transparent",
              color: layoutMode === "grid" ? "#fff" : theme.textPrimaryColor,
              border: `1px solid ${theme.primaryColor}30`,
            }}
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setLayoutMode("list")}
            className="p-2 rounded-lg transition-all"
            style={{
              backgroundColor: layoutMode === "list" ? theme.primaryColor : "transparent",
              color: layoutMode === "list" ? "#fff" : theme.textPrimaryColor,
              border: `1px solid ${theme.primaryColor}30`,
            }}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {layoutMode === "grid" ? (
        <div className={`grid ${gridCols} gap-4 md:gap-5`}>
          {items.map((p) => (
            <ProductCardComponent
              key={p.id}
              product={p}
              theme={theme}
              cardStyle={content.cardStyle}
              showQuickAdd={content.showQuickAdd}
              showRating={content.showRating}
              showBadge={content.showBadge}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 p-4 rounded-2xl"
              style={{ backgroundColor: theme.surfaceColor, boxShadow: getCardShadow(theme.shadow) }}
            >
              <img src={p.image} alt={p.name} className="w-32 h-32 object-cover rounded-xl" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black mb-1" style={{ color: theme.textPrimaryColor }}>{p.name}</h3>
                  <p className="text-sm opacity-70 mb-2">{p.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black" style={{ color: theme.primaryColor }}>
                    {p.price} {p.currency || "ج.م"}
                  </span>
                  <button
                    className="px-4 py-2 rounded-lg text-xs font-bold"
                    style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- 4.6 Search Bar ---------- */
function SearchBarComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const [activeCat, setActiveCat] = useState("الكل");
  const [query, setQuery] = useState("");

  return (
    <div className="py-10 px-6 max-w-5xl mx-auto" style={resolvedStyles}>
      <div
        className="flex items-center gap-2 p-2 rounded-2xl"
        style={{
          backgroundColor: theme.surfaceColor,
          boxShadow: getCardShadow(theme.shadow),
          border: `1px solid ${theme.primaryColor}15`,
        }}
      >
        <Search size={20} className="ms-3" style={{ color: theme.textSecondaryColor }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={content.placeholder || "ابحث..."}
          className="flex-1 bg-transparent outline-none text-sm py-2"
          style={{ color: theme.textPrimaryColor }}
        />
        <button
          className="px-6 py-2.5 rounded-xl text-sm font-bold"
          style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
        >
          {content.buttonText || "بحث"}
        </button>
      </div>

      {content.showCategories && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {(content.categories || []).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: activeCat === cat ? theme.primaryColor : `${theme.primaryColor}10`,
                color: activeCat === cat ? "#fff" : theme.primaryColor,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {content.showFilters && (
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {[
            { icon: <Filter size={14} />, label: "الفلاتر" },
            { icon: <Tag size={14} />, label: "الأسعار" },
            { icon: <Percent size={14} />, label: "الخصومات" },
            { icon: <Star size={14} />, label: "الأعلى تقييماً" },
          ].map((f) => (
            <button
              key={f.label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border"
              style={{ borderColor: `${theme.primaryColor}20`, color: theme.textPrimaryColor }}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- 4.7 Cart ---------- */
function CartComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const items = content.items || [];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 500 ? 0 : 30;
  const total = subtotal + shipping;

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto" style={resolvedStyles}>
      <h2 className="text-2xl md:text-3xl font-black mb-8" style={{ color: theme.textPrimaryColor }}>
        {content.title}
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-bold opacity-60">{content.emptyText}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-2xl items-center"
                style={{ backgroundColor: theme.surfaceColor, boxShadow: getCardShadow(theme.shadow) }}
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1" style={{ color: theme.textPrimaryColor }}>{item.name}</h3>
                  <span className="text-sm font-black" style={{ color: theme.primaryColor }}>
                    {item.price} {content.currency}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-lg font-bold flex items-center justify-center"
                    style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{item.qty}</span>
                  <button
                    className="w-8 h-8 rounded-lg font-bold flex items-center justify-center"
                    style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="p-6 rounded-2xl h-fit sticky top-4"
            style={{ backgroundColor: theme.surfaceColor, boxShadow: getCardShadow(theme.shadow) }}
          >
            <h3 className="font-black mb-4" style={{ color: theme.textPrimaryColor }}>ملخص الطلب</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span>المجموع الفرعي</span><span>{subtotal} {content.currency}</span></div>
              <div className="flex justify-between"><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ${content.currency}`}</span></div>
            </div>
            {content.showCoupon && (
              <div className="flex gap-2 mb-4">
                <input placeholder="كود الخصم" className="flex-1 px-3 py-2 rounded-lg border text-sm" />
                <button className="px-3 py-2 rounded-lg text-xs font-bold" style={{ backgroundColor: theme.primaryColor, color: "#fff" }}>
                  تطبيق
                </button>
              </div>
            )}
            <div className="border-t pt-3 mb-4 flex justify-between text-base font-black">
              <span>الإجمالي</span>
              <span style={{ color: theme.primaryColor }}>{total} {content.currency}</span>
            </div>
            <button
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
            >
              {content.checkoutText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 4.8 Product Details ---------- */
function ProductDetailsComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  const product = {
    name: "ساعة يد كلاسيكية",
    price: "450",
    oldPrice: "600",
    currency: "ج.م",
    rating: 4.5,
    description: "ساعة أنيقة بتصميم كلاسيكي مع حركة دقيقة وسوار جلد طبيعي، مثالية للإطلالات الرسمية.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=200",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=200",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200",
    ],
  };
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto" style={resolvedStyles}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div
            className="aspect-square rounded-3xl overflow-hidden mb-4"
            style={{ boxShadow: getCardShadow(theme.shadow) }}
          >
            <img src={product.thumbnails[activeThumb] || product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {content.showThumbnails && (
            <div className="grid grid-cols-4 gap-3">
              {product.thumbnails.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className="aspect-square rounded-xl overflow-hidden transition-all"
                  style={{
                    border: activeThumb === i ? `2px solid ${theme.secondaryColor}` : `2px solid transparent`,
                    opacity: activeThumb === i ? 1 : 0.6,
                  }}
                >
                  <img src={t} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: theme.textPrimaryColor }}>
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} fill={i <= Math.round(product.rating) ? theme.secondaryColor : "transparent"} color={theme.secondaryColor} />
            ))}
            <span className="text-xs opacity-60">({product.rating}) • 128 تقييم</span>
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black" style={{ color: theme.primaryColor }}>{product.price} {product.currency}</span>
            <span className="text-lg line-through opacity-50">{product.oldPrice} {product.currency}</span>
          </div>
          <p className="text-sm leading-relaxed opacity-80 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold">الكمية:</span>
            <div className="flex items-center gap-2 border rounded-xl px-2" style={{ borderColor: `${theme.primaryColor}20` }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 font-bold">−</button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 font-bold">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
            >
              <ShoppingCart size={16} /> {content.addToCartText}
            </button>
            <button
              className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2"
              style={{ borderColor: theme.secondaryColor, color: theme.secondaryColor }}
            >
              {content.buyNowText}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} />, label: "توصيل سريع" },
              { icon: <Shield size={16} />, label: "ضمان سنة" },
              { icon: <Package size={16} />, label: "إرجاع مجاني" },
            ].map((f) => (
              <div key={f.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${theme.primaryColor}08` }}>
                <div className="flex justify-center mb-1" style={{ color: theme.secondaryColor }}>{f.icon}</div>
                <span className="text-[11px] font-bold">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4.9 Footer ---------- */
function FooterComponent({ content = {}, resolvedStyles = {}, theme = {} }) {
  return (
    <footer
      className="w-full pt-12 pb-6 px-6"
      style={{
        ...resolvedStyles,
        backgroundColor: resolvedStyles.backgroundColor || theme.primaryColor || "#0A2947",
        color: resolvedStyles.color || "#ffffff",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-black mb-3">متجري</h3>
          <p className="text-sm opacity-75 leading-relaxed max-w-sm">{content.description}</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">{content.linksTitle}</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li><a href="#">الرئيسية</a></li>
            <li><a href="#">المنتجات</a></li>
            <li><a href="#">من نحن</a></li>
            <li><a href="#">اتصل بنا</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">{content.contactTitle}</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li>{content.contactPhone}</li>
            <li>{content.contactEmail}</li>
          </ul>
        </div>
      </div>
      <div className="border-t pt-5 text-center text-xs opacity-60" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
        {content.copyright}
      </div>
    </footer>
  );
}

// ============================================================
// 📦 SECTION 5: COMPONENT REGISTRY & RENDERER
// ============================================================
const COMPONENT_REGISTRY = {
  navbar: NavbarComponent,
  hero: HeroComponent,
  categories: CategoriesComponent,
  products: ProductsGridComponent,
  searchBar: SearchBarComponent,
  cart: CartComponent,
  productDetails: ProductDetailsComponent,
  footer: FooterComponent,
};

function DynamicRenderer({
  pageConfig, themeConfig = {}, currentDevice = "desktop",
  isBuilder = false, selectedSectionId = null, onSelectSection = () => {},
}) {
  if (!pageConfig || !pageConfig.sections) {
    return <div className="p-8 text-center text-gray-400">لا توجد سكاشن مضافة.</div>;
  }

  const sortedSections = [...pageConfig.sections]
    .filter((s) => s.visible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className="w-full min-h-screen transition-all"
      style={{
        fontFamily: themeConfig.fontFamily || "sans-serif",
        backgroundColor: themeConfig.backgroundColor || "#F3E4C9",
        color: themeConfig.textPrimaryColor || "#0A2947",
      }}
    >
      {sortedSections.map((section) => {
        const Component = COMPONENT_REGISTRY[section.type];
        if (!Component) return null;
        const resolvedStyles = resolveSectionStyles(section.style, section.responsive, currentDevice, themeConfig);
        const isSelected = isBuilder && selectedSectionId === section.id;

        return (
          <div
            key={section.id}
            onClick={(e) => { if (isBuilder) { e.stopPropagation(); onSelectSection(section.id); } }}
            className={`relative transition-all ${
              isBuilder
                ? `cursor-pointer hover:ring-2 hover:ring-[#8B5E3C] ${isSelected ? "ring-2 ring-[#0A2947] shadow-lg z-10" : ""}`
                : ""
            }`}
          >
            {isBuilder && (
              <span
                className={`absolute top-2 end-2 text-[10px] font-mono px-2 py-0.5 rounded shadow z-20 pointer-events-none ${
                  isSelected ? "bg-[#0A2947] text-white" : "bg-black/70 text-white"
                }`}
              >
                {section.type}
              </span>
            )}
            <Component content={section.content} style={section.style} resolvedStyles={resolvedStyles} theme={themeConfig} />
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// 🎛️ SECTION 6: UI HELPERS
// ============================================================

function ColorField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-lg border cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#0A2947]"
        />
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, multiline = false }) {
  return (
    <div>
      <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">{label}</label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#0A2947] resize-none"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#0A2947]"
        />
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false, icon }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-xs font-bold text-[#0A2947]">
          {icon} {title}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="px-3 pb-3 space-y-3 border-t bg-gray-50/50 pt-3">{children}</div>}
    </div>
  );
}

// ============================================================
// 🚀 SECTION 7: MAIN STORE BUILDER
// ============================================================
export default function StoreBuilderPage({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;

  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("sections");
  const [activePageSlug, setActivePageSlug] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [currentDevice, setCurrentDevice] = useState("desktop");
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [showAddPageModal, setShowAddPageModal] = useState(false);

  // ---------- LOAD ----------
  useEffect(() => {
    const fetchStoreSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/websiteSettings/${slug}`);
        const data = res.data?.data || res.data;

        if (!data.pages || data.pages.length === 0) {
          const modernTpl = TEMPLATES.modern;
          data.theme = modernTpl.theme;
          data.pages = [
            {
              id: genId("page"),
              name: "الرئيسية",
              slug: "",
              order: 0,
              sections: modernTpl.sections.map((t, i) => createDefaultSection(t, i)),
            },
          ];
        }

        setConfig(data);
        setActivePageSlug(data.pages[0]?.slug || "");
      } catch (err) {
        console.error("فشل جلب إعدادات المتجر:", err);
        setError("تعذر تحميل بيانات المتجر");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchStoreSettings();
  }, [slug]);

  // ---------- SAVE ----------
  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("website", JSON.stringify(config.website || {}));
      formData.append("theme", JSON.stringify(config.theme || {}));
      formData.append("pages", JSON.stringify(config.pages || []));
      formData.append("status", config.status || "draft");

      await api.put(`/websiteSettings/${slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ تم حفظ إعدادات المتجر بنجاح!");
    } catch (err) {
      console.error("فشل الحفظ:", err);
      alert("❌ حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  // ---------- HELPERS ----------
  const activePage = useMemo(
    () => config?.pages?.find((p) => p.slug === activePageSlug) || config?.pages?.[0],
    [config, activePageSlug]
  );
  const selectedSection = useMemo(
    () => activePage?.sections?.find((s) => s.id === selectedSectionId),
    [activePage, selectedSectionId]
  );

  const updateSectionField = useCallback((path, value) => {
    setConfig((prev) => {
      const updatedPages = prev.pages.map((p) => {
        if (p.slug !== activePageSlug) return p;
        return {
          ...p,
          sections: p.sections.map((s) => {
            if (s.id !== selectedSectionId) return s;
            const updated = JSON.parse(JSON.stringify(s));
            const keys = path.split(".");
            let cur = updated;
            for (let i = 0; i < keys.length - 1; i++) {
              if (!cur[keys[i]]) cur[keys[i]] = {};
              cur = cur[keys[i]];
            }
            cur[keys[keys.length - 1]] = value;
            return updated;
          }),
        };
      });
      return { ...prev, pages: updatedPages };
    });
  }, [activePageSlug, selectedSectionId]);

  const updateTheme = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, theme: { ...prev.theme, [key]: value } }));
  }, []);

  const handleApplyTemplate = (key) => {
    const tpl = TEMPLATES[key];
    const newSections = tpl.sections.map((type, idx) => createDefaultSection(type, idx));
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...tpl.theme },
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: newSections } : p
      ),
    }));
    setSelectedSectionId(null);
  };

  const handleAddSection = (type) => {
    const newSec = createDefaultSection(type, activePage.sections.length);
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: [...p.sections, newSec] } : p
      ),
    }));
    setSelectedSectionId(newSec.id);
    setShowAddSectionModal(false);
  };

  const handleDeleteSection = (id, e) => {
    e.stopPropagation();
    if (!window.confirm("حذف هذا السكشن؟")) return;
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: p.sections.filter((s) => s.id !== id) } : p
      ),
    }));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  const handleMoveSection = (idx, dir, e) => {
    e.stopPropagation();
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= activePage.sections.length) return;
    const updated = [...activePage.sections];
    [updated[idx], updated[targetIdx]] = [updated[targetIdx], updated[idx]];
    updated.forEach((s, i) => (s.order = i));
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: updated } : p
      ),
    }));
  };

  const handleToggleVisibility = (id, e) => {
    e.stopPropagation();
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug
          ? { ...p, sections: p.sections.map((s) => (s.id === id ? { ...s, visible: s.visible === false ? true : false } : s)) }
          : p
      ),
    }));
  };

  const handleDuplicateSection = (id, e) => {
    e.stopPropagation();
    const sec = activePage.sections.find((s) => s.id === id);
    if (!sec) return;
    const clone = JSON.parse(JSON.stringify(sec));
    clone.id = genId("sec");
    clone.order = activePage.sections.length;
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: [...p.sections, clone] } : p
      ),
    }));
  };

  const handleAddPage = (name, slugVal) => {
    const newPage = {
      id: genId("page"),
      name,
      slug: slugVal,
      order: config.pages.length,
      sections: [
        createDefaultSection("navbar", 0),
        createDefaultSection("footer", 1),
      ],
    };
    setConfig((prev) => ({ ...prev, pages: [...prev.pages, newPage] }));
    setActivePageSlug(newPage.slug);
    setShowAddPageModal(false);
  };

  const handleDeletePage = (pageSlug) => {
    if (config.pages.length <= 1) return alert("لا يمكن حذف آخر صفحة");
    if (!window.confirm("حذف هذه الصفحة؟")) return;
    setConfig((prev) => ({ ...prev, pages: prev.pages.filter((p) => p.slug !== pageSlug) }));
    if (activePageSlug === pageSlug) setActivePageSlug(config.pages[0].slug);
  };

  // ---------- PRODUCT MANAGEMENT ----------
  const handleAddProduct = () => {
    const newProduct = {
      id: genId("prod"),
      name: "منتج جديد",
      price: "100",
      oldPrice: "",
      currency: "ج.م",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      badge: "",
      rating: 4.5,
      category: "",
      description: "",
      inStock: true,
    };
    const productsSec = activePage.sections.find((s) => s.type === "products");
    if (!productsSec) return alert("أضف سكشن منتجات أولاً");
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === productsSec.id
                  ? { ...s, content: { ...s.content, items: [...(s.content.items || []), newProduct] } }
                  : s
              ),
            }
          : p
      ),
    }));
    setSelectedSectionId(productsSec.id);
  };

  const updateProduct = (productId, field, value) => {
    const productsSec = activePage.sections.find((s) => s.type === "products");
    if (!productsSec) return;
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === productsSec.id
                  ? {
                      ...s,
                      content: {
                        ...s.content,
                        items: s.content.items.map((it) =>
                          it.id === productId ? { ...it, [field]: value } : it
                        ),
                      },
                    }
                  : s
              ),
            }
          : p
      ),
    }));
  };

  const deleteProduct = (productId) => {
    const productsSec = activePage.sections.find((s) => s.type === "products");
    if (!productsSec) return;
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === productsSec.id
                  ? { ...s, content: { ...s.content, items: s.content.items.filter((it) => it.id !== productId) } }
                  : s
              ),
            }
          : p
      ),
    }));
  };

  // ---------- IMAGE UPLOAD (Base64 preview + FormData ready) ----------
  const handleImageUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => callback(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ---------- LOADING / ERROR ----------
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F3E4C9]">
        <Loader2 className="animate-spin mb-4" size={40} color="#0A2947" />
        <span className="text-sm font-bold text-[#0A2947]">جاري تحميل محرر المتجر...</span>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F3E4C9]">
        <AlertCircle size={48} color="#dc2626" className="mb-4" />
        <span className="text-sm font-bold text-red-600">{error || "لا توجد بيانات"}</span>
      </div>
    );
  }

  const deviceWidths = {
    desktop: "w-full max-w-full",
    tablet: "w-[768px] max-w-full shadow-2xl rounded-xl border border-gray-300 my-4",
    mobile: "w-[390px] max-w-full shadow-2xl rounded-[2rem] border-[8px] border-[#0A2947] my-4",
  };

  // ============================================================
  // 🎨 RENDER
  // ============================================================
  return (
    <div dir="rtl" className="h-screen w-screen flex flex-col overflow-hidden bg-[#F3E4C9] select-none">
      {/* ============ HEADER ============ */}
      <header className="h-14 border-b border-[#0A2947]/10 px-4 flex items-center justify-between bg-white z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0A2947" }}>
            <Home size={15} color="#F3E4C9" />
          </div>
          <span className="font-black text-sm text-[#0A2947]">محرر المتجر المرئي</span>
          <span className="text-[11px] font-mono bg-[#F3E4C9] px-2 py-0.5 rounded text-[#8B5E3C]">
            {slug}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#F3E4C9] p-1 rounded-xl">
          {[
            { key: "desktop", Icon: Monitor },
            { key: "tablet", Icon: Tablet },
            { key: "mobile", Icon: Smartphone },
          ].map(({ key, Icon }) => (
            <button
              key={key}
              onClick={() => setCurrentDevice(key)}
              className={`p-1.5 rounded-lg transition-all ${
                currentDevice === key ? "bg-white shadow-sm text-[#0A2947]" : "text-[#8B5E3C]"
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-50 active:scale-95"
          style={{ backgroundColor: "#0A2947" }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{saving ? "جاري الحفظ..." : "حفظ"}</span>
        </button>
      </header>

      {/* ============ MAIN BODY ============ */}
      <div className="flex-1 flex overflow-hidden">
        {/* ===== SIDEBAR (RIGHT) ===== */}
        <aside className="w-80 bg-white border-s border-[#0A2947]/10 flex flex-col h-full z-20 flex-shrink-0">
          <div className="flex border-b border-[#0A2947]/10 text-xs">
            {[
              { key: "sections", label: "السكاشن", Icon: Layout },
              { key: "pages", label: "الصفحات", Icon: FileText },
              { key: "templates", label: "القوالب", Icon: Palette },
              { key: "products", label: "المنتجات", Icon: Package },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 font-bold transition-colors ${
                  activeTab === key
                    ? "border-b-2 text-[#0A2947]"
                    : "text-[#8B5E3C]/60 hover:text-[#0A2947]"
                }`}
                style={{ borderColor: activeTab === key ? "#8B5E3C" : "transparent" }}
              >
                <Icon size={14} />
                <span className="text-[10px]">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
            {/* ---------- SECTIONS TAB ---------- */}
            {activeTab === "sections" && (
              <>
                <button
                  onClick={() => setShowAddSectionModal(true)}
                  className="w-full py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                  style={{ backgroundColor: "#0A2947" }}
                >
                  <Plus size={14} /> إضافة سكشن جديد
                </button>

                <div className="space-y-2">
                  {activePage.sections
                    .sort((a, b) => a.order - b.order)
                    .map((sec, idx) => {
                      const meta = SECTION_LIBRARY.find((s) => s.type === sec.type);
                      const isSelected = selectedSectionId === sec.id;
                      const isHidden = sec.visible === false;
                      return (
                        <div
                          key={sec.id}
                          onClick={() => setSelectedSectionId(sec.id)}
                          className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#0A2947] bg-[#F3E4C9]/50"
                              : "border-transparent bg-gray-50 hover:bg-[#F3E4C9]/30"
                          } ${isHidden ? "opacity-40" : ""}`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-[#0A2947] flex items-center gap-1.5">
                              <span>{meta?.icon}</span>
                              <span>{meta?.label || sec.type}</span>
                            </span>
                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={(e) => handleToggleVisibility(sec.id, e)}
                                className="p-1 hover:text-[#8B5E3C] rounded"
                                title="إظهار/إخفاء"
                              >
                                {isHidden ? <EyeOff size={11} /> : <Eye size={11} />}
                              </button>
                              <button
                                onClick={(e) => handleDuplicateSection(sec.id, e)}
                                className="p-1 hover:text-[#8B5E3C] rounded"
                                title="تكرار"
                              >
                                <Copy size={11} />
                              </button>
                              <button
                                onClick={(e) => handleDeleteSection(sec.id, e)}
                                className="p-1 text-red-500 hover:text-red-700 rounded"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 font-mono">
                              #{idx + 1}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <button
                                disabled={idx === 0}
                                onClick={(e) => handleMoveSection(idx, "up", e)}
                                className="p-1 hover:text-[#8B5E3C] disabled:opacity-30 rounded"
                              >
                                <ArrowUp size={11} />
                              </button>
                              <button
                                disabled={idx === activePage.sections.length - 1}
                                onClick={(e) => handleMoveSection(idx, "down", e)}
                                className="p-1 hover:text-[#8B5E3C] disabled:opacity-30 rounded"
                              >
                                <ArrowDown size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}

            {/* ---------- PAGES TAB ---------- */}
            {activeTab === "pages" && (
              <>
                <button
                  onClick={() => setShowAddPageModal(true)}
                  className="w-full py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0A2947" }}
                >
                  <Plus size={14} /> إضافة صفحة جديدة
                </button>

                <div className="space-y-1.5">
                  {config.pages.map((p) => (
                    <div
                      key={p.id}
                      className={`p-2.5 rounded-xl border-2 flex items-center justify-between transition-all ${
                        activePageSlug === p.slug
                          ? "border-[#0A2947] bg-[#F3E4C9]/50"
                          : "border-transparent bg-gray-50 hover:bg-[#F3E4C9]/30"
                      }`}
                    >
                      <button
                        onClick={() => { setActivePageSlug(p.slug); setSelectedSectionId(null); }}
                        className="flex-1 text-right"
                      >
                        <div className="font-bold text-[#0A2947]">{p.name}</div>
                        <div className="text-[10px] text-[#8B5E3C] font-mono">/{p.slug || "home"}</div>
                      </button>
                      {config.pages.length > 1 && (
                        <button
                          onClick={() => handleDeletePage(p.slug)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ---------- TEMPLATES TAB ---------- */}
            {activeTab === "templates" && (
              <>
                <div className="text-[11px] text-gray-500 mb-2 p-2 rounded-lg bg-[#F3E4C9]/50">
                  ⚠️ تغيير القالب يعيد ضبط كل السكاشن في الصفحة الحالية.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(TEMPLATES).map(([key, tpl]) => (
                    <button
                      key={key}
                      onClick={() => handleApplyTemplate(key)}
                      className="p-3 border-2 border-transparent rounded-xl text-right hover:border-[#0A2947] transition-all flex flex-col justify-between h-24 bg-gray-50"
                    >
                      <span className="font-bold text-xs text-[#0A2947]">{tpl.name}</span>
                      <div className="flex gap-1.5 mt-2">
                        <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: tpl.theme.primaryColor }} />
                        <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: tpl.theme.secondaryColor }} />
                        <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: tpl.theme.backgroundColor }} />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---------- PRODUCTS TAB ---------- */}
            {activeTab === "products" && (
              <>
                <button
                  onClick={handleAddProduct}
                  className="w-full py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0A2947" }}
                >
                  <Plus size={14} /> إضافة منتج
                </button>

                <div className="space-y-2">
                  {(activePage.sections.find((s) => s.type === "products")?.content?.items || []).map((prod) => (
                    <div key={prod.id} className="p-2 rounded-xl bg-gray-50 flex gap-2 items-center">
                      <img src={prod.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] truncate text-[#0A2947]">{prod.name}</div>
                        <div className="text-[10px] text-[#8B5E3C]">{prod.price} {prod.currency}</div>
                      </div>
                      <button onClick={() => deleteProduct(prod.id)} className="p-1 text-red-500">
                        <Trash2 size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>

        {/* ===== CENTER PREVIEW ===== */}
        <main
          className="flex-1 bg-[#8B5E3C]/10 overflow-y-auto flex justify-center items-start p-4 transition-all"
          onClick={() => setSelectedSectionId(null)}
        >
          <div className={`transition-all duration-300 overflow-hidden bg-white ${deviceWidths[currentDevice]}`}>
            <DynamicRenderer
              pageConfig={activePage}
              themeConfig={config.theme}
              currentDevice={currentDevice}
              isBuilder={true}
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
            />
          </div>
        </main>

        {/* ===== PROPERTIES (LEFT) ===== */}
        <aside className="w-80 bg-white border-e border-[#0A2947]/10 h-full overflow-y-auto p-3 text-xs space-y-3 z-20 flex-shrink-0">
          {selectedSection ? (
            <>
              <div className="p-3 rounded-xl flex items-center justify-between" style={{ backgroundColor: "#F3E4C9" }}>
                <div>
                  <h3 className="font-black text-sm text-[#0A2947]">
                    {SECTION_LIBRARY.find((s) => s.type === selectedSection.type)?.label || selectedSection.type}
                  </h3>
                  <span className="text-[9px] text-[#8B5E3C] font-mono">{selectedSection.id.slice(0, 20)}...</span>
                </div>
                <Settings size={16} className="text-[#8B5E3C]" />
              </div>

              {/* ===== CONTENT ===== */}
              <Accordion title="المحتوى والنصوص" defaultOpen icon={<FileText size={13} />}>
                {Object.entries(selectedSection.content || {}).map(([field, value]) => {
                  if (["items", "links", "categories", "social", "thumbnails"].includes(field)) return null;
                  if (typeof value === "boolean") {
                    return (
                      <label key={field} className="flex items-center justify-between py-1">
                        <span className="text-[11px] font-semibold capitalize">{field}</span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updateSectionField(`content.${field}`, e.target.checked)}
                          className="w-4 h-4 accent-[#0A2947]"
                        />
                      </label>
                    );
                  }
                  if (typeof value === "number") {
                    return (
                      <TextField
                        key={field}
                        label={field}
                        value={value}
                        onChange={(v) => updateSectionField(`content.${field}`, Number(v) || 0)}
                      />
                    );
                  }
                  const isLong = ["subtitle", "description"].includes(field);
                  return (
                    <TextField
                      key={field}
                      label={field}
                      value={value || ""}
                      onChange={(v) => updateSectionField(`content.${field}`, v)}
                      multiline={isLong}
                    />
                  );
                })}

                {/* Image URL quick edit */}
                {["backgroundImage", "logoUrl", "image"].map((field) =>
                  selectedSection.content?.[field] !== undefined ? (
                    <div key={field}>
                      <TextField
                        label={`${field} (URL)`}
                        value={selectedSection.content[field] || ""}
                        onChange={(v) => updateSectionField(`content.${field}`, v)}
                      />
                      <label className="mt-2 block">
                        <span className="text-[10px] text-[#8B5E3C] font-semibold cursor-pointer hover:underline">
                          📤 أو ارفع صورة
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (base64) => updateSectionField(`content.${field}`, base64))
                          }
                        />
                      </label>
                    </div>
                  ) : null
                )}
              </Accordion>

              {/* ===== STYLE ===== */}
              <Accordion title="المظهر والتصميم" icon={<Palette size={13} />}>
                <ColorField
                  label="لون الخلفية"
                  value={selectedSection.style?.backgroundColor || "#ffffff"}
                  onChange={(v) => updateSectionField("style.backgroundColor", v)}
                />
                <ColorField
                  label="لون النص"
                  value={selectedSection.style?.color || "#000000"}
                  onChange={(v) => updateSectionField("style.color", v)}
                />
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">المحاذاة</label>
                  <div className="grid grid-cols-3 gap-1">
                    {["left", "center", "right"].map((align) => (
                      <button
                        key={align}
                        onClick={() => updateSectionField("style.text.textAlign", align)}
                        className={`py-1.5 border rounded-lg text-[10px] font-bold capitalize transition-colors ${
                          selectedSection.style?.text?.textAlign === align
                            ? "bg-[#0A2947] text-white border-[#0A2947]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {align === "left" ? "يسار" : align === "center" ? "وسط" : "يمين"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">الظل</label>
                  <div className="grid grid-cols-3 gap-1">
                    {["flat", "soft", "dramatic"].map((sh) => (
                      <button
                        key={sh}
                        onClick={() => updateSectionField("style.shadow", sh)}
                        className={`py-1.5 border rounded-lg text-[10px] font-bold capitalize ${
                          selectedSection.style?.shadow === sh ? "bg-[#0A2947] text-white border-[#0A2947]" : ""
                        }`}
                      >
                        {sh}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">حواف دائرية</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={parseInt(selectedSection.style?.border?.radius) || 0}
                    onChange={(e) => updateSectionField("style.border.radius", `${e.target.value}px`)}
                    className="w-full accent-[#0A2947]"
                  />
                </div>
              </Accordion>

              {/* ===== SPACING ===== */}
              <Accordion title="المسافات والحشو" icon={<Layers size={13} />}>
                <div className="grid grid-cols-2 gap-2">
                  {["top", "right", "bottom", "left"].map((side) => (
                    <TextField
                      key={`pad-${side}`}
                      label={`حشو ${side}`}
                      value={selectedSection.style?.spacing?.padding?.[side] || "0px"}
                      onChange={(v) => updateSectionField(`style.spacing.padding.${side}`, v)}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["top", "right", "bottom", "left"].map((side) => (
                    <TextField
                      key={`mar-${side}`}
                      label={`هامش ${side}`}
                      value={selectedSection.style?.spacing?.margin?.[side] || "0px"}
                      onChange={(v) => updateSectionField(`style.spacing.margin.${side}`, v)}
                    />
                  ))}
                </div>
              </Accordion>

              {/* ===== PRODUCT EDITOR (if products section) ===== */}
              {selectedSection.type === "products" && (
                <Accordion title="إدارة المنتجات" icon={<Package size={13} />}>
                  {(selectedSection.content?.items || []).map((prod) => (
                    <div key={prod.id} className="p-2 border rounded-lg space-y-2 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <img src={prod.image} className="w-10 h-10 rounded object-cover" alt="" />
                        <span className="font-bold text-[11px] flex-1 truncate">{prod.name}</span>
                        <button onClick={() => deleteProduct(prod.id)} className="text-red-500">
                          <Trash2 size={11} />
                        </button>
                      </div>
                      <input
                        placeholder="اسم المنتج"
                        value={prod.name}
                        onChange={(e) => updateProduct(prod.id, "name", e.target.value)}
                        className="w-full border rounded px-2 py-1 text-[11px]"
                      />
                      <div className="grid grid-cols-2 gap-1">
                        <input
                          placeholder="السعر"
                          value={prod.price}
                          onChange={(e) => updateProduct(prod.id, "price", e.target.value)}
                          className="border rounded px-2 py-1 text-[11px]"
                        />
                        <input
                          placeholder="السعر القديم"
                          value={prod.oldPrice || ""}
                          onChange={(e) => updateProduct(prod.id, "oldPrice", e.target.value)}
                          className="border rounded px-2 py-1 text-[11px]"
                        />
                      </div>
                      <input
                        placeholder="رابط الصورة"
                        value={prod.image}
                        onChange={(e) => updateProduct(prod.id, "image", e.target.value)}
                        className="w-full border rounded px-2 py-1 text-[11px] font-mono"
                      />
                      <label className="block">
                        <span className="text-[10px] text-[#8B5E3C] font-semibold cursor-pointer hover:underline">
                          📤 رفع صورة من الجهاز
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (base64) => updateProduct(prod.id, "image", base64))}
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    onClick={handleAddProduct}
                    className="w-full py-2 rounded-lg text-white font-bold text-[11px]"
                    style={{ backgroundColor: "#8B5E3C" }}
                  >
                    + إضافة منتج
                  </button>
                </Accordion>
              )}

              {/* ===== ANIMATION ===== */}
              <Accordion title="الحركة والانتقال" icon={<Star size={13} />}>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">نوع الحركة</label>
                  <select
                    value={selectedSection.animation?.name || "none"}
                    onChange={(e) => updateSectionField("animation.name", e.target.value)}
                    className="w-full border rounded-lg p-1.5 text-[11px]"
                  >
                    <option value="none">بدون</option>
                    <option value="fadeIn">ظهور تدريجي</option>
                    <option value="slideUp">انزلاق للأعلى</option>
                    <option value="slideDown">انزلاق للأسفل</option>
                    <option value="zoomIn">تكبير</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">المدة (ث)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={selectedSection.animation?.duration || 0.5}
                    onChange={(e) => updateSectionField("animation.duration", Number(e.target.value))}
                    className="w-full border rounded-lg p-1.5 text-[11px]"
                  />
                </div>
              </Accordion>
            </>
          ) : (
            <>
              <div className="p-3 rounded-xl" style={{ backgroundColor: "#F3E4C9" }}>
                <h3 className="font-black text-sm text-[#0A2947] mb-1">إعدادات المتجر العامة</h3>
                <p className="text-[11px] text-[#8B5E3C]">
                  اختر سكشن من اليمين لتعديله، أو عدّل السمات العامة هنا.
                </p>
              </div>

              <Accordion title="الألوان الأساسية" defaultOpen icon={<Palette size={13} />}>
                <ColorField label="اللون الأساسي" value={config.theme.primaryColor} onChange={(v) => updateTheme("primaryColor", v)} />
                <ColorField label="اللون الثانوي" value={config.theme.secondaryColor} onChange={(v) => updateTheme("secondaryColor", v)} />
                <ColorField label="لون الخلفية" value={config.theme.backgroundColor} onChange={(v) => updateTheme("backgroundColor", v)} />
                <ColorField label="سطح البطاقات" value={config.theme.surfaceColor} onChange={(v) => updateTheme("surfaceColor", v)} />
                <ColorField label="لون النص الأساسي" value={config.theme.textPrimaryColor} onChange={(v) => updateTheme("textPrimaryColor", v)} />
                <ColorField label="لون النص الثانوي" value={config.theme.textSecondaryColor} onChange={(v) => updateTheme("textSecondaryColor", v)} />
              </Accordion>

              <Accordion title="الخطوط" icon={<FileText size={13} />}>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">نوع الخط</label>
                  <select
                    value={config.theme.fontFamily}
                    onChange={(e) => updateTheme("fontFamily", e.target.value)}
                    className="w-full border rounded-lg p-2 text-[11px]"
                  >
                    {ARABIC_FONTS.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
                <ColorField label="اللون الأساسي" value={config.theme.primaryColor} onChange={(v) => updateTheme("primaryColor", v)} />
              </Accordion>

              <Accordion title="الحواف والظلال" icon={<Layers size={13} />}>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">نصف قطر الحواف</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={parseInt(config.theme.radius) || 12}
                    onChange={(e) => updateTheme("radius", `${e.target.value}px`)}
                    className="w-full accent-[#0A2947]"
                  />
                  <span className="text-[10px] text-[#8B5E3C]">{config.theme.radius}</span>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold">نمط الظل</label>
                  <div className="grid grid-cols-3 gap-1">
                    {["flat", "soft", "dramatic"].map((sh) => (
                      <button
                        key={sh}
                        onClick={() => updateTheme("shadow", sh)}
                        className={`py-1.5 border rounded-lg text-[10px] font-bold capitalize ${
                          config.theme.shadow === sh ? "bg-[#0A2947] text-white border-[#0A2947]" : ""
                        }`}
                      >
                        {sh}
                      </button>
                    ))}
                  </div>
                </div>
              </Accordion>

              <Accordion title="معلومات الموقع" icon={<Settings size={13} />}>
                <TextField
                  label="اسم المتجر"
                  value={config.website?.title || ""}
                  onChange={(v) => setConfig((prev) => ({ ...prev, website: { ...prev.website, title: v } }))}
                />
                <TextField
                  label="وصف المتجر"
                  value={config.website?.description || ""}
                  onChange={(v) => setConfig((prev) => ({ ...prev, website: { ...prev.website, description: v } }))}
                  multiline
                />
              </Accordion>
            </>
          )}
        </aside>
      </div>

      {/* ============ ADD SECTION MODAL ============ */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddSectionModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg text-[#0A2947]">إضافة سكشن جديد</h3>
              <button onClick={() => setShowAddSectionModal(false)}><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SECTION_LIBRARY.map((s) => (
                <button
                  key={s.type}
                  onClick={() => handleAddSection(s.type)}
                  className="p-4 border-2 border-transparent rounded-xl text-center hover:border-[#0A2947] hover:bg-[#F3E4C9]/30 transition-all"
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="font-bold text-xs text-[#0A2947] mb-1">{s.label}</div>
                  <div className="text-[10px] text-[#8B5E3C]">{s.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ ADD PAGE MODAL ============ */}
      {showAddPageModal && <AddPageModal onClose={() => setShowAddPageModal(false)} onAdd={handleAddPage} />}
    </div>
  );
}

// ============================================================
// 📄 SECTION 8: ADD PAGE MODAL
// ============================================================
function AddPageModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [pageSlug, setPageSlug] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-black text-lg text-[#0A2947] mb-4">إضافة صفحة جديدة</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#0A2947] mb-1">اسم الصفحة</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: من نحن"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0A2947]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0A2947] mb-1">الرابط (slug)</label>
            <input
              value={pageSlug}
              onChange={(e) => setPageSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())}
              placeholder="about-us"
              className="w-full border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#0A2947]"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border font-bold text-sm"
          >
            إلغاء
          </button>
          <button
            onClick={() => name && pageSlug && onAdd(name, pageSlug)}
            disabled={!name || !pageSlug}
            className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm disabled:opacity-50"
            style={{ backgroundColor: "#0A2947" }}
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
=======
import React, { useState, useEffect } from "react";
import { Monitor, Tablet, Smartphone, Save, Undo, Eye } from "lucide-react";
import api from "../../../services/api";
import BuilderSidebar from "./BuilderSidebar";
import DevicePreview from "./DevicePreview";
import SettingsPanel from "./SettingsPanel";
import { TEMPLATES } from "../templates";

export default function StoreBuilder({ slug }) {
  // حالة الـ Configuration الكاملة المتوافقة مع الـ Mongoose Schema
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // حالات التنقل الداخلية
  const [activeTab, setActiveTab] = useState("sections");
  const [activePageSlug, setActivePageSlug] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [currentDevice, setCurrentDevice] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'

  // جلب إعدادات المتجر الحالية من الـ API الموجود
  useEffect(() => {
    const fetchStoreSettings = async () => {
      try {
        setLoading(true);
        // GET /v1/websiteSettings/:slug
        const res = await api.get(`/websiteSettings/${slug}`);
        const data = res.data?.data || res.data;

        // إذا كان المتجر جديداً ولا يحتوي على صفحات مهيأة، نجهز الصفحة الافتراضية
        if (!data.pages || data.pages.length === 0) {
          const modernTpl = TEMPLATES.modern;
          data.theme = modernTpl.theme;
          data.pages = [
            {
              id: "page_home",
              name: "الرئيسية",
              slug: "",
              order: 0,
              sections: [
                {
                  id: "sec_nav",
                  type: "navbar",
                  order: 0,
                  content: { title: data.website?.title || "متجري" },
                  layout: { display: "block" },
                  style: { backgroundColor: "#ffffff" },
                },
                {
                  id: "sec_hero",
                  type: "hero",
                  order: 1,
                  content: {
                    title: "أهلاً بك في متجرنا",
                    subtitle: "تسوق أفضل المنتجات بسهولة وسرعة",
                    buttonText: "ابدأ التسوق",
                  },
                  layout: { display: "block" },
                  style: { backgroundColor: "#f8fafc" },
                },
                {
                  id: "sec_prods",
                  type: "products",
                  order: 2,
                  content: { title: "أحدث المنتجات" },
                  layout: { display: "block" },
                  style: {},
                },
                {
                  id: "sec_foot",
                  type: "footer",
                  order: 3,
                  content: { copyright: "جميع الحقوق محفوظة 2026" },
                  layout: { display: "block" },
                  style: {},
                },
              ],
            },
          ];
        }

        setConfig(data);
        setActivePageSlug(data.pages[0]?.slug || "");
      } catch (err) {
        console.error("فشل جلب إعدادات المتجر:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchStoreSettings();
  }, [slug]);

  // حفظ التعديلات عبر الـ API الموجود مسبقاً
  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("website", JSON.stringify(config.website));
      formData.append("theme", JSON.stringify(config.theme));
      formData.append("pages", JSON.stringify(config.pages));
      formData.append("status", "draft");

      // PUT /v1/websiteSettings/:slug
      await api.put(`/websiteSettings/${slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("تم حفظ التصميم بنجاح!");
    } catch (err) {
      console.error("فشل حفظ إعدادات المتجر:", err);
      alert("حدث خطأ أثناء حفظ التعديلات.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-xs font-semibold">
        جاري تحميل محرر المتجر...
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-xs text-red-500">
        تعذر العثور على بيانات المتجر.
      </div>
    );
  }

  return (
    <div dir="rtl" className="h-screen w-screen flex flex-col overflow-hidden bg-white select-none">
      {/* 1. شريط الأدوات العلوي (Top Control Toolbar) */}
      <header className="h-14 border-b px-4 flex items-center justify-between bg-white z-30">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm">مخصص المتجر</span>
          <span className="text-[11px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
            {slug}
          </span>
        </div>

        {/* أزرار محاكاة الأجهزة Responsive Devices */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => setCurrentDevice("desktop")}
            className={`p-1.5 rounded ${
              currentDevice === "desktop" ? "bg-white shadow-sm text-black" : "text-gray-500"
            }`}
          >
            <Monitor size={15} />
          </button>
          <button
            onClick={() => setCurrentDevice("tablet")}
            className={`p-1.5 rounded ${
              currentDevice === "tablet" ? "bg-white shadow-sm text-black" : "text-gray-500"
            }`}
          >
            <Tablet size={15} />
          </button>
          <button
            onClick={() => setCurrentDevice("mobile")}
            className={`p-1.5 rounded ${
              currentDevice === "mobile" ? "bg-white shadow-sm text-black" : "text-gray-500"
            }`}
          >
            <Smartphone size={15} />
          </button>
        </div>

        {/* زر الحفظ */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-md transition-all disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
          </button>
        </div>
      </header>

      {/* 2. منطقة العمل الرئيسية (3-Column Layout) */}
      <div className="flex-1 flex overflow-hidden">
        {/* العمود الأيمن: القائمة الجانبية لإدارة السكاشن والصفحات والنماذج */}
        <BuilderSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          config={config}
          setConfig={setConfig}
          activePageSlug={activePageSlug}
          setActivePageSlug={setActivePageSlug}
          selectedSectionId={selectedSectionId}
          setSelectedSectionId={setSelectedSectionId}
        />

        {/* العمود الأوسط: الـ Live Preview التفاعلي */}
        <DevicePreview
          config={config}
          activePageSlug={activePageSlug}
          currentDevice={currentDevice}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
        />

        {/* العمود الأيسر: لوحة تعديل خصائص السكشن والسمات العامة */}
        <SettingsPanel
          config={config}
          setConfig={setConfig}
          activePageSlug={activePageSlug}
          selectedSectionId={selectedSectionId}
          currentDevice={currentDevice}
        />
      </div>
    </div>
  );
>>>>>>> 36f8532 (Initial commit)
}