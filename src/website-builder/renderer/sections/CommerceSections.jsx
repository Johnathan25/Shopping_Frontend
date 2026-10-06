import React, { useState } from "react";
import {
  Search, Filter, ShoppingBag, Plus, Minus, Trash2,
  Star, Truck, Shield, Package, ChevronDown,
} from "lucide-react";
import { getImageUrl, getCardShadow } from "../../../utils/styles";

/* ============ SEARCH ============ */
export function SearchRenderer({ section, content = {}, resolvedStyles, theme }) {
  const [query, setQuery] = useState("");
  const variant = section.variant;

  if (variant === "large-centered") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-6">{content.title || "ابحث عن منتج"}</h2>
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
            <Search size={22} className="ms-3 opacity-40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={content.placeholder || "ابحث..."}
              className="flex-1 bg-transparent outline-none text-base py-3"
            />
            <button className="px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: theme.primaryColor }}>
              {content.buttonText || "بحث"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
          <Search size={18} className="ms-3 opacity-40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.placeholder || "ابحث..."}
            className="flex-1 bg-transparent outline-none text-sm py-2.5"
          />
          <button className="px-4 py-2.5 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: theme.primaryColor }}>
            {content.buttonText || "بحث"}
          </button>
        </div>
        {content.showCategories && content.categories && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {content.categories.map((c) => (
              <button key={c} className="px-3 py-1 rounded-full text-xs font-bold border" style={{ borderColor: `${theme.primaryColor}20` }}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ============ FILTERS ============ */
export function FiltersRenderer({ section, content = {}, resolvedStyles, theme }) {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCats, setSelectedCats] = useState([]);

  return (
    <aside className="w-full" style={resolvedStyles}>
      <div className="space-y-6">
        {content.categories !== false && (
          <div>
            <h3 className="font-bold mb-3 text-sm">الأقسام</h3>
            <div className="space-y-2">
              {["إلكترونيات", "أزياء", "منزل", "جمال"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(c)}
                    onChange={(e) => {
                      setSelectedCats(prev =>
                        e.target.checked ? [...prev, c] : prev.filter(x => x !== c)
                      );
                    }}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {content.price !== false && (
          <div>
            <h3 className="font-bold mb-3 text-sm">السعر</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full px-2 py-1.5 rounded border text-sm"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full px-2 py-1.5 rounded border text-sm"
              />
            </div>
          </div>
        )}

        {content.rating !== false && (
          <div>
            <h3 className="font-bold mb-3 text-sm">التقييم</h3>
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="rating" />
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: r }).map((_, i) => (
                      <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                    ))}
                    <span className="ms-1">& up</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ============ CART ============ */
export function CartRenderer({ section, content = {}, resolvedStyles, theme, cartItems = [] }) {
  const items = cartItems.length ? cartItems : (content.items || []);
  const subtotal = items.reduce((s, i) => s + (i.price * (i.qty || 1)), 0);
  const shipping = subtotal > 500 ? 0 : 30;
  const total = subtotal + shipping;

  const variant = section.variant;

  if (variant === "drawer") {
    return (
      <aside className="fixed inset-y-0 end-0 w-96 bg-white shadow-2xl p-6 overflow-y-auto z-40">
        <h2 className="font-black text-xl mb-6">{content.title || "سلة التسوق"}</h2>
        <CartBody items={items} content={content} theme={theme} subtotal={subtotal} shipping={shipping} total={total} />
      </aside>
    );
  }

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black mb-8">{content.title || "سلة التسوق"}</h2>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-bold opacity-60">{content.emptyText || "سلتك فارغة"}</p>
          </div>
        ) : variant === "full-width" ? (
          <CartBody items={items} content={content} theme={theme} subtotal={subtotal} shipping={shipping} total={total} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CartBody items={items} content={content} theme={theme} subtotal={subtotal} shipping={shipping} total={total} hideSummary />
            </div>
            <div className="p-6 rounded-2xl h-fit sticky top-4 bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
              <h3 className="font-black mb-4">ملخص الطلب</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span>المجموع الفرعي</span><span>{subtotal} ج.م</span></div>
                <div className="flex justify-between"><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span></div>
              </div>
              <div className="border-t pt-3 mb-4 flex justify-between font-black">
                <span>الإجمالي</span>
                <span style={{ color: theme.primaryColor }}>{total} ج.م</span>
              </div>
              <button className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ backgroundColor: theme.primaryColor }}>
                {content.checkoutText || "إتمام الشراء"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CartBody({ items, content, theme, subtotal, shipping, total, hideSummary }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white items-center" style={{ boxShadow: getCardShadow(theme.shadow) }}>
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
            {getImageUrl(item.image) && <img src={getImageUrl(item.image)} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1 truncate">{item.name}</h3>
            <span className="text-sm font-black" style={{ color: theme.primaryColor }}>
              {item.price} ج.م
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-bold">{item.qty || 1}</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
              <Plus size={14} />
            </button>
          </div>
          <button className="p-2 text-red-500 hover:bg-red-50 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ============ CHECKOUT ============ */
export function CheckoutRenderer({ section, content = {}, resolvedStyles, theme }) {
  const [step, setStep] = useState(1);

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black mb-8">{content.title || "إتمام الشراء"}</h2>

        {content.showProgress && (
          <div className="flex items-center justify-between mb-10">
            {["الشحن", "الدفع", "التأكيد"].map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: i + 1 <= step ? theme.primaryColor : "#e5e7eb",
                    color: i + 1 <= step ? "#fff" : "#6b7280",
                  }}
                >
                  {i + 1}
                </div>
                {i < 2 && <div className="flex-1 h-0.5" style={{ backgroundColor: i + 1 < step ? theme.primaryColor : "#e5e7eb" }} />}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
              <h3 className="font-bold mb-4">معلومات الشحن</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input placeholder="الاسم الكامل" className="px-3 py-2.5 rounded-lg border text-sm" />
                <input placeholder="رقم الهاتف" className="px-3 py-2.5 rounded-lg border text-sm" />
                <input placeholder="المدينة" className="px-3 py-2.5 rounded-lg border text-sm" />
                <input placeholder="العنوان" className="px-3 py-2.5 rounded-lg border text-sm md:col-span-2" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
              <h3 className="font-bold mb-4">طريقة الدفع</h3>
              <div className="space-y-2">
                {["الدفع عند الاستلام", "بطاقة ائتمان", "محفظة إلكترونية"].map((m, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-neutral-50">
                    <input type="radio" name="payment" />
                    <span className="text-sm">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl h-fit bg-white sticky top-4" style={{ boxShadow: getCardShadow(theme.shadow) }}>
            <h3 className="font-black mb-4">ملخص الطلب</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span>المجموع</span><span>0 ج.م</span></div>
              <div className="flex justify-between"><span>الشحن</span><span>0 ج.م</span></div>
            </div>
            <button className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ backgroundColor: theme.primaryColor }}>
              إتمام الطلب
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ MY ORDERS ============ */
export function MyOrdersRenderer({ section, content = {}, resolvedStyles, theme, orders = [] }) {
  const items = orders || content.items || [];
  const variant = section.variant;

  if (items.length === 0) {
    return (
      <section className="w-full text-center" style={resolvedStyles}>
        <Package size={64} className="mx-auto mb-4 opacity-20" />
        <p className="text-lg font-bold opacity-60">{content.emptyText || "لا توجد طلبات"}</p>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black mb-8">{content.title || "طلباتي"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((o) => (
              <div key={o.id} className="p-5 rounded-2xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs opacity-60">#{o.id}</span>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                    {o.status}
                  </span>
                </div>
                <div className="text-lg font-black mb-2">{o.total} ج.م</div>
                <div className="text-xs opacity-60 mb-3">{o.date}</div>
                {content.showReorder && (
                  <button className="w-full py-2 rounded-lg text-xs font-bold" style={{ backgroundColor: theme.primaryColor, color: "#fff" }}>
                    إعادة الطلب
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-black mb-8">{content.title || "طلباتي"}</h2>
        <div className="space-y-3">
          {items.map((o) => (
            <div key={o.id} className="p-5 rounded-2xl bg-white flex items-center justify-between" style={{ boxShadow: getCardShadow(theme.shadow) }}>
              <div>
                <span className="font-mono text-xs opacity-60">#{o.id}</span>
                <div className="font-bold mt-1">{o.total} ج.م</div>
              </div>
              <div className="text-sm opacity-60">{o.date}</div>
              <span className="text-xs px-3 py-1.5 rounded-full font-bold" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                {o.status}
              </span>
              <button className="text-xs font-bold" style={{ color: theme.primaryColor }}>التفاصيل</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PRODUCT DETAILS ============ */
export function ProductDetailsRenderer({ section, content = {}, resolvedStyles, theme, currentProduct }) {
  const product = currentProduct || content.product || {
    id: "demo",
    name: "ساعة يد كلاسيكية",
    price: 450,
    oldPrice: 600,
    currency: "ج.م",
    rating: 4.5,
    reviewCount: 128,
    description: "ساعة أنيقة بتصميم كلاسيكي مع حركة دقيقة.",
    images: [],
    inStock: true,
    variants: [],
  };

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const images = product.images?.length ? product.images : (getImageUrl(product.image) ? [product.image] : []);
  const mainImg = getImageUrl(images[activeImg]);

  const galleryPosition = content.galleryPosition || section.variant?.includes("right") ? "right" : "left";

  const isRight = galleryPosition === "right";

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 ${isRight ? "md:[direction:rtl]" : ""}`}>
          <div style={{ direction: "rtl" }}>
            <div className="aspect-square rounded-3xl overflow-hidden mb-4 bg-neutral-100" style={{ boxShadow: getCardShadow(theme.shadow) }}>
              {mainImg ? (
                <img src={mainImg} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs opacity-30">لا توجد صورة</div>
              )}
            </div>
            {content.showThumbnails !== false && images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="aspect-square rounded-xl overflow-hidden"
                    style={{
                      border: activeImg === i ? `2px solid ${theme.secondaryColor}` : "2px solid transparent",
                      opacity: activeImg === i ? 1 : 0.6,
                    }}
                  >
                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black mb-3" style={{ color: theme.textPrimaryColor }}>
              {product.name}
            </h1>

            {content.showRating !== false && product.rating !== undefined && (
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill={i <= Math.round(product.rating) ? "#f59e0b" : "transparent"} color="#f59e0b" />
                ))}
                <span className="text-xs opacity-60">({product.rating}) • {product.reviewCount || 0} تقييم</span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black" style={{ color: theme.primaryColor }}>
                {product.price} {product.currency || "ج.م"}
              </span>
              {product.oldPrice && (
                <span className="text-lg line-through opacity-50">{product.oldPrice} {product.currency || "ج.م"}</span>
              )}
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed opacity-80 mb-6">{product.description}</p>
            )}

            {content.showVariants !== false && product.variants?.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-bold mb-2">الخيارات:</div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className="px-4 py-2 rounded-lg border text-sm"
                      style={{
                        borderColor: selectedVariant === v.id ? theme.primaryColor : "#e5e7eb",
                        backgroundColor: selectedVariant === v.id ? `${theme.primaryColor}10` : "transparent",
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {content.showQuantity !== false && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-bold">الكمية:</span>
                <div className="flex items-center gap-2 border rounded-xl px-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 font-bold">−</button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-8 h-8 font-bold">+</button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {content.showAddToCart !== false && (
                <button
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <ShoppingBag size={16} /> أضف للسلة
                </button>
              )}
              {content.showBuyNow !== false && (
                <button
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2"
                  style={{ borderColor: theme.secondaryColor, color: theme.secondaryColor }}
                >
                  اشتري الآن
                </button>
              )}
            </div>

            {content.showFeatures !== false && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedProductsRenderer({ section, content = {}, resolvedStyles, theme, products = [] }) {
  const items = products.slice(0, content.limit || 4);
  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-black mb-8">{content.title || "منتجات مشابهة"}</h2>
        <div className={`grid grid-cols-2 md:grid-cols-${content.columns || 4} gap-4`}>
          {items.map((p) => (
            <ProductCardMini key={p.id} product={p} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCardMini({ product, theme }) {
  const img = getImageUrl(product.image);
  return (
    <a href={`/product/${product.id}`} className="block group">
      <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-neutral-100">
        {img && <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />}
      </div>
      <h3 className="text-sm font-bold truncate">{product.name}</h3>
      <span className="text-base font-black" style={{ color: theme.primaryColor }}>
        {product.price} ج.م
      </span>
    </a>
  );
}

export function ReviewsRenderer({ section, content = {}, resolvedStyles, theme }) {
  const reviews = content.items || [
    { id: "r1", name: "أحمد", rating: 5, text: "منتج رائع", date: "2026-01-01" },
    { id: "r2", name: "سارة", rating: 4, text: "جيد جداً", date: "2026-01-05" },
  ];

  return (
    <section className="w-full" style={resolvedStyles}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black mb-8">{content.title || "التقييمات"}</h2>
        {content.showSummary && (
          <div className="p-6 rounded-2xl bg-white mb-6" style={{ boxShadow: getCardShadow(theme.shadow) }}>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black" style={{ color: theme.primaryColor }}>4.5</div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <div className="text-xs opacity-60">بناءً على 128 تقييم</div>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: `${theme.primaryColor}15` }} />
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={10} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                </div>
                <span className="text-xs opacity-50 ms-auto">{r.date}</span>
              </div>
              <p className="text-sm opacity-80">{r.text}</p>
            </div>
          ))}
        </div>
        {content.showForm && (
          <div className="mt-6 p-6 rounded-2xl bg-white" style={{ boxShadow: getCardShadow(theme.shadow) }}>
            <h3 className="font-bold mb-3">أضف تقييمك</h3>
            <textarea placeholder="تجربتك مع المنتج..." rows={4} className="w-full px-3 py-2 rounded-lg border text-sm mb-3" />
            <button className="px-5 py-2.5 rounded-lg font-bold text-sm text-white" style={{ backgroundColor: theme.primaryColor }}>
              نشر التقييم
            </button>
          </div>
        )}
      </div>
    </section>
  );
}