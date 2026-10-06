<<<<<<< HEAD
import React from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product = {}, theme = {} }) {
  return (
    <div
      className="border rounded-lg overflow-hidden group bg-white transition-all hover:shadow-md flex flex-col justify-between"
      style={{ borderColor: "#e5e7eb" }}
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
        ) : (
          <span className="text-xs text-gray-400">صورة المنتج</span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold text-gray-900 truncate">{product.name || "منتج تجريبي"}</h3>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold" style={{ color: theme.primaryColor || "#000000" }}>
            {product.price || "150"} ج.م
          </span>
          <button
            className="p-1.5 rounded-full border hover:bg-gray-100 transition-colors"
            style={{ color: theme.primaryColor || "#000000" }}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
=======
import React from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product = {}, theme = {} }) {
  return (
    <div
      className="border rounded-md overflow-hidden group bg-white transition-all hover:shadow-md flex flex-col justify-between"
      style={{ borderColor: "#e5e7eb" }}
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
        ) : (
          <span className="text-xs text-gray-400">صورة المنتج</span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold text-gray-900 truncate">{product.name || "منتج تجريبي"}</h3>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold" style={{ color: theme.primaryColor || "#000000" }}>
            {product.price || "150"} ج.م
          </span>
          <button
            className="p-1.5 rounded-full border hover:bg-gray-100 transition-colors"
            style={{ color: theme.primaryColor || "#000000" }}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
>>>>>>> 36f8532 (Initial commit)
}