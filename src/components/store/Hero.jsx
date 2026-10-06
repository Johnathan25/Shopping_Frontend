import React from "react";

export default function Hero({ content = {}, resolvedStyles = {}, theme = {} }) {
  return (
    <div
      className="relative overflow-hidden py-16 px-8 flex flex-col items-center justify-center text-center transition-all"
      style={resolvedStyles}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {content.badge && (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor || "#000000",
            }}
          >
            {content.badge}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-black leading-tight">
          {content.title || "اكتشف أحدث التشكيلات العصرية"}
        </h1>
        <p className="text-sm md:text-base opacity-80 max-w-lg mx-auto">
          {content.subtitle || "تسوق أفضل المنتجات بجودة عالية وتوصيل سريع لباب بيتك."}
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            className="px-6 py-2.5 rounded-md font-semibold text-sm transition-all shadow-sm active:scale-95"
            style={{
              backgroundColor: theme.primaryColor || "#000000",
              color: theme.secondaryColor || "#ffffff",
            }}
          >
            {content.buttonText || "تسوق الآن"}
          </button>
        </div>
      </div>
    </div>
  );
}