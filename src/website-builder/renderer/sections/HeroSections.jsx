import React from "react";
import { getImageUrl } from "../../../utils/styles";

export function HeroRenderer({ section, content = {}, resolvedStyles, theme }) {
  const variant = section.variant;
  const bg = getImageUrl(content.backgroundImage);
  const img = getImageUrl(content.image);

  // ---------- FULLSCREEN IMAGE ----------
  if (variant === "fullscreen-image") {
    const hasBg = !!bg;
    return (
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          ...resolvedStyles,
          minHeight: content.fullHeight ? "min(90vh, 700px)" : resolvedStyles.minHeight,
        }}
      >
        {hasBg && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }} />
            {content.overlayEnabled && (
              <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${content.overlayOpacity ?? 0.5})` }} />
            )}
          </>
        )}
        <div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          style={{ textAlign: content.contentAlign || "center" }}
        >
          {content.badge && (
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{
                backgroundColor: `${theme.secondaryColor || "#8B5E3C"}25`,
                color: hasBg ? "#fff" : theme.secondaryColor,
              }}
            >
              {content.badge}
            </span>
          )}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-5"
            style={{ color: hasBg ? "#fff" : resolvedStyles.color || theme.textPrimaryColor }}
          >
            {content.title}
          </h1>
          {content.subtitle && (
            <p
              className="text-base md:text-lg max-w-2xl mx-auto mb-8"
              style={{ color: hasBg ? "rgba(255,255,255,0.85)" : theme.textSecondaryColor }}
            >
              {content.subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {content.buttonText && (
              <a
                href={content.buttonLink || "#"}
                className="px-8 py-3.5 rounded-xl font-bold text-sm md:text-base shadow-lg transition-transform active:scale-95 hover:shadow-xl"
                style={{ backgroundColor: theme.secondaryColor || "#8B5E3C", color: "#fff" }}
              >
                {content.buttonText}
              </a>
            )}
            {content.secondaryButtonText && (
              <a
                href={content.secondaryButtonLink || "#"}
                className="px-8 py-3.5 rounded-xl font-bold text-sm md:text-base border-2 transition-transform active:scale-95"
                style={{
                  borderColor: hasBg ? "#fff" : theme.primaryColor,
                  color: hasBg ? "#fff" : theme.primaryColor,
                }}
              >
                {content.secondaryButtonText}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ---------- SPLIT TEXT + IMAGE ----------
  if (variant === "split-text-image" || variant === "split-screen") {
    const imageFirst = (content.imagePosition || "right") === "left";
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${imageFirst ? "" : "md:[direction:rtl]"}`}>
          <div style={{ direction: "rtl" }}>
            {content.badge && (
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ backgroundColor: `${theme.secondaryColor}20`, color: theme.secondaryColor }}
              >
                {content.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5" style={{ color: theme.textPrimaryColor }}>
              {content.title}
            </h1>
            {content.subtitle && (
              <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: theme.textSecondaryColor }}>
                {content.subtitle}
              </p>
            )}
            {content.buttonText && (
              <a
                href={content.buttonLink || "#"}
                className="inline-block px-8 py-3.5 rounded-xl font-bold text-sm"
                style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
              >
                {content.buttonText}
              </a>
            )}
          </div>
          <div>
            {img ? (
              <img src={img} alt="" className="w-full h-auto rounded-2xl shadow-xl" />
            ) : (
              <div className="w-full aspect-square rounded-2xl" style={{ backgroundColor: `${theme.primaryColor}10` }} />
            )}
          </div>
        </div>
      </section>
    );
  }

  // ---------- MINIMAL TYPOGRAPHY ----------
  if (variant === "minimal-typography") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-5" style={{ color: theme.textPrimaryColor }}>
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-lg md:text-xl mb-8" style={{ color: theme.textSecondaryColor }}>
              {content.subtitle}
            </p>
          )}
          {content.buttonText && (
            <a
              href={content.buttonLink || "#"}
              className="inline-block px-8 py-3 rounded-xl font-bold"
              style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
            >
              {content.buttonText}
            </a>
          )}
        </div>
      </section>
    );
  }

  // ---------- PROMO CARDS ----------
  if (variant === "promo-cards") {
    return (
      <section className="w-full" style={resolvedStyles}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {content.badge && (
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-white/20">
                {content.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-black mb-4">{content.title}</h1>
            {content.subtitle && <p className="text-lg opacity-80 mb-6">{content.subtitle}</p>}
            {content.buttonText && (
              <a
                href={content.buttonLink || "#"}
                className="inline-block px-8 py-3 rounded-xl font-bold"
                style={{ backgroundColor: theme.secondaryColor || "#8B5E3C", color: "#fff" }}
              >
                {content.buttonText}
              </a>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(content.productCards || []).map((c) => (
              <div key={c.id} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <div className="aspect-square mb-3 rounded-xl bg-white/10" />
                <h3 className="font-bold mb-1">{c.name}</h3>
                <span className="text-lg font-black">{c.price} ج.م</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default fallback
  return (
    <section className="w-full py-20 text-center" style={resolvedStyles}>
      <h1 className="text-4xl font-black">{content.title || "مرحباً"}</h1>
    </section>
  );
}