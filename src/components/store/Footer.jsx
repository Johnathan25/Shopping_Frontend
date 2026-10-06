<<<<<<< HEAD
import React from "react";

export default function Footer({ content = {}, theme = {} }) {
  return (
    <footer
      className="w-full border-t py-10 px-6 text-center text-xs space-y-4"
      style={{
        backgroundColor: theme.backgroundColor || "#ffffff",
        borderColor: "#e5e7eb",
        color: theme.textSecondaryColor || "#6b7280",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm" style={{ color: theme.textPrimaryColor || "#000000" }}>
          {content.copyright || "جميع الحقوق محفوظة © 2026"}
        </span>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:underline">الشروط والأحكام</span>
          <span className="cursor-pointer hover:underline">سياسة الخصوصية</span>
          <span className="cursor-pointer hover:underline">الدعم والمساعدة</span>
        </div>
      </div>
    </footer>
  );
=======
import React from "react";

export default function Footer({ content = {}, theme = {} }) {
  return (
    <footer
      className="w-full border-t py-10 px-6 text-center text-xs space-y-4"
      style={{
        backgroundColor: theme.backgroundColor || "#ffffff",
        borderColor: "#e5e7eb",
        color: theme.textSecondaryColor || "#6b7280",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm" style={{ color: theme.textPrimaryColor || "#000000" }}>
          {content.copyright || "جميع الحقوق محفوظة © 2026"}
        </span>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:underline">الشروط والأحكام</span>
          <span className="cursor-pointer hover:underline">سياسة الخصوصية</span>
          <span className="cursor-pointer hover:underline">الدعم والمساعدة</span>
        </div>
      </div>
    </footer>
  );
>>>>>>> 36f8532 (Initial commit)
}