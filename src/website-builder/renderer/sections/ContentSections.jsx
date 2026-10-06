import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { getImageUrl, getCardShadow } from "../../../utils/styles";

// ============================================================
// GRID MAP حسب الجهاز
// ============================================================
const getGridCols = (device, columns) => {
  // mobile = 1, tablet = 2, desktop = columns
  if (device === "mobile") return "grid-cols-1";
  if (device === "tablet") return "grid-cols-2";
  return {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[columns] || "grid-cols-4";
};

const getCategoryGridCols = (device, columns) => {
  // mobile = 2, tablet = 3, desktop = columns
  if (device === "mobile") return "grid-cols-2";
  if (device === "tablet") return "grid-cols-3";
  return {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
  }[columns] || "grid-cols-4";
};

// ============================================================
// CATEGORIES — 5 VARIANTS
// ============================================================
export function CategoriesRenderer({
  section,
  content = {},
  resolvedStyles,
  theme,
  categories = [],
  device = "desktop",
}) {
  const items = content.source === "categories" && categories.length ? categories : (content.items || []);
  const variant = section.variant;
  const columns = Number(content.columns) || 4;
  const gridCls = getCategoryGridCols(device, columns);

  if (variant === "circle-grid") {
    const circleCols =
      device === "mobile" ? "grid-cols-3" : device === "tablet" ? "grid-cols-4" : "grid-cols-6";

    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {content.title && (
            <h2 className="text-2xl lg:text-4xl font-black text-center mb-12">{content.title}</h2>
          )}
          <div className={`grid ${circleCols} gap-4 lg:gap-6`}>
            {items.slice(0, 6).map((c) => (
              <a key={c.id} href={`/products?category=${c.id}`} className="text-center group">
                <div
                  className="aspect-square rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300"
                  style={{ boxShadow: getCardShadow("soft") }}
                >
                  {getImageUrl(c.image) ? (
                    <img src={getImageUrl(c.image)} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${theme.primaryColor}10` }}
                    >
                      <span className="text-2xl">📁</span>
                    </div>
                  )}
                </div>
                <span className="text-sm lg:text-base font-bold">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "horizontal-scroll") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-black mb-6">{content.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {items.map((c) => (
              <a key={c.id} href="#" className="shrink-0 w-40 lg:w-52 group">
                <div
                  className="aspect-square rounded-2xl overflow-hidden mb-2"
                  style={{ boxShadow: getCardShadow("soft") }}
                >
                  {getImageUrl(c.image) && (
                    <img
                      src={getImageUrl(c.image)}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  )}
                </div>
                <span className="text-sm font-bold">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "list-with-count") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-black mb-6">{content.title}</h2>
          <div className="space-y-2">
            {items.map((c) => (
              <a
                key={c.id}
                href="#"
                className="flex items-center justify-between p-4 rounded-xl transition hover:shadow-md"
                style={{ backgroundColor: theme.surfaceColor || "#fff" }}
              >
                <span className="font-bold">{c.name}</span>
                <span className="text-sm opacity-60">{c.count || 0} منتج</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default: grid-overlay / masonry
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          {content.title && (
            <h2 className="text-2xl lg:text-4xl font-black mb-3">{content.title}</h2>
          )}
          {content.subtitle && (
            <p className="text-sm lg:text-base opacity-70">{content.subtitle}</p>
          )}
        </div>
        <div className={`grid ${gridCls} gap-4 lg:gap-5`}>
          {items.map((c) => (
            <a
              key={c.id}
              href="#"
              className="relative rounded-2xl overflow-hidden aspect-[4/5] group"
              style={{ boxShadow: getCardShadow("soft") }}
            >
              {getImageUrl(c.image) ? (
                <img
                  src={getImageUrl(c.image)}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: `${theme.primaryColor}15` }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 start-0 end-0 p-5 text-white">
                <h3 className="text-lg lg:text-xl font-black mb-1">{c.name}</h3>
                {c.count && <p className="text-xs opacity-90">{c.count} منتج</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRODUCTS GRID
// ============================================================
export function ProductsRenderer({
  section,
  content = {},
  resolvedStyles,
  theme,
  products = [],
  device = "desktop",
}) {
  const items = products.length ? products.slice(0, content.limit || 8) : (content.items || []);
  const variant = section.variant;
  const columns = Number(content.columns) || 4;
  const gridCls = getGridCols(device, columns);

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            {content.title && (
              <h2 className="text-2xl lg:text-4xl font-black mb-2">{content.title}</h2>
            )}
            {content.subtitle && (
              <p className="text-sm lg:text-base opacity-70">{content.subtitle}</p>
            )}
          </div>
          <a
            href="/products"
            className="text-sm font-bold self-start lg:self-auto"
            style={{ color: theme.secondaryColor }}
          >
            عرض الكل →
          </a>
        </div>

        {variant === "carousel" ? (
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {items.map((p) => (
              <div key={p.id} className="shrink-0 w-64 lg:w-72">
                <ProductCardRenderer
                  product={p}
                  cardVariant={content.cardVariant}
                  theme={theme}
                  content={content}
                />
              </div>
            ))}
          </div>
        ) : variant === "list-view" ? (
          <div className="space-y-4">
            {items.map((p) => (
              <HorizontalProductCard key={p.id} product={p} theme={theme} />
            ))}
          </div>
        ) : (
          <div className={`grid ${gridCls} gap-4 lg:gap-5`}>
            {items.map((p) => (
              <ProductCardRenderer
                key={p.id}
                product={p}
                cardVariant={content.cardVariant}
                theme={theme}
                content={content}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// PRODUCT CARD — 5 VARIANTS
// ============================================================
export function ProductCardRenderer({ product = {}, cardVariant = "elevated", theme = {}, content = {} }) {
  const img = getImageUrl(product.image);
  const variant = cardVariant;
  const [hovered, setHovered] = useState(false);

  const hasDiscount = product.oldPrice && Number(product.oldPrice) > Number(product.price);
  const discount = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // MINIMAL
  if (variant === "minimal") {
    return (
      <a href={`/product/${product.id}`} className="block group">
        <div
          className="aspect-square rounded-xl overflow-hidden mb-3 relative"
          style={{ backgroundColor: `${theme.primaryColor}08` }}
        >
          {img ? (
            <img
              src={img}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs opacity-30">لا توجد صورة</div>
          )}
        </div>
        <h3 className="text-sm font-bold truncate mb-1" style={{ color: theme.textPrimaryColor }}>
          {product.name}
        </h3>
        <span className="text-base font-black" style={{ color: theme.primaryColor }}>
          {product.price} {product.currency || "ج.م"}
        </span>
      </a>
    );
  }

  // LUXURY
  if (variant === "luxury") {
    return (
      <a
        href={`/product/${product.id}`}
        className="block group border-2 transition-colors"
        style={{ borderColor: hovered ? theme.primaryColor : `${theme.primaryColor}15` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aspect-square overflow-hidden bg-neutral-50">
          {img ? (
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          ) : null}
        </div>
        <div className="p-5 text-center">
          <h3
            className="text-sm mb-3 font-medium"
            style={{ color: theme.textPrimaryColor, letterSpacing: "0.05em" }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-bold">
              {product.price} {product.currency || "ج.م"}
            </span>
            {hasDiscount && <span className="text-xs line-through opacity-50">{product.oldPrice}</span>}
          </div>
        </div>
      </a>
    );
  }

  // HOVER MODERN
  if (variant === "hover-modern") {
    return (
      <a
        href={`/product/${product.id}`}
        className="block relative group overflow-hidden rounded-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aspect-[4/5]" style={{ backgroundColor: `${theme.primaryColor}08` }}>
          {img ? (
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          ) : null}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 flex flex-col justify-end text-white"
          style={{ opacity: hovered ? 1 : 0.9 }}
        >
          <h3 className="font-bold text-base md:text-lg mb-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-black">
              {product.price} {product.currency || "ج.م"}
            </span>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ backgroundColor: theme.secondaryColor || "#8B5E3C" }}
              onClick={(e) => e.preventDefault()}
            >
              أضف للسلة
            </button>
          </div>
        </div>
      </a>
    );
  }

  // IMAGE HEAVY
  if (variant === "image-heavy") {
    return (
      <a href={`/product/${product.id}`} className="block group">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative">
          {img ? (
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: `${theme.primaryColor}08` }} />
          )}
          {product.badge && (
            <span
              className="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="absolute top-3 end-3 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-red-500 shadow-lg">
              -{discount}%
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold mb-1.5 truncate">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-black" style={{ color: theme.primaryColor }}>
            {product.price} {product.currency || "ج.م"}
          </span>
          {product.oldPrice && (
            <span className="text-xs line-through opacity-50">{product.oldPrice}</span>
          )}
        </div>
      </a>
    );
  }

  // DEFAULT ELEVATED
  return (
    <a
      href={`/product/${product.id}`}
      className="block group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: hovered ? getCardShadow("dramatic") : getCardShadow("soft"),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: `${theme.primaryColor}08` }}
      >
        {img ? (
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs opacity-30">
            لا توجد صورة
          </div>
        )}

        {content.showBadge !== false && product.badge && (
          <span
            className="absolute top-3 start-3 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-md"
            style={{ backgroundColor: theme.secondaryColor }}
          >
            {product.badge}
          </span>
        )}

        {hasDiscount && !product.badge && (
          <span className="absolute top-3 start-3 px-2 py-1 rounded-lg text-[11px] font-bold text-white bg-red-500 shadow-md">
            -{discount}%
          </span>
        )}

        {content.showWishlist !== false && (
          <button
            className="absolute top-3 end-3 p-2 rounded-full bg-white/95 backdrop-blur shadow-md hover:bg-white transition-opacity"
            style={{
              color: theme.secondaryColor,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-8px)",
              transition: "all 0.3s",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={16} />
          </button>
        )}

        <button
          className="absolute bottom-3 end-3 p-2 rounded-full bg-white/95 backdrop-blur shadow-md"
          style={{
            color: theme.primaryColor,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.3s",
          }}
          onClick={(e) => e.preventDefault()}
        >
          <Eye size={16} />
        </button>
      </div>

      <div className="p-4 md:p-5">
        <h3
          className="text-sm md:text-base font-bold truncate mb-1.5"
          style={{ color: theme.textPrimaryColor }}
        >
          {product.name}
        </h3>

        {content.showRating !== false && product.rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                fill={i <= Math.round(product.rating) ? "#f59e0b" : "transparent"}
                color="#f59e0b"
              />
            ))}
            <span className="text-[11px] ms-1 opacity-60">({product.rating})</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex flex-col">
            <span className="text-lg font-black" style={{ color: theme.primaryColor }}>
              {product.price} {product.currency || "ج.م"}
            </span>
            {hasDiscount && (
              <span className="text-xs line-through opacity-50">
                {product.oldPrice} {product.currency || "ج.م"}
              </span>
            )}
          </div>

          {content.showQuickAdd !== false && (
            <button
              className="p-2.5 rounded-xl transition-all active:scale-90 hover:shadow-lg"
              style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
      </div>
    </a>
  );
}

// ============================================================
// HORIZONTAL CARD
// ============================================================
function HorizontalProductCard({ product, theme }) {
  const img = getImageUrl(product.image);
  return (
    <a
      href={`/product/${product.id}`}
      className="flex gap-4 p-4 rounded-2xl bg-white transition hover:shadow-lg"
      style={{ boxShadow: getCardShadow("soft") }}
    >
      <div
        className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0"
        style={{ backgroundColor: `${theme.primaryColor}08` }}
      >
        {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : null}
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-bold mb-1 truncate">{product.name}</h3>
          {product.description && (
            <p className="text-xs opacity-60 line-clamp-2 mb-2">{product.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black" style={{ color: theme.primaryColor }}>
            {product.price} {product.currency || "ج.م"}
          </span>
          <button
            className="px-4 py-2 rounded-lg text-xs font-bold text-white"
            style={{ backgroundColor: theme.primaryColor }}
            onClick={(e) => e.preventDefault()}
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </a>
  );
}

// ============================================================
// SERVICES
// ============================================================
export function ServicesRenderer({
  section,
  content = {},
  resolvedStyles,
  theme,
  device = "desktop",
}) {
  const items = content.items || [];

  // ⭐ عدد الأعمدة حسب الجهاز
  const getColumns = () => {
    if (device === "mobile") return Number(content.columnsMobile) || 1;
    if (device === "tablet") return Number(content.columnsTablet) || 2;
    return Number(content.columnsDesktop) || 3;
  };
  const cols = getColumns();

  const gridMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  const gridCls = gridMap[cols] || "grid-cols-3";

  // ⭐ حجم الأيقونة
  const iconSizeMap = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };
  const iconCls = iconSizeMap[content.iconSize] || iconSizeMap.md;

  // ⭐ حجم البطاقة
  const paddingMap = {
    compact: "p-4",
    normal: "p-6",
    spacious: "p-10",
  };
  const cardPadding = paddingMap[content.cardPadding] || paddingMap.normal;

  // ⭐ استدارة الحواف
  const radiusMap = {
    none: "0px",
    sm: "6px",
    md: "12px",
    lg: "20px",
    full: "9999px",
  };
  const cardRadius = radiusMap[content.borderRadius] || theme.radius || "12px";

  // ⭐ نمط البطاقة
  const getCardStyle = () => {
    const base = { borderRadius: cardRadius };
    switch (content.cardStyle) {
      case "outlined":
        return {
          ...base,
          border: `2px solid ${theme.primaryColor}20`,
          backgroundColor: "#fff",
          boxShadow: "none",
        };
      case "flat":
        return {
          ...base,
          backgroundColor: theme.surfaceColor || "#f9f9f9",
          boxShadow: "none",
        };
      case "glass":
        return {
          ...base,
          backgroundColor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        };
      case "elevated":
      default:
        return {
          ...base,
          backgroundColor: theme.surfaceColor || "#fff",
          boxShadow: getCardShadow(theme.shadow || "soft"),
        };
    }
  };
  const cardStyleObj = getCardStyle();

  // ⭐ محاذاة المحتوى
  const alignMap = {
    center: "text-center items-center",
    start: "text-start items-start",
    end: "text-end items-end",
  };
  const alignCls = alignMap[content.contentAlign] || alignMap.center;

  // ⭐ لون الأيقونة
  const iconColor = content.iconColor || theme.secondaryColor || "#8B5E3C";

  // ============ NUMBERED ============
  if (section.variant === "numbered") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-4xl font-black text-center mb-12">{content.title}</h2>
          <div className={`grid ${gridCls} gap-8`}>
            {items.map((s) => (
              <div key={s.id} className="text-center">
                <div className="text-5xl font-black mb-4" style={{ color: `${theme.primaryColor}30` }}>
                  {s.number}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                {content.showDescription !== false && (
                  <p className="text-sm opacity-70">{s.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============ ICON LIST ============
  if (section.variant === "icon-list") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-black mb-8">{content.title}</h2>
          <div className="space-y-5">
            {items.map((s) => (
              <div key={s.id} className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    backgroundColor: `${iconColor}15`,
                    color: iconColor,
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  {content.showDescription !== false && (
                    <p className="text-sm opacity-70">{s.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============ GRID CARDS (Default) ============
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          {content.title && (
            <h2 className="text-2xl lg:text-4xl font-black mb-3">{content.title}</h2>
          )}
          {content.subtitle && (
            <p className="text-sm lg:text-base opacity-70">{content.subtitle}</p>
          )}
        </div>

        <div className={`grid ${gridCls} gap-6`}>
          {items.map((s) => (
            <div
              key={s.id}
              className={`${cardPadding} flex flex-col ${alignCls} hover:-translate-y-1 transition-transform duration-300`}
              style={cardStyleObj}
            >
              <div className={`${iconCls} mb-5 leading-none`} style={{ color: iconColor }}>
                {s.icon}
              </div>

              <h3 className="text-lg font-bold mb-2">{s.title}</h3>

              {content.showDescription !== false && s.description && (
                <p className="text-sm opacity-70 leading-relaxed">{s.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
export function TestimonialsRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const items = content.items || [];
  const testimonialsCols =
    device === "mobile" ? "grid-cols-1" : device === "tablet" ? "grid-cols-2" : "grid-cols-3";

  if (section.variant === "single-featured" && items[0]) {
    const t = items[0];
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <div className="text-5xl mb-6 opacity-30">"</div>
          <p className="text-xl md:text-3xl mb-10 font-medium leading-relaxed">{t.text}</p>
          <div className="font-bold text-lg">{t.name}</div>
          <div className="text-sm opacity-70">{t.role}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {content.title && (
          <h2 className="text-2xl lg:text-4xl font-black text-center mb-12">{content.title}</h2>
        )}
        <div className={`grid ${testimonialsCols} gap-6`}>
          {items.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white hover:shadow-lg transition-shadow"
              style={{ boxShadow: getCardShadow("soft") }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i <= (t.rating || 5) ? "#f59e0b" : "#e5e7eb"}
                    color={i <= (t.rating || 5) ? "#f59e0b" : "#e5e7eb"}
                  />
                ))}
              </div>
              <p className="text-sm mb-6 leading-relaxed opacity-80">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full" style={{ backgroundColor: `${theme.primaryColor}15` }} />
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  {t.role && <div className="text-xs opacity-60">{t.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA
// ============================================================
export function CTARenderer({ section, content = {}, resolvedStyles, theme }) {
  if (section.variant === "with-form") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">{content.title}</h2>
          {content.subtitle && <p className="text-sm opacity-70 mb-6">{content.subtitle}</p>}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={content.placeholder || "بريدك"}
              className="flex-1 px-4 py-3 rounded-xl border"
            />
            <button
              className="px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {content.buttonText || "اشترك"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4">{content.title}</h2>
        {content.subtitle && <p className="text-base md:text-lg mb-8 opacity-80">{content.subtitle}</p>}
        {content.buttonText && (
          <a
            href={content.buttonLink || "#"}
            className="inline-block px-10 py-4 rounded-xl font-bold"
            style={{ backgroundColor: theme.secondaryColor || "#8B5E3C", color: "#fff" }}
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

export function NewsletterRenderer({ section, content = {}, resolvedStyles, theme }) {
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-3">{content.title}</h2>
        {content.subtitle && <p className="text-sm opacity-70 mb-6">{content.subtitle}</p>}
        <div className="flex gap-2">
          <input
            type="email"
            placeholder={content.placeholder || "بريدك"}
            className="flex-1 px-4 py-3 rounded-xl border"
          />
          <button
            className="px-6 py-3 rounded-xl font-bold text-white whitespace-nowrap"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {content.buttonText || "اشترك"}
          </button>
        </div>
      </div>
    </section>
  );
}

export function FAQRenderer({ section, content = {}, resolvedStyles, theme }) {
  const [open, setOpen] = useState(null);
  const items = content.items || [];

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-3xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-black text-center mb-12">{content.title}</h2>
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.id} className="border rounded-2xl bg-white overflow-hidden">
              <button
                onClick={() => setOpen(open === f.id ? null : f.id)}
                className="w-full p-5 flex items-center justify-between text-start hover:bg-neutral-50"
              >
                <span className="font-bold text-sm md:text-base">{f.question}</span>
                <span className="text-xl" style={{ color: theme.primaryColor }}>
                  {open === f.id ? "−" : "+"}
                </span>
              </button>
              {open === f.id && (
                <div className="px-5 pb-5 text-sm opacity-70 leading-relaxed">{f.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const items = content.items || [];
  const statsCols = device === "mobile" ? "grid-cols-2" : "grid-cols-4";

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className={`max-w-7xl mx-auto px-4 lg:px-8 grid ${statsCols} gap-6 text-center`}>
        {items.map((s) => (
          <div key={s.id}>
            <div className="text-3xl md:text-5xl font-black mb-2" style={{ color: theme.primaryColor }}>
              {s.value}
            </div>
            <div className="text-xs md:text-sm opacity-70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BrandsRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const items = content.items || [];
  const brandsCols =
    device === "mobile" ? "grid-cols-3" : device === "tablet" ? "grid-cols-4" : "grid-cols-6";

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {content.title && (
          <h2 className="text-xl font-bold text-center mb-8 opacity-70">{content.title}</h2>
        )}
        <div className={`grid ${brandsCols} gap-6 items-center opacity-70`}>
          {items.map((b) => (
            <div key={b.id} className="aspect-video flex items-center justify-center">
              {getImageUrl(b.logo) ? (
                <img src={getImageUrl(b.logo)} alt={b.name} className="max-h-12" />
              ) : (
                <span className="font-bold">{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const items = content.items || [];
  const teamCols =
    device === "mobile" ? "grid-cols-2" : device === "tablet" ? "grid-cols-3" : "grid-cols-4";

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-black text-center mb-12">{content.title}</h2>
        <div className={`grid ${teamCols} gap-6`}>
          {items.map((m) => (
            <div key={m.id} className="text-center">
              <div
                className="aspect-square rounded-2xl overflow-hidden mb-3"
                style={{ backgroundColor: `${theme.primaryColor}10` }}
              >
                {getImageUrl(m.image) && (
                  <img src={getImageUrl(m.image)} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <h3 className="font-bold text-sm">{m.name}</h3>
              <p className="text-xs opacity-60">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromotionalBannerRenderer({ section, content = {}, resolvedStyles, theme }) {
  const bg = getImageUrl(content.backgroundImage);
  return (
    <section className="w-full relative overflow-hidden" style={resolvedStyles}>
      {bg && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }} />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${content.overlayOpacity ?? 0.5})` }}
          />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-3">{content.title}</h2>
        {content.subtitle && <p className="text-base md:text-lg mb-6 opacity-85">{content.subtitle}</p>}
        {content.buttonText && (
          <a
            href={content.buttonLink || "#"}
            className="inline-block px-8 py-3.5 rounded-xl font-bold"
            style={{ backgroundColor: theme.secondaryColor || "#8B5E3C", color: "#fff" }}
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

export function AboutHeroRenderer({ section, content = {}, resolvedStyles, theme }) {
  const bg = getImageUrl(content.backgroundImage);
  return (
    <section className="w-full relative overflow-hidden" style={resolvedStyles}>
      {bg && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }} />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-3xl md:text-6xl font-black mb-4">{content.title}</h1>
        {content.subtitle && <p className="text-base md:text-xl opacity-85">{content.subtitle}</p>}
      </div>
    </section>
  );
}

export function StoryRenderer({ section, content = {}, resolvedStyles, theme }) {
  const img = getImageUrl(content.image);

  if (section.variant === "timeline") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-black mb-12">{content.title}</h2>
          <div className="space-y-8">
            {(content.events || []).map((e, i) => (
              <div key={i} className="flex gap-5">
                <div
                  className="font-black text-2xl shrink-0 w-20"
                  style={{ color: theme.primaryColor }}
                >
                  {e.year}
                </div>
                <div className="border-s-2 ps-5" style={{ borderColor: `${theme.primaryColor}30` }}>
                  <h3 className="font-bold text-lg mb-1">{e.title}</h3>
                  <p className="text-sm opacity-70">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-4xl font-black mb-6">{content.title}</h2>
          {(content.paragraphs || []).map((p, i) => (
            <p key={i} className="text-sm md:text-base leading-relaxed mb-4 opacity-80">
              {p}
            </p>
          ))}
        </div>
        {img && <img src={img} alt="" className="w-full h-auto rounded-3xl shadow-xl" />}
      </div>
    </section>
  );
}

export function ServicesHeroRenderer({ section, content = {}, resolvedStyles }) {
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-3xl md:text-6xl font-black mb-4">{content.title}</h1>
        {content.subtitle && <p className="text-base md:text-xl opacity-85">{content.subtitle}</p>}
      </div>
    </section>
  );
}

export function ServicesGridRenderer({ section, content = {}, resolvedStyles, theme, device }) {
  return (
    <ServicesRenderer
      section={section}
      content={content}
      resolvedStyles={resolvedStyles}
      theme={theme}
      device={device}
    />
  );
}
export function ContactRenderer({ section, content = {}, resolvedStyles, theme }) {
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl md:text-4xl font-black mb-4">{content.title}</h2>
          {content.subtitle && <p className="text-sm opacity-70 mb-6">{content.subtitle}</p>}
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-2">📞 {content.phone || "+20 100 000 0000"}</p>
            <p className="flex items-center gap-2">✉️ {content.email || "info@store.com"}</p>
            <p className="flex items-center gap-2">📍 {content.address || "القاهرة، مصر"}</p>
          </div>
        </div>
        {content.showForm !== false && (
          <form className="space-y-3">
            <input type="text" placeholder="الاسم" className="w-full px-4 py-3 rounded-xl border" />
            <input type="email" placeholder="البريد" className="w-full px-4 py-3 rounded-xl border" />
            <textarea placeholder="الرسالة" rows={5} className="w-full px-4 py-3 rounded-xl border" />
            <button
              className="px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              إرسال
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ============================================================
// FEATURE STRIP RENDERER
// ============================================================
export function FeatureStripRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const items = content.items || [];

  const getCols = () => {
    if (device === "mobile") return Number(content.columnsMobile) || 1;
    if (device === "tablet") return Number(content.columnsTablet) || 2;
    return Number(content.columnsDesktop) || 4;
  };
  const cols = getCols();
  const gridMap = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  const gridCls = gridMap[cols] || "grid-cols-4";

  const iconSizeMap = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" };
  const iconCls = iconSizeMap[content.iconSize] || iconSizeMap.md;

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className={`${content.fullWidth ? "" : "max-w-7xl mx-auto"} px-4 lg:px-8`}>
        <div className={`grid ${gridCls} gap-6`}>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className={`${iconCls} shrink-0`} style={{ color: theme.secondaryColor || "#8B5E3C" }}>
                {getIconEmoji(item.icon)}
              </div>
              <div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                {item.description && <p className="text-xs opacity-70">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CATEGORY TABS RENDERER
// ============================================================
export function CategoryTabsRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const items = content.items || [];

  const getCols = () => {
    if (device === "mobile") return Number(content.columnsMobile) || 2;
    if (device === "tablet") return Number(content.columnsTablet) || 3;
    return Number(content.columnsDesktop) || 5;
  };
  const cols = getCols();
  const gridMap = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6" };
  const gridCls = gridMap[cols] || "grid-cols-5";

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className={`grid ${gridCls} gap-4`}>
          {items.map((item) => (
            <a
              key={item.id}
              href="#"
              className="text-center p-4 rounded-xl hover:bg-black/5 transition"
            >
              <div className="text-3xl mb-2" style={{ color: theme.primaryColor }}>
                {getIconEmoji(item.icon)}
              </div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              {content.showDescription !== false && item.description && (
                <p className="text-xs opacity-70">{item.description}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE RENDERER
// ============================================================
export function MarqueeRenderer({ section, content = {}, resolvedStyles, theme }) {
  const items = content.items || [];
  const speedMap = { slow: "40s", normal: "25s", fast: "15s" };
  const speed = speedMap[content.speed] || "25s";

  return (
    <section className="w-full overflow-hidden" style={resolvedStyles}>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          animation: marqueeScroll ${speed} linear infinite;
          width: max-content;
        }
      `}</style>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 shrink-0">
            {item.image?.url && (
              <img src={item.image.url} alt="" className="w-8 h-8 rounded-full object-cover" />
            )}
            <span className="font-bold whitespace-nowrap">{item.text || item.alt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CONTACT FORM RENDERER
// ============================================================
export function ContactFormRenderer({ section, content = {}, resolvedStyles, theme }) {
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className={`grid grid-cols-1 ${content.centered ? "" : "md:grid-cols-2"} gap-12`}>
          {!content.centered && content.showInfo !== false && (
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-4">{content.title}</h2>
              {content.subtitle && <p className="text-sm opacity-70 mb-6">{content.subtitle}</p>}
              <div className="space-y-4 text-sm">
                {content.phone && <p>📞 {content.phone}</p>}
                {content.email && <p>✉️ {content.email}</p>}
                {content.address && <p>📍 {content.address}</p>}
              </div>
            </div>
          )}
          <form className={`space-y-3 ${content.centered ? "max-w-xl mx-auto" : ""}`}>
            {content.centered && (
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black mb-2">{content.title}</h2>
                {content.subtitle && <p className="text-sm opacity-70">{content.subtitle}</p>}
              </div>
            )}
            {(content.fields || []).map((field) => (
              <div key={field}>
                {field === "message" ? (
                  <textarea
                    placeholder="الرسالة"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#0A2947]"
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    placeholder={
                      field === "name" ? "الاسم" :
                      field === "email" ? "البريد الإلكتروني" :
                      field === "phone" ? "رقم الهاتف" : field
                    }
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#0A2947]"
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              className="w-full px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {content.buttonText || "إرسال"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ⭐ Helper: يحوّل اسم الأيقونة لإيموجي
function getIconEmoji(icon) {
  const map = {
    truck: "🚚", shield: "🛡️", gift: "🎁", droplet: "💧",
    wrench: "🔧", package: "📦", rotate: "🔄", user: "👤",
    users: "👥", layers: "📚", crown: "👑", star: "⭐",
    heart: "❤️", check: "✅", phone: "📞", mail: "✉️",
    map: "📍", clock: "⏰", zap: "⚡", award: "🏆",
  };
  return map[icon] || icon || "✨";
}