import { SECTION_REGISTRY, getSectionMeta } from "./sectionRegistry";

let _counter = 0;
export const genId = (prefix = "id") =>
  `${prefix}_${Date.now()}_${++_counter}_${Math.random().toString(36).slice(2, 7)}`;

const DEFAULT_LAYOUT = {
  display: "block", position: "static", width: "100%", height: "auto",
  direction: "row", gap: "0px", align: "flex-start", justify: "flex-start",
  columns: 1, containerWidth: "1200px",
};

const DEFAULT_STYLE = {
  color: "", backgroundColor: "", backgroundImage: "",
  opacity: 1, shadow: "soft",
  border: { width: "0px", type: "none", color: "#000000", radius: "0px" },
  spacing: {
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    padding: { top: "60px", right: "24px", bottom: "60px", left: "24px" },
  },
  text: { fontSize: "16px", fontWeight: "400", lineHeight: "1.6", textAlign: "inherit" },
};

const DEFAULT_RESPONSIVE = { desktop: {}, tablet: {}, mobile: {} };
const DEFAULT_ANIMATION = { name: "none", duration: 0.5, delay: 0 };

/**
 * Creates a new section from registry defaults.
 */
export const createSection = (type, variant = null, order = 0) => {
  const meta = getSectionMeta(type);
  if (!meta) {
    console.warn(`Unknown section type: ${type}`);
    return null;
  }

  const chosenVariant = variant || meta.defaultVariant;
  const variantDef = meta.variants[chosenVariant];
  if (!variantDef) {
    console.warn(`Unknown variant ${chosenVariant} for ${type}`);
    return null;
  }

  // Deep clone defaults
  const defaults = JSON.parse(JSON.stringify(variantDef.defaults || {}));

  return {
    id: genId(type),
    type,
    variant: chosenVariant,
    order,
    visible: true,
    content: defaults.content || {},
    layout: { ...DEFAULT_LAYOUT, ...(defaults.layout || {}) },
    style: deepMerge(DEFAULT_STYLE, defaults.style || {}),
    animation: { ...DEFAULT_ANIMATION, ...(defaults.animation || {}) },
    responsive: JSON.parse(JSON.stringify(DEFAULT_RESPONSIVE)),
    elements: [],
  };
};

/**
 * Switch a section's variant while preserving compatible user data.
 */
export const switchVariant = (section, newVariant) => {
  const meta = getSectionMeta(section.type);
  if (!meta || !meta.variants[newVariant]) return section;

  const variantDef = meta.variants[newVariant];
  const newDefaults = JSON.parse(JSON.stringify(variantDef.defaults || {}));

  // Preserve user values where the key exists in both old content and new defaults
  const mergedContent = { ...(newDefaults.content || {}) };
  const oldContent = section.content || {};
  Object.keys(oldContent).forEach((key) => {
    // Preserve: text fields, uploaded images, links, arrays of user items
    if (
      typeof oldContent[key] === "string" ||
      oldContent[key] === null ||
      typeof oldContent[key] === "number" ||
      typeof oldContent[key] === "boolean" ||
      Array.isArray(oldContent[key])
    ) {
      // Only preserve if new variant defines this key OR it's a universal field
      const universalFields = [
        "title", "subtitle", "description", "buttonText", "buttonLink",
        "secondaryButtonText", "secondaryButtonLink", "badge",
        "image", "backgroundImage", "logo",
      ];
      if (key in mergedContent || universalFields.includes(key)) {
        // For images: only preserve if user uploaded something (non-null object)
        if (key === "image" || key === "backgroundImage" || key === "logo") {
          if (oldContent[key] && typeof oldContent[key] === "object") {
            mergedContent[key] = oldContent[key];
          }
        } else {
          mergedContent[key] = oldContent[key];
        }
      }
    }
  });

  return {
    ...section,
    variant: newVariant,
    content: mergedContent,
    layout: { ...DEFAULT_LAYOUT, ...(newDefaults.layout || {}) },
    style: deepMerge(DEFAULT_STYLE, newDefaults.style || {}),
    // Keep existing animation & responsive
  };
};

// ============================================================
// MIGRATION - normalize old sections to new format
// ============================================================
export const normalizeSection = (section) => {
  if (!section) return null;

  const type = section.type;
  const meta = getSectionMeta(type);
  if (!meta) {
    // Unknown type — keep it as-is but with safe defaults
    return {
      id: section.id || genId("sec"),
      type,
      variant: section.variant || "default",
      order: section.order ?? 0,
      visible: section.visible !== false,
      content: section.content || {},
      layout: { ...DEFAULT_LAYOUT, ...(section.layout || {}) },
      style: deepMerge(DEFAULT_STYLE, section.style || {}),
      animation: { ...DEFAULT_ANIMATION, ...(section.animation || {}) },
      responsive: section.responsive || DEFAULT_RESPONSIVE,
      elements: section.elements || [],
    };
  }

  const variant = section.variant && meta.variants[section.variant]
    ? section.variant
    : meta.defaultVariant;

  // If old section lacks new fields, fill defaults
  const variantDef = meta.variants[variant];
  const defaults = JSON.parse(JSON.stringify(variantDef.defaults || {}));

  return {
    id: section.id || genId("sec"),
    type,
    variant,
    order: section.order ?? 0,
    visible: section.visible !== false,
    content: { ...(defaults.content || {}), ...(section.content || {}) },
    layout: { ...DEFAULT_LAYOUT, ...(defaults.layout || {}), ...(section.layout || {}) },
    style: deepMerge(deepMerge(DEFAULT_STYLE, defaults.style || {}), section.style || {}),
    animation: { ...DEFAULT_ANIMATION, ...(section.animation || {}) },
    responsive: { ...DEFAULT_RESPONSIVE, ...(section.responsive || {}) },
    elements: section.elements || [],
  };
};

export const normalizePage = (page) => ({
  id: page.id || genId("page"),
  name: page.name || "صفحة",
  slug: page.slug || "",
  order: page.order ?? 0,
  visible: page.visible !== false,
  sections: (page.sections || []).map(normalizeSection).filter(Boolean),
});

// ============================================================
// HELPERS
// ============================================================
function deepMerge(target, source) {
  const out = { ...target };
  Object.keys(source || {}).forEach((key) => {
    const sv = source[key];
    if (sv && typeof sv === "object" && !Array.isArray(sv) && target[key] && typeof target[key] === "object") {
      out[key] = deepMerge(target[key], sv);
    } else {
      out[key] = sv;
    }
  });
  return out;
}