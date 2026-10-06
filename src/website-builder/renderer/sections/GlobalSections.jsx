import React, { useState } from "react";
import {
  Search, User, ShoppingCart, Menu, X, Heart, Phone, Mail,
  MapPin,
} from "lucide-react";
import { getImageUrl } from "../../../utils/styles";

// ============================================================
// MAIN DISPATCHER
// ============================================================
export default function NavbarRenderer(props) {
  const { section } = props;
  if (section.type === "footer") return <FooterRenderer {...props} />;
  if (section.type === "announcementBar") return <AnnouncementRenderer {...props} />;
  return <NavbarOnlyRenderer {...props} />;
}

// ============================================================
// NAVBAR — Responsive حسب الـ device prop
// ============================================================
function NavbarOnlyRenderer({ section, content = {}, theme, device = "desktop" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const variant = section.variant;
  const logo = getImageUrl(content.logo);
  const links = content.links || [];
  const cartCount = content.cartCount ?? 0;
  const wishlistCount = content.wishlistCount ?? 0;

  // ⭐ الحالة الأساسية للجهاز
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const isDesktop = device === "desktop";

  const bg = content.backgroundColor || theme.surfaceColor || "#ffffff";
  const fg = content.textColor || theme.textPrimaryColor || "#0A2947";
  const borderBottom =
    content.borderBottom !== false ? `1px solid ${theme.primaryColor}12` : "none";

  const baseStyle = {
    backgroundColor: bg,
    color: fg,
    borderBottom,
    position: content.sticky ? "sticky" : "relative",
    top: 0,
    zIndex: 50,
  };

  // ⭐ عرض الـ links: على desktop بس
  const showFullLinks = isDesktop;
  // ⭐ عرض hamburger: على mobile + tablet
  const showHamburger = isMobile || isTablet;
  // ⭐ عرض الـ inline search: على desktop بس
  const showInlineSearch = isDesktop && content.searchInline;

  // ============ CENTERED ============
  if (variant === "centered") {
    return (
      <nav style={baseStyle}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Desktop: grid-cols-3 */}
          {isDesktop && (
            <div className="grid grid-cols-3 items-center h-20">
              <div className="flex items-center gap-6">
                {links.slice(0, 2).map((l, i) => (
                  <NavLink key={i} label={l.label} href={l.href} color={fg} />
                ))}
              </div>
              <div className="text-center">
                <LogoBlock logo={logo} title={content.title} color={fg} />
              </div>
              <div className="flex items-center justify-end gap-1">
                <IconSet
                  content={content}
                  cartCount={cartCount}
                  wishlistCount={wishlistCount}
                  color={fg}
                  secondary={theme.secondaryColor}
                />
              </div>
            </div>
          )}

          {/* Mobile/Tablet: bar + hamburger */}
          {showHamburger && (
            <NavBarMobile
              open={mobileOpen}
              setOpen={setMobileOpen}
              logo={logo}
              title={content.title}
              color={fg}
              cartCount={cartCount}
              wishlistCount={wishlistCount}
              secondary={theme.secondaryColor}
            />
          )}
        </div>

        {mobileOpen && showHamburger && <MobileMenu links={links} color={fg} />}
      </nav>
    );
  }

  // ============ MINIMAL ============
  if (variant === "minimal") {
    return (
      <nav style={baseStyle}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <LogoBlock logo={logo} title={content.title} color={fg} size="sm" />

          {showFullLinks && (
            <div className="flex items-center gap-7">
              {links.map((l, i) => (
                <NavLink key={i} label={l.label} href={l.href} color={fg} />
              ))}
            </div>
          )}

          <div className="flex items-center gap-1">
            {showHamburger && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg"
                style={{ color: fg }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
            {content.showCart !== false && (
              <CartIcon count={cartCount} color={fg} secondary={theme.secondaryColor} />
            )}
          </div>
        </div>

        {mobileOpen && showHamburger && <MobileMenu links={links} color={fg} />}
      </nav>
    );
  }

  // ============ DARK PREMIUM ============
  if (variant === "dark-premium") {
    const darkBg = content.backgroundColor || "#0d0d0d";
    const goldFg = content.textColor || "#c5a880";

    return (
      <nav
        style={{
          ...baseStyle,
          backgroundColor: darkBg,
          color: goldFg,
          borderBottom: `1px solid ${goldFg}30`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <LogoBlock logo={logo} title={content.title} color={goldFg} size="lg" tracking />

          {showFullLinks && (
            <div className="flex items-center gap-10">
              {links.map((l, i) => (
                <NavLink key={i} label={l.label} href={l.href} color={goldFg} tracking />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            {showHamburger && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg"
                style={{ color: goldFg }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
            {isDesktop && content.showSearch && (
              <IconBtn color={goldFg}>
                <Search size={18} />
              </IconBtn>
            )}
            {isDesktop && content.showUser && (
              <IconBtn color={goldFg}>
                <User size={18} />
              </IconBtn>
            )}
            {content.showCart && (
              <CartIcon count={cartCount} color={goldFg} secondary="#c5a880" />
            )}
          </div>
        </div>

        {mobileOpen && showHamburger && (
          <MobileMenu links={links} color={goldFg} />
        )}
      </nav>
    );
  }

  // ============ ECOMMERCE FULL ============
  if (variant === "ecommerce-full") {
    return (
      <nav style={baseStyle}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 h-20">
            {/* Hamburger (mobile + tablet) */}
            {showHamburger && (
              <button
                className="p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: fg }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}

            {/* Logo */}
            <LogoBlock logo={logo} title={content.title} color={fg} />

            {/* Links — Desktop فقط */}
            {showFullLinks && (
              <div className="flex items-center gap-1 font-semibold text-sm">
                {links.map((l, i) => (
                  <NavLink key={i} label={l.label} href={l.href} color={fg} />
                ))}
              </div>
            )}

            {/* Inline search — Desktop فقط */}
            {showInlineSearch && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-md"
                style={{ backgroundColor: `${fg}08` }}
              >
                <Search size={16} style={{ color: fg, opacity: 0.5 }} />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: fg }}
                />
              </div>
            )}

            {/* Icons */}
            <div className="flex items-center gap-1 ms-auto">
              {/* Search icon — Mobile فقط */}
              {isMobile && (
                <IconBtn color={fg}>
                  <Search size={18} />
                </IconBtn>
              )}
              {content.showWishlist && (
                <IconBtnWithBadge
                  count={wishlistCount}
                  color={fg}
                  secondary={theme.secondaryColor}
                >
                  <Heart size={18} />
                </IconBtnWithBadge>
              )}
              {content.showUser && (
                <IconBtn color={fg}>
                  <User size={18} />
                </IconBtn>
              )}
              {content.showCart && (
                <IconBtnWithBadge
                  count={cartCount}
                  color={fg}
                  secondary={theme.secondaryColor}
                >
                  <ShoppingCart size={18} />
                </IconBtnWithBadge>
              )}
            </div>
          </div>
        </div>

        {mobileOpen && showHamburger && <MobileMenu links={links} color={fg} />}
      </nav>
    );
  }

  // ============ CLASSIC (default) ============
  return (
    <nav style={baseStyle}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            {showHamburger && (
              <button
                className="p-2 -ms-2 rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: fg }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
            <LogoBlock logo={logo} title={content.title} color={fg} />
          </div>

          {/* Center: links (Desktop only) */}
          {showFullLinks && (
            <div className="flex items-center gap-1 font-semibold text-sm">
              {links.map((l, i) => (
                <NavLink key={i} label={l.label} href={l.href} color={fg} />
              ))}
            </div>
          )}

          {/* Right: icons */}
          <div className="flex items-center gap-1">
            {content.showSearch && (
              <IconBtn color={fg}>
                <Search size={18} />
              </IconBtn>
            )}
            {isDesktop && content.showUser && (
              <IconBtn color={fg}>
                <User size={18} />
              </IconBtn>
            )}
            {content.showCart && (
              <IconBtnWithBadge
                count={cartCount}
                color={fg}
                secondary={theme.secondaryColor}
              >
                <ShoppingCart size={18} />
              </IconBtnWithBadge>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && showHamburger && <MobileMenu links={links} color={fg} />}
    </nav>
  );
}

// ============================================================
// NAVBAR HELPERS
// ============================================================
function NavLink({ label, href = "#", color, tracking }) {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-lg hover:bg-black/5 transition-colors ${
        tracking ? "tracking-widest" : ""
      }`}
      style={{ color }}
    >
      {label}
    </a>
  );
}

function LogoBlock({ logo, title = "متجري", color, size = "md", tracking }) {
  const sizeClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-lg" : "text-xl";
  const imgH = size === "lg" ? "h-12" : size === "sm" ? "h-8" : "h-10";

  if (logo) {
    return <img src={logo} alt={title} className={`${imgH} w-auto object-contain`} />;
  }
  return (
    <span
      className={`${sizeClass} font-black ${tracking ? "tracking-[0.3em]" : ""}`}
      style={{ color }}
    >
      {title}
    </span>
  );
}

function IconBtn({ color, children }) {
  return (
    <button
      className="p-2 rounded-lg hover:bg-black/5 transition-colors"
      style={{ color }}
    >
      {children}
    </button>
  );
}

function IconBtnWithBadge({ count = 0, color, secondary, children }) {
  return (
    <button
      className="relative p-2 rounded-lg hover:bg-black/5 transition-colors"
      style={{ color }}
    >
      {children}
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: secondary || "#8B5E3C" }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

function CartIcon({ count = 0, color, secondary }) {
  return (
    <IconBtnWithBadge count={count} color={color} secondary={secondary}>
      <ShoppingCart size={18} />
    </IconBtnWithBadge>
  );
}

function IconSet({ content, cartCount, wishlistCount, color, secondary }) {
  return (
    <>
      {content.showSearch && (
        <IconBtn color={color}>
          <Search size={18} />
        </IconBtn>
      )}
      {content.showWishlist && (
        <IconBtnWithBadge count={wishlistCount} color={color} secondary={secondary}>
          <Heart size={18} />
        </IconBtnWithBadge>
      )}
      {content.showUser && (
        <IconBtn color={color}>
          <User size={18} />
        </IconBtn>
      )}
      {content.showCart && (
        <IconBtnWithBadge count={cartCount} color={color} secondary={secondary}>
          <ShoppingCart size={18} />
        </IconBtnWithBadge>
      )}
    </>
  );
}

// ⭐ Navbar Mobile Bar
function NavBarMobile({ open, setOpen, logo, title, color, cartCount, wishlistCount, secondary }) {
  return (
    <div className="flex items-center justify-between h-16">
      <button onClick={() => setOpen(!open)} style={{ color }}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <LogoBlock logo={logo} title={title} color={color} />
      <div className="flex items-center gap-1">
        {wishlistCount > 0 && (
          <IconBtnWithBadge count={wishlistCount} color={color} secondary={secondary}>
            <Heart size={18} />
          </IconBtnWithBadge>
        )}
        <IconBtnWithBadge count={cartCount} color={color} secondary={secondary}>
          <ShoppingCart size={18} />
        </IconBtnWithBadge>
      </div>
    </div>
  );
}

function MobileMenu({ links, color }) {
  return (
    <div className="border-t" style={{ borderColor: `${color}15` }}>
      <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
        {links.map((l, i) => (
          <a
            key={i}
            href={l.href || "#"}
            className="block py-2.5 px-3 rounded-lg hover:bg-black/5 font-semibold"
            style={{ color }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ANNOUNCEMENT BAR
// ============================================================
function AnnouncementRenderer({ section, content = {}, resolvedStyles }) {
  const variant = section.variant;

  if (variant === "countdown") {
    return (
      <div className="w-full py-2.5 px-4 text-center text-sm font-bold" style={resolvedStyles}>
        {content.text || "ينتهي العرض"}{" "}
        <span className="font-mono bg-black/20 px-2 py-0.5 rounded">
          {String(content.hours || 24).padStart(2, "0")}:00:00
        </span>
      </div>
    );
  }

  if (variant === "two-tone") {
    return (
      <div
        className="w-full py-2.5 px-4 flex items-center justify-center gap-4 text-sm"
        style={resolvedStyles}
      >
        <span>{content.text}</span>
        {content.ctaText && (
          <a href={content.ctaLink || "#"} className="font-bold underline">
            {content.ctaText}
          </a>
        )}
      </div>
    );
  }

  if (variant === "marquee") {
    return (
      <div className="w-full py-2.5 overflow-hidden text-sm font-bold" style={resolvedStyles}>
        <div className="whitespace-nowrap animate-marquee">{content.text}</div>
        <style>{`
          @keyframes marquee { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
          .animate-marquee{display:inline-block;animation:marquee 18s linear infinite;}
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full py-2.5 px-4 text-center text-sm font-medium" style={resolvedStyles}>
      {content.text}
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function FooterRenderer({ section, content = {}, resolvedStyles, theme, device = "desktop" }) {
  const variant = section.variant;
  const logo = getImageUrl(content.logo);
  const social = content.social || {};

  const isMobile = device === "mobile";
  const isDesktop = device === "desktop";

  const socialLinks = [
    social.facebook && { label: "Facebook", href: social.facebook },
    social.instagram && { label: "Instagram", href: social.instagram },
    social.twitter && { label: "Twitter", href: social.twitter },
    social.whatsapp && { label: "WhatsApp", href: `https://wa.me/${social.whatsapp}` },
  ].filter(Boolean);

  // ⭐ أعمدة الفوتر حسب الجهاز
  const footerCols = isMobile
    ? "grid-cols-1"
    : device === "tablet"
    ? "grid-cols-2"
    : "grid-cols-4";

  if (variant === "minimal") {
    return (
      <footer className="w-full py-6 px-6 border-t" style={resolvedStyles}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-sm">{content.copyright || "© 2026"}</span>
          <div className="flex gap-5 text-sm">
            {(content.links || []).map((l, i) => (
              <a key={i} href={l.href || "#"} className="hover:opacity-70">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full pt-14 pb-6 px-6" style={resolvedStyles}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${footerCols} gap-10 mb-12`}>
          <div className={isDesktop ? "col-span-2" : ""}>
            {logo ? (
              <img src={logo} alt="" className="h-10 mb-4" />
            ) : (
              <h3 className="text-xl font-black mb-3">{content.title || "متجري"}</h3>
            )}
            {content.description && (
              <p className="text-sm opacity-75 leading-relaxed max-w-sm mb-5">
                {content.description}
              </p>
            )}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border border-current/20 hover:opacity-70"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {(content.columns || []).map((col, i) => (
            <div key={i}>
              <h4 className="font-bold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5 text-sm opacity-75">
                {(col.links || []).map((l, j) => (
                  <li key={j}>
                    <a href={l.href || "#"} className="hover:opacity-100 transition">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(content.phone || content.email || content.address) && (
            <div>
              <h4 className="font-bold mb-4 text-sm">تواصل معنا</h4>
              <ul className="space-y-3 text-sm opacity-75">
                {content.phone && (
                  <li className="flex items-center gap-2">
                    <Phone size={14} /> {content.phone}
                  </li>
                )}
                {content.email && (
                  <li className="flex items-center gap-2">
                    <Mail size={14} /> {content.email}
                  </li>
                )}
                {content.address && (
                  <li className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5" /> {content.address}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {content.showNewsletter && (
          <div
            className="mb-10 p-6 rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="max-w-md mx-auto text-center">
              <h4 className="font-bold mb-3">اشترك في نشرتنا البريدية</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm text-black"
                />
                <button
                  className="px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap"
                  style={{ backgroundColor: theme.secondaryColor || "#8B5E3C", color: "#fff" }}
                >
                  اشترك
                </button>
              </div>
            </div>
          </div>
        )}

        {content.showPayments && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 opacity-70">
            {(content.paymentMethods || []).map((m) => (
              <div key={m} className="px-4 py-2 border rounded-lg text-xs uppercase font-bold">
                {m}
              </div>
            ))}
          </div>
        )}

        <div
          className="border-t pt-5 text-center text-xs opacity-60"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          {content.copyright || "© 2026 جميع الحقوق محفوظة"}
        </div>
      </div>
    </footer>
  );
}