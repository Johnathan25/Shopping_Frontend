import { normalizePage } from "../website-builder/registry/sectionFactory";

/**
 * يحوّل قالب → صفحات كاملة بكل السكاشن
 */
export const loadTemplate = (template) => {
  if (!template) return null;

  const pages = template.pages.map((page, pageIdx) => {
    const sections = page.sections.map((sec, idx) => {
      // حوّل الصور إلى { url, publicId } إذا كانت نصية
      const content = normalizeImages(sec.content || {});
      return {
        id: `${template.id}_${page.slug || "home"}_${sec.type}_${idx}`,
        type: sec.type,
        variant: sec.variant || "default",
        order: idx,
        visible: true,
        content,
        layout: {},
        style: {},
        animation: {},
        responsive: { desktop: {}, tablet: {}, mobile: {} },
        elements: [],
      };
    });

    return {
      id: `${template.id}_page_${pageIdx}`,
      name: page.name,
      slug: page.slug,
      pageType: page.pageType || "custom",
      order: pageIdx,
      visible: true,
      sections,
    };
  });

  return {
    theme: template.theme,
    pages: pages.map(normalizePage),
  };
};

/**
 * يحوّل كل الصور النصية إلى { url, publicId }
 */
function normalizeImages(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(normalizeImages);

  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const isImageField = [
      "image", "backgroundImage", "logo", "avatar", "favicon",
    ].includes(key);

    if (isImageField && typeof value === "string") {
      out[key] = value ? { url: value, publicId: "" } : null;
    } else if (isImageField && value && typeof value === "object" && value.url) {
      out[key] = { url: value.url, publicId: value.publicId || "" };
    } else if (typeof value === "object" && value !== null) {
      out[key] = normalizeImages(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}