<<<<<<< HEAD
import React from "react";
import { Plus, Trash2, Eye, Layout, Palette, FileText, ArrowUp, ArrowDown } from "lucide-react";
import { TEMPLATES } from "../templates";
import { createDefaultSection } from "../renderer/ComponentRegistry";

export default function BuilderSidebar({
  activeTab,
  setActiveTab,
  config,
  setConfig,
  activePageSlug,
  setActivePageSlug,
  selectedSectionId,
  setSelectedSectionId,
}) {
  const activePage =
    config.pages.find((p) => p.slug === activePageSlug) || config.pages[0];

  // تطبيق القالب
  const handleApplyTemplate = (key) => {
    const tpl = TEMPLATES[key];
    const newSections = tpl.sections.map((type, idx) => createDefaultSection(type, idx));

    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...tpl.theme },
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: newSections } : p
      ),
    }));
  };

  // إدارة السكاشن
  const handleAddSection = (type) => {
    const newSec = createDefaultSection(type, activePage.sections.length);
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: [...p.sections, newSec] } : p
      ),
    }));
    setSelectedSectionId(newSec.id);
  };

  const handleDeleteSection = (id, e) => {
    e.stopPropagation();
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug
          ? { ...p, sections: p.sections.filter((s) => s.id !== id) }
          : p
      ),
    }));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  const handleMoveSection = (idx, dir, e) => {
    e.stopPropagation();
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= activePage.sections.length) return;

    const updated = [...activePage.sections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    // إعادة ضبط الـ order
    updated.forEach((s, i) => (s.order = i));

    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: updated } : p
      ),
    }));
  };

  return (
    <div className="w-80 bg-white border-l flex flex-col h-full z-20">
      {/* شريط التبويبات العلوي */}
      <div className="flex border-b text-xs">
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex-1 py-3 flex items-center justify-center gap-1 font-semibold ${
            activeTab === "sections" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <Layout size={14} /> السكاشن
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex-1 py-3 flex items-center justify-center gap-1 font-semibold ${
            activeTab === "pages" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <FileText size={14} /> الصفحات
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`flex-1 py-3 flex items-center justify-center gap-1 font-semibold ${
            activeTab === "templates" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <Palette size={14} /> النماذج
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* تبويب السكاشن */}
        {activeTab === "sections" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-700">ترتيب سكاشن الصفحة</span>
              <div className="flex gap-1">
                {["hero", "products"].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleAddSection(t)}
                    className="p-1 border rounded hover:bg-gray-100 flex items-center gap-1 text-[11px]"
                  >
                    <Plus size={12} /> {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {activePage.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                    selectedSectionId === sec.id
                      ? "border-blue-600 bg-blue-50/50"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="font-semibold capitalize text-gray-800">{sec.type}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={(e) => handleMoveSection(idx, "up", e)}
                      className="p-1 hover:text-blue-600 disabled:opacity-30"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      disabled={idx === activePage.sections.length - 1}
                      onClick={(e) => handleMoveSection(idx, "down", e)}
                      className="p-1 hover:text-blue-600 disabled:opacity-30"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteSection(sec.id, e)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تبويب الصفحات */}
        {activeTab === "pages" && (
          <div className="space-y-3">
            <span className="font-bold text-gray-700">صفحات المتجر</span>
            <div className="space-y-1.5">
              {config.pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePageSlug(p.slug);
                    setSelectedSectionId(null);
                  }}
                  className={`w-full p-2.5 text-right rounded-lg border flex items-center justify-between font-semibold ${
                    activePageSlug === p.slug
                      ? "border-black bg-gray-50 text-black"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono">/{p.slug}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* تبويب الـ 6 Templates */}
        {activeTab === "templates" && (
          <div className="space-y-3">
            <span className="font-bold text-gray-700">اختر قالباً جاهزاً</span>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              تغيير القالب يعيد ضبط ألوان وتخطيط المتجر فوراً مع الاحتفاظ ببياناتك.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(TEMPLATES).map((key) => {
                const tpl = TEMPLATES[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleApplyTemplate(key)}
                    className="p-3 border rounded-lg text-right hover:border-black transition-all flex flex-col justify-between h-20 shadow-sm"
                  >
                    <span className="font-bold text-xs">{tpl.name}</span>
                    <div className="flex gap-1.5 mt-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: tpl.theme.primaryColor }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: tpl.theme.backgroundColor }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
=======
import React from "react";
import { Plus, Trash2, Eye, Layout, Palette, FileText, ArrowUp, ArrowDown } from "lucide-react";
import { TEMPLATES } from "../templates";
import { createDefaultSection } from "../renderer/ComponentRegistry";

export default function BuilderSidebar({
  activeTab,
  setActiveTab,
  config,
  setConfig,
  activePageSlug,
  setActivePageSlug,
  selectedSectionId,
  setSelectedSectionId,
}) {
  const activePage =
    config.pages.find((p) => p.slug === activePageSlug) || config.pages[0];

  // تطبيق القالب
  const handleApplyTemplate = (key) => {
    const tpl = TEMPLATES[key];
    const newSections = tpl.sections.map((type, idx) => createDefaultSection(type, idx));

    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...tpl.theme },
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: newSections } : p
      ),
    }));
  };

  // إدارة السكاشن
  const handleAddSection = (type) => {
    const newSec = createDefaultSection(type, activePage.sections.length);
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: [...p.sections, newSec] } : p
      ),
    }));
    setSelectedSectionId(newSec.id);
  };

  const handleDeleteSection = (id, e) => {
    e.stopPropagation();
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug
          ? { ...p, sections: p.sections.filter((s) => s.id !== id) }
          : p
      ),
    }));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  const handleMoveSection = (idx, dir, e) => {
    e.stopPropagation();
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= activePage.sections.length) return;

    const updated = [...activePage.sections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    // إعادة ضبط الـ order
    updated.forEach((s, i) => (s.order = i));

    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.slug === activePageSlug ? { ...p, sections: updated } : p
      ),
    }));
  };

  return (
    <div className="w-80 bg-white border-l flex flex-col h-full z-20">
      {/* شريط التبويبات العلوي */}
      <div className="flex border-b text-xs">
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex-1 py-3 flex items-center justify-center gap-1 font-semibold ${
            activeTab === "sections" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <Layout size={14} /> السكاشن
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex-1 py-3 flex items-center justify-center gap-1 font-semibold ${
            activeTab === "pages" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <FileText size={14} /> الصفحات
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`flex-1 py-3 flex items-center justify-center gap-1 font-semibold ${
            activeTab === "templates" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <Palette size={14} /> النماذج
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* تبويب السكاشن */}
        {activeTab === "sections" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-700">ترتيب سكاشن الصفحة</span>
              <div className="flex gap-1">
                {["hero", "products"].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleAddSection(t)}
                    className="p-1 border rounded hover:bg-gray-100 flex items-center gap-1 text-[11px]"
                  >
                    <Plus size={12} /> {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {activePage.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`p-2.5 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                    selectedSectionId === sec.id
                      ? "border-blue-600 bg-blue-50/50"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="font-semibold capitalize text-gray-800">{sec.type}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={(e) => handleMoveSection(idx, "up", e)}
                      className="p-1 hover:text-blue-600 disabled:opacity-30"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      disabled={idx === activePage.sections.length - 1}
                      onClick={(e) => handleMoveSection(idx, "down", e)}
                      className="p-1 hover:text-blue-600 disabled:opacity-30"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteSection(sec.id, e)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تبويب الصفحات */}
        {activeTab === "pages" && (
          <div className="space-y-3">
            <span className="font-bold text-gray-700">صفحات المتجر</span>
            <div className="space-y-1.5">
              {config.pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePageSlug(p.slug);
                    setSelectedSectionId(null);
                  }}
                  className={`w-full p-2.5 text-right rounded-md border flex items-center justify-between font-semibold ${
                    activePageSlug === p.slug
                      ? "border-black bg-gray-50 text-black"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono">/{p.slug}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* تبويب الـ 6 Templates */}
        {activeTab === "templates" && (
          <div className="space-y-3">
            <span className="font-bold text-gray-700">اختر قالباً جاهزاً</span>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              تغيير القالب يعيد ضبط ألوان وتخطيط المتجر فوراً مع الاحتفاظ ببياناتك.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(TEMPLATES).map((key) => {
                const tpl = TEMPLATES[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleApplyTemplate(key)}
                    className="p-3 border rounded-md text-right hover:border-black transition-all flex flex-col justify-between h-20 shadow-sm"
                  >
                    <span className="font-bold text-xs">{tpl.name}</span>
                    <div className="flex gap-1.5 mt-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: tpl.theme.primaryColor }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: tpl.theme.backgroundColor }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
>>>>>>> 36f8532 (Initial commit)
}