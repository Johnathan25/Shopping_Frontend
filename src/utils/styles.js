// ============================================================
// STYLE RESOLVER
// ============================================================
export const resolveSectionStyles = (style = {}, responsive = {}, device = "desktop", theme = {}) => {
  const overrides = responsive?.[device] || {};
  const merged = { ...style, ...overrides };

  const shadowMap = {
    flat: "none",
    soft: "0 2px 8px rgba(10,41,71,0.06)",
    dramatic: "0 12px 32px rgba(10,41,71,0.18)",
    glow: `0 0 24px ${theme.primaryColor || "#0A2947"}33`,
  };

  return {
    color: merged.color || "inherit",
    backgroundColor: merged.backgroundColor || "transparent",
    backgroundImage: merged.backgroundImage ? `url(${merged.backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: merged.opacity ?? 1,
    borderWidth: merged.border?.width || "0px",
    borderStyle: merged.border?.type || "none",
    borderColor: merged.border?.color || "transparent",
    borderRadius: merged.border?.radius || "0px",
    boxShadow: shadowMap[merged.shadow] || "none",
    marginTop: merged.spacing?.margin?.top,
    marginRight: merged.spacing?.margin?.right,
    marginBottom: merged.spacing?.margin?.bottom,
    marginLeft: merged.spacing?.margin?.left,
    paddingTop: merged.spacing?.padding?.top,
    paddingRight: merged.spacing?.padding?.right,
    paddingBottom: merged.spacing?.padding?.bottom,
    paddingLeft: merged.spacing?.padding?.left,
    fontSize: merged.text?.fontSize,
    fontWeight: merged.text?.fontWeight,
    lineHeight: merged.text?.lineHeight,
    textAlign: merged.text?.textAlign,
  };
};

// ============================================================
// RESPONSIVE GRID HELPER (للمنتجات والأقسام)
// ============================================================
/**
 * Returns Tailwind classes for a responsive grid
 * @param {number} desktop - columns on desktop
 * @param {number} tablet  - columns on tablet
 * @param {number} mobile  - columns on mobile
 */
// ============================================================
// RESPONSIVE GRID — باستخدام @container queries
// ============================================================
export const getResponsiveGrid = (desktop = 4, tablet = 2, mobile = 1) => {
  const map = {
    1: "grid-cols-1",
    2: "grid-cols-1 @md:grid-cols-2",
    3: "grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3",
    4: "grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4",
    5: "grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-5",
    6: "grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @4xl:grid-cols-6",
  };
  return map[desktop] || map[4];
};

/**
 * Replaces Tailwind "grid-cols-X" with responsive safe class
 * Use this when columns come from data.
 */
export const responsiveGridStyle = (desktopCols = 4) => {
  // We use CSS variables for true dynamic responsive
  return {
    display: "grid",
    gridTemplateColumns: `repeat(1, minmax(0, 1fr))`,
    gap: "1rem",
    // Override in media queries
  };
};

// ============================================================
// CARD SHADOW
// ============================================================
export const getCardShadow = (key = "soft") =>
  ({
    flat: "none",
    soft: "0 2px 8px rgba(10,41,71,0.06)",
    dramatic: "0 12px 32px rgba(10,41,71,0.18)",
  }[key] || "0 2px 8px rgba(10,41,71,0.06)");

// ============================================================
// IMAGE URL HELPER
// ============================================================
export const getImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img || null;
  if (typeof img === "object" && img.url) return img.url;
  return null;
};

// ============================================================
// CONTRAST HELPER (auto text color based on bg)
// ============================================================
export const getContrastColor = (hex) => {
  if (!hex) return "#000000";
  const c = hex.replace("#", "");
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.6 ? "#0A2947" : "#ffffff";
};