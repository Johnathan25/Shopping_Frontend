<<<<<<< HEAD
import React from "react";
import { ShoppingBag, Search, User } from "lucide-react";

export default function Navbar({ content = {}, style = {}, theme = {} }) {
  return (
    <nav
      className="w-full transition-all border-b px-6 py-4 flex items-center justify-between"
      style={{
        backgroundColor: style.backgroundColor || theme.backgroundColor || "#ffffff",
        borderColor: style.border?.color || "#e5e7eb",
        color: style.color || theme.textPrimaryColor || "#000000",
      }}
    >
      <div className="flex items-center gap-6">
        {content.logoUrl ? (
          <img src={content.logoUrl} alt="Logo" className="h-9 w-auto object-contain" />
        ) : (
          <span className="text-xl font-bold tracking-tight">
            {content.title || "متجري الإلكتروني"}
          </span>
        )}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {(content.links || ["الرئيسية", "المنتجات", "العروض", "تواصل معنا"]).map((link, i) => (
            <span key={i} className="hover:opacity-75 cursor-pointer">
              {link}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Search size={20} className="cursor-pointer hover:opacity-70" />
        <User size={20} className="cursor-pointer hover:opacity-70" />
        <div className="relative cursor-pointer">
          <ShoppingBag size={20} />
          <span
            className="absolute -top-1.5 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundColor: theme.primaryColor || "#000000",
              color: theme.secondaryColor || "#ffffff",
            }}
          >
            0
          </span>
        </div>
      </div>
    </nav>
  );
=======
import React from "react";
import { ShoppingBag, Search, User } from "lucide-react";

export default function Navbar({ content = {}, style = {}, theme = {} }) {
  return (
    <nav
      className="w-full transition-all border-b px-6 py-4 flex items-center justify-between"
      style={{
        backgroundColor: style.backgroundColor || theme.backgroundColor || "#ffffff",
        borderColor: style.border?.color || "#e5e7eb",
        color: style.color || theme.textPrimaryColor || "#000000",
      }}
    >
      <div className="flex items-center gap-6">
        {content.logoUrl ? (
          <img src={content.logoUrl} alt="Logo" className="h-9 w-auto object-contain" />
        ) : (
          <span className="text-xl font-bold tracking-tight">
            {content.title || "متجري الإلكتروني"}
          </span>
        )}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {(content.links || ["الرئيسية", "المنتجات", "العروض", "تواصل معنا"]).map((link, i) => (
            <span key={i} className="hover:opacity-75 cursor-pointer">
              {link}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Search size={20} className="cursor-pointer hover:opacity-70" />
        <User size={20} className="cursor-pointer hover:opacity-70" />
        <div className="relative cursor-pointer">
          <ShoppingBag size={20} />
          <span
            className="absolute -top-1.5 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundColor: theme.primaryColor || "#000000",
              color: theme.secondaryColor || "#ffffff",
            }}
          >
            0
          </span>
        </div>
      </div>
    </nav>
  );
>>>>>>> 36f8532 (Initial commit)
}