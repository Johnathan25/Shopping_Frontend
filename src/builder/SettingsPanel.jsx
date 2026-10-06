import React from "react";

export default function SettingsPanel({
  config,
  setConfig,
  activePageSlug,
  selectedSectionId,
  currentDevice,
}) {
  const activePage = config.pages.find((p) => p.slug === activePageSlug);
  const selectedSection = activePage?.sections.find((s) => s.id === selectedSectionId);

  // تحديث خصائص السكشن المختار
  const updateSectionField = (path, value) => {
    setConfig((prev) => {
      const updatedPages = prev.pages.map((p) => {
        if (p.slug !== activePageSlug) return p;
        return {
          ...p,
          sections: p.sections.map((s) => {
            if (s.id !== selectedSectionId) return s;
            const updated = JSON.parse(JSON.stringify(s));

            // مسار متداخل مثل "content.title" أو "style.backgroundColor"
            const keys = path.split(".");
            let current = updated;
            for (let i = 0; i < keys.length - 1; i++) {
              if (!current[keys[i]]) current[keys[i]] = {};
              current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return updated;
          }),
        };
      });
      return { ...prev, pages: updatedPages };
    });
  };

  // تحديث الـ Global Theme
  const updateTheme = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value },
    }));
  };

  return (
    <div className="w-80 bg-white border-r h-full overflow-y-auto p-4 text-xs space-y-6 z-20">
      {/* 1. السكشن المحدد */}
      {selectedSection ? (
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="font-bold text-sm text-gray-800">تخصيص {selectedSection.type}</h3>
            <span className="text-[10px] text-gray-400 font-mono">ID: {selectedSection.id}</span>
          </div>

          {/* تعديل المحتوى المباشر */}
          <div className="space-y-3">
            <span className="font-bold text-gray-700 block">المحتوى والنصوص</span>
            {Object.keys(selectedSection.content || {}).map((field) => (
              <div key={field}>
                <label className="block text-[11px] text-gray-500 mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  value={selectedSection.content[field] || ""}
                  onChange={(e) => updateSectionField(`content.${field}`, e.target.value)}
                  className="w-full border rounded px-2.5 py-1.5 focus:outline-none focus:border-black"
                />
              </div>
            ))}
          </div>

          {/* تعديل الـ Styles */}
          <div className="space-y-3 border-t pt-3">
            <span className="font-bold text-gray-700 block">المظهر والتصميم</span>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">لون الخلفية</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedSection.style?.backgroundColor || "#ffffff"}
                  onChange={(e) => updateSectionField("style.backgroundColor", e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedSection.style?.backgroundColor || ""}
                  onChange={(e) => updateSectionField("style.backgroundColor", e.target.value)}
                  className="flex-1 border rounded px-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">لون الخط</label>
              <input
                type="color"
                value={selectedSection.style?.color || "#000000"}
                onChange={(e) => updateSectionField("style.color", e.target.value)}
                className="w-8 h-8 rounded border cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">المحاذاة (Text Align)</label>
              <div className="grid grid-cols-3 gap-1">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    onClick={() => updateSectionField("style.text.textAlign", align)}
                    className={`py-1 border rounded text-[11px] capitalize ${
                      selectedSection.style?.text?.textAlign === align ? "bg-black text-white" : ""
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. الإعدادات العامة (Global Theme Settings) عند عدم تحديد سكشن */
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="font-bold text-sm text-gray-800">إعدادات المتجر العامة</h3>
            <p className="text-[11px] text-gray-500">اختر سكشن لتخصيصه، أو عدل سمات المتجر الشاملة.</p>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-gray-700 block">ألوان المتجر الرئيسية</span>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">اللون الأساسي (Primary Color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.theme.primaryColor || "#000000"}
                  onChange={(e) => updateTheme("primaryColor", e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <span className="font-mono text-[11px]">{config.theme.primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">لون الخلفية (Background)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.theme.backgroundColor || "#ffffff"}
                  onChange={(e) => updateTheme("backgroundColor", e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <span className="font-mono text-[11px]">{config.theme.backgroundColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">نوع الخط (Font Family)</label>
              <select
                value={config.theme.fontFamily || "sans-serif"}
                onChange={(e) => updateTheme("fontFamily", e.target.value)}
                className="w-full border rounded p-1.5 bg-white"
              >
                <option value="Inter, Arial, sans-serif">Inter (عصري)</option>
                <option value="'Cinzel', serif">Cinzel (كلاسيكي فخم)</option>
                <option value="system-ui, sans-serif">System Default</option>
                <option value="Georgia, serif">Georgia</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}