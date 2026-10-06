import React, { useState, useEffect } from "react";
import { Monitor, Tablet, Smartphone, Save, Undo, Eye } from "lucide-react";
import api from "../../../services/api";
import BuilderSidebar from "./BuilderSidebar";
import DevicePreview from "./DevicePreview";
import SettingsPanel from "./SettingsPanel";
import { TEMPLATES } from "../templates";

export default function StoreBuilder({ slug }) {
  // حالة الـ Configuration الكاملة المتوافقة مع الـ Mongoose Schema
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // حالات التنقل الداخلية
  const [activeTab, setActiveTab] = useState("sections");
  const [activePageSlug, setActivePageSlug] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [currentDevice, setCurrentDevice] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'

  // جلب إعدادات المتجر الحالية من الـ API الموجود
  useEffect(() => {
    const fetchStoreSettings = async () => {
      try {
        setLoading(true);
        // GET /v1/websiteSettings/:slug
        const res = await api.get(`/websiteSettings/${slug}`);
        const data = res.data?.data || res.data;

        // إذا كان المتجر جديداً ولا يحتوي على صفحات مهيأة، نجهز الصفحة الافتراضية
        if (!data.pages || data.pages.length === 0) {
          const modernTpl = TEMPLATES.modern;
          data.theme = modernTpl.theme;
          data.pages = [
            {
              id: "page_home",
              name: "الرئيسية",
              slug: "",
              order: 0,
              sections: [
                {
                  id: "sec_nav",
                  type: "navbar",
                  order: 0,
                  content: { title: data.website?.title || "متجري" },
                  layout: { display: "block" },
                  style: { backgroundColor: "#ffffff" },
                },
                {
                  id: "sec_hero",
                  type: "hero",
                  order: 1,
                  content: {
                    title: "أهلاً بك في متجرنا",
                    subtitle: "تسوق أفضل المنتجات بسهولة وسرعة",
                    buttonText: "ابدأ التسوق",
                  },
                  layout: { display: "block" },
                  style: { backgroundColor: "#f8fafc" },
                },
                {
                  id: "sec_prods",
                  type: "products",
                  order: 2,
                  content: { title: "أحدث المنتجات" },
                  layout: { display: "block" },
                  style: {},
                },
                {
                  id: "sec_foot",
                  type: "footer",
                  order: 3,
                  content: { copyright: "جميع الحقوق محفوظة 2026" },
                  layout: { display: "block" },
                  style: {},
                },
              ],
            },
          ];
        }

        setConfig(data);
        setActivePageSlug(data.pages[0]?.slug || "");
      } catch (err) {
        console.error("فشل جلب إعدادات المتجر:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchStoreSettings();
  }, [slug]);

  // حفظ التعديلات عبر الـ API الموجود مسبقاً
  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("website", JSON.stringify(config.website));
      formData.append("theme", JSON.stringify(config.theme));
      formData.append("pages", JSON.stringify(config.pages));
      formData.append("status", "draft");

      // PUT /v1/websiteSettings/:slug
      await api.put(`/websiteSettings/${slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("تم حفظ التصميم بنجاح!");
    } catch (err) {
      console.error("فشل حفظ إعدادات المتجر:", err);
      alert("حدث خطأ أثناء حفظ التعديلات.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-xs font-semibold">
        جاري تحميل محرر المتجر...
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-xs text-red-500">
        تعذر العثور على بيانات المتجر.
      </div>
    );
  }

  return (
    <div dir="rtl" className="h-screen w-screen flex flex-col overflow-hidden bg-white select-none">
      {/* 1. شريط الأدوات العلوي (Top Control Toolbar) */}
      <header className="h-14 border-b px-4 flex items-center justify-between bg-white z-30">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm">مخصص المتجر</span>
          <span className="text-[11px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
            {slug}
          </span>
        </div>

        {/* أزرار محاكاة الأجهزة Responsive Devices */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setCurrentDevice("desktop")}
            className={`p-1.5 rounded ${
              currentDevice === "desktop" ? "bg-white shadow-sm text-black" : "text-gray-500"
            }`}
          >
            <Monitor size={15} />
          </button>
          <button
            onClick={() => setCurrentDevice("tablet")}
            className={`p-1.5 rounded ${
              currentDevice === "tablet" ? "bg-white shadow-sm text-black" : "text-gray-500"
            }`}
          >
            <Tablet size={15} />
          </button>
          <button
            onClick={() => setCurrentDevice("mobile")}
            className={`p-1.5 rounded ${
              currentDevice === "mobile" ? "bg-white shadow-sm text-black" : "text-gray-500"
            }`}
          >
            <Smartphone size={15} />
          </button>
        </div>

        {/* زر الحفظ */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
          </button>
        </div>
      </header>

      {/* 2. منطقة العمل الرئيسية (3-Column Layout) */}
      <div className="flex-1 flex overflow-hidden">
        {/* العمود الأيمن: القائمة الجانبية لإدارة السكاشن والصفحات والنماذج */}
        <BuilderSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          config={config}
          setConfig={setConfig}
          activePageSlug={activePageSlug}
          setActivePageSlug={setActivePageSlug}
          selectedSectionId={selectedSectionId}
          setSelectedSectionId={setSelectedSectionId}
        />

        {/* العمود الأوسط: الـ Live Preview التفاعلي */}
        <DevicePreview
          config={config}
          activePageSlug={activePageSlug}
          currentDevice={currentDevice}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
        />

        {/* العمود الأيسر: لوحة تعديل خصائص السكشن والسمات العامة */}
        <SettingsPanel
          config={config}
          setConfig={setConfig}
          activePageSlug={activePageSlug}
          selectedSectionId={selectedSectionId}
          currentDevice={currentDevice}
        />
      </div>
    </div>
  );
}