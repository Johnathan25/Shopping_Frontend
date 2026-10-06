<<<<<<< HEAD
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ content = {}, resolvedStyles = {}, theme = {} }) {
  const dummyProducts = [
    { name: "ساعة يد كلاسيكية", price: "450", image: "" },
    { name: "حذاء رياضي أنيق", price: "620", image: "" },
    { name: "نظارة شمسية بريميوم", price: "280", image: "" },
    { name: "عطر مخصص 100 مل", price: "790", image: "" },
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto" style={resolvedStyles}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{content.title || "المنتجات المميزة"}</h2>
        <p className="text-xs text-gray-500 mt-1">{content.subtitle || "تصفح أحدث ما وصلنا هذا الأسبوع"}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dummyProducts.map((p, idx) => (
          <ProductCard key={idx} product={p} theme={theme} />
        ))}
      </div>
    </div>
  );
=======
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ content = {}, resolvedStyles = {}, theme = {} }) {
  const dummyProducts = [
    { name: "ساعة يد كلاسيكية", price: "450", image: "" },
    { name: "حذاء رياضي أنيق", price: "620", image: "" },
    { name: "نظارة شمسية بريميوم", price: "280", image: "" },
    { name: "عطر مخصص 100 مل", price: "790", image: "" },
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto" style={resolvedStyles}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{content.title || "المنتجات المميزة"}</h2>
        <p className="text-xs text-gray-500 mt-1">{content.subtitle || "تصفح أحدث ما وصلنا هذا الأسبوع"}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dummyProducts.map((p, idx) => (
          <ProductCard key={idx} product={p} theme={theme} />
        ))}
      </div>
    </div>
  );
>>>>>>> 36f8532 (Initial commit)
}