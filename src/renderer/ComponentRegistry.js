import Navbar from "../components/store/Navbar";
import Hero from "../components/store/Hero";
import ProductsGrid from "../components/store/ProductsGrid";
import Footer from "../components/store/Footer";

export const componentRegistry = {
  navbar: Navbar,
  hero: Hero,
  products: ProductsGrid,
  footer: Footer,
};

// إنشاء سكشن افتراضي جديد متوافق مع الموديل
export const createDefaultSection = (type, order = 0) => {
  const base = {
    id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type,
    order,
    layout: {
      display: "block",
      position: "static",
      width: "100%",
      height: "auto",
      flex: { direction: "row", wrap: "nowrap", justifyContent: "flex-start", alignItems: "stretch", gap: "0px" },
      grid: { columns: "1", rows: "auto", gap: "0px", columnGap: "0px", rowGap: "0px" },
      order: 0,
      alignSelf: "auto",
    },
    style: {
      color: "",
      background: "",
      backgroundColor: "",
      backgroundImage: "",
      opacity: 1,
      border: { width: "0px", type: "none", color: "#000000", radius: "0px" },
      spacing: {
        margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
        padding: { top: "32px", right: "16px", bottom: "32px", left: "16px" },
      },
      text: { fontSize: "16px", fontWeight: "400", lineHeight: "1.5", letterSpacing: "0px", textAlign: "center", textTransform: "none" },
    },
    animation: { name: "none", duration: 0, delay: 0, iterationCount: "1" },
    elements: [],
    responsive: { desktop: {}, tablet: {}, mobile: {} },
  };

  if (type === "hero") {
    base.content = { badge: "تشكيلة حصرية", title: "عنوان العرض الترويجي", subtitle: "شرح تفصيلي للمنتج ومميزاته الحصرية", buttonText: "تسوق فوراً" };
  } else if (type === "products") {
    base.content = { title: "أحدث المنتجات", subtitle: "اختر ما يناسبك بأفضل الأسعار" };
  } else if (type === "navbar") {
    base.content = { title: "المتجر", links: ["الرئيسية", "المتجر", "تواصل معنا"] };
  } else if (type === "footer") {
    base.content = { copyright: "جميع الحقوق محفوظة لمتجرك 2026" };
  }

  return base;
};