import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Monitor, Tablet, Smartphone, Save, Plus, Trash2, Copy,
  Eye, EyeOff, ArrowUp, ArrowDown, Layout, FileText, Palette,
  X, ChevronUp, ChevronDown, AlertCircle, Loader2,
  Layers, Home, Sparkles, Undo, Redo, Type,
} from "lucide-react";
import api from "../services/api";
import DynamicRenderer from "./renderer/DynamicRenderer";
import { TEMPLATES, getTemplateList } from "./registry/templates";
import { loadTemplate } from "../utils/templateLoader";
import { uploadImage } from "../utils/imageUpload";
import {
  PAGE_TYPES,
  PAGE_DEFINITIONS,
  CATEGORY_LABELS,
  getSectionMeta,
  getSectionVariants,
  getSectionsForPage,
  getFieldSchema,
  INTERNAL_PAGES,
  EXTERNAL_LINKS,
  LINK_FIELDS,
} from "./registry/sectionRegistry";
import {
  createSection, switchVariant, normalizePage, genId,
} from "./registry/sectionFactory";

// ============================================================
// MAIN BUILDER
// ============================================================
export default function StoreBuilder({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;

  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [pendingImages, setPendingImages] = useState(new Map());

  const [activeTab, setActiveTab] = useState("sections");
  const [activePageSlug, setActivePageSlug] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [currentDevice, setCurrentDevice] = useState("desktop");
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [showVariantPicker, setShowVariantPicker] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ============================================================
  // LOAD
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/websiteSettings/${slug}`);
        const raw = res.data;
        const data = raw?.data || raw;

        if (!data || typeof data !== "object") {
          throw new Error("البيانات الراجعة غير صحيحة");
        }

        let pages = Array.isArray(data.pages) ? data.pages : [];

        if (pages.length === 0) {
          pages = [createDefaultHomePage()];
        } else {
          pages = pages
            .map((page) => {
              try {
                return normalizePage(page);
              } catch (err) {
                console.error("⚠️ normalizePage failed:", page, err);
                return page;
              }
            })
            .filter(Boolean);
        }

        const normalized = {
          ...data,
          pages,
          theme: data.theme || {},
          website: data.website || {},
          status: data.status || "draft",
        };

        setConfig(normalized);
        setActivePageSlug(pages[0]?.slug ?? "");
      } catch (err) {
        console.error("Load failed:", err);
        setError(err.message || "تعذر تحميل بيانات المتجر");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  useEffect(() => {
    const handler = (e) => {
      if (pendingImages.size > 0) {
        e.preventDefault();
        e.returnValue = "في صور لم تُحفظ بعد. هل تريد الخروج؟";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [pendingImages]);

  // ============================================================
  // HISTORY
  // ============================================================
  const pushHistory = useCallback((nextConfig) => {
    setHistory((h) => {
      const sliced = h.slice(0, historyIndex + 1);
      return [...sliced, JSON.parse(JSON.stringify(nextConfig))].slice(-30);
    });
    setHistoryIndex((i) => Math.min(i + 1, 29));
  }, [historyIndex]);

  const updateConfig = useCallback((updater) => {
    setConfig((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const prev = history[historyIndex - 1];
    setConfig(JSON.parse(JSON.stringify(prev)));
    setHistoryIndex(historyIndex - 1);
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const next = history[historyIndex + 1];
    setConfig(JSON.parse(JSON.stringify(next)));
    setHistoryIndex(historyIndex + 1);
  };

  // ============================================================
  // SAVE
  // ============================================================
  const replacePendingImage = useCallback((obj, key, result) => {
    if (!obj || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => replacePendingImage(item, key, result));
    }

    const out = { ...obj };
    Object.keys(out).forEach((k) => {
      const val = out[k];
      if (val && typeof val === "object") {
        if (val._pendingKey === key) {
          out[k] = { url: result.url, publicId: result.publicId };
        } else {
          out[k] = replacePendingImage(val, key, result);
        }
      }
    });
    return out;
  }, []);

  const handleSave = async (publish = false) => {
    try {
      setSaving(true);
      let updatedConfig = JSON.parse(JSON.stringify(config));

      if (pendingImages.size > 0) {
        for (const [key, { file }] of pendingImages.entries()) {
          try {
            const result = await uploadImage(file, slug, "section");

            updatedConfig = {
              ...updatedConfig,
              pages: updatedConfig.pages.map((page) => ({
                ...page,
                sections: page.sections.map((section) => ({
                  ...section,
                  content: replacePendingImage(section.content, key, result),
                })),
              })),
            };
          } catch (err) {
            console.error(`Failed to upload image (${key}):`, err);
            throw new Error(`فشل رفع صورة: ${err.message}`);
          }
        }

        pendingImages.forEach(({ previewUrl }) => {
          if (previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
          }
        });
        setPendingImages(new Map());
      }

      const payload = {
        website: updatedConfig.website || {},
        theme: updatedConfig.theme || {},
        pages: updatedConfig.pages || [],
        status: publish ? "published" : (updatedConfig.status || "draft"),
      };

      const formData = new FormData();
      formData.append("website", JSON.stringify(payload.website));
      formData.append("theme", JSON.stringify(payload.theme));
      formData.append("pages", JSON.stringify(payload.pages));
      formData.append("status", payload.status);

      const res = await api.put(`/websiteSettings/${slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setConfig({
        ...updatedConfig,
        status: payload.status,
        ...(res.data?.data || {}),
      });

      alert(publish ? "✅ تم النشر بنجاح!" : "✅ تم الحفظ!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("❌ فشل الحفظ: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // HELPERS
  // ============================================================
  const activePage = useMemo(
    () => config?.pages?.find((p) => p.slug === activePageSlug) || config?.pages?.[0],
    [config, activePageSlug]
  );

  const selectedSection = useMemo(
    () => activePage?.sections?.find((s) => s.id === selectedSectionId),
    [activePage, selectedSectionId]
  );

  const updateActivePage = useCallback((updater) => {
    updateConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.slug === activePageSlug ? updater(p) : p)),
    }));
  }, [activePageSlug, updateConfig]);

  const updateSelectedSection = useCallback((updater) => {
    updateActivePage((p) => ({
      ...p,
      sections: p.sections.map((s) => (s.id === selectedSectionId ? updater(s) : s)),
    }));
  }, [selectedSectionId, updateActivePage]);

  const updateSectionField = useCallback((path, value) => {
    updateSelectedSection((s) => {
      const keys = path.split(".");
      const copy = JSON.parse(JSON.stringify(s));
      let cur = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!cur[keys[i]]) cur[keys[i]] = {};
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return copy;
    });
  }, [updateSelectedSection]);

  // ============================================================
  // SECTION OPERATIONS
  // ============================================================
  const handleAddSection = (type, variant) => {
    const newSec = createSection(type, variant, activePage.sections.length);
    if (!newSec) return;
    updateActivePage((p) => ({ ...p, sections: [...p.sections, newSec] }));
    setSelectedSectionId(newSec.id);
    setShowSectionPicker(false);
    setShowVariantPicker(false);
  };

  const handleDeleteSection = (id) => {
    if (!confirm("حذف هذا السكشن؟")) return;
    updateActivePage((p) => ({ ...p, sections: p.sections.filter((s) => s.id !== id) }));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  const handleDuplicateSection = (id) => {
    const sec = activePage.sections.find((s) => s.id === id);
    if (!sec) return;
    const clone = JSON.parse(JSON.stringify(sec));
    clone.id = genId(sec.type);
    clone.order = activePage.sections.length;
    updateActivePage((p) => ({ ...p, sections: [...p.sections, clone] }));
  };

  const handleMoveSection = (idx, dir) => {
    const target = dir === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= activePage.sections.length) return;
    const updated = [...activePage.sections];
    [updated[idx], updated[target]] = [updated[target], updated[idx]];
    updated.forEach((s, i) => (s.order = i));
    updateActivePage((p) => ({ ...p, sections: updated }));
  };

  const handleToggleVisible = (id) => {
    updateActivePage((p) => ({
      ...p,
      sections: p.sections.map((s) => (s.id === id ? { ...s, visible: s.visible === false } : s)),
    }));
  };

  const handleVariantChange = (variant) => {
    updateSelectedSection((s) => switchVariant(s, variant));
    setShowVariantPicker(false);
  };

  // ============================================================
  // PAGE OPERATIONS
  // ============================================================
  const handleAddPage = (name, pageSlug, pageType) => {
    const def = PAGE_DEFINITIONS.find((d) => d.type === (pageType || PAGE_TYPES.CUSTOM));
    const defaultSectionTypes = def?.defaultSections || ["navbar", "footer"];
    const sections = defaultSectionTypes
      .map((type, i) => createSection(type, null, i))
      .filter(Boolean);

    const newPage = {
      id: genId("page"),
      name,
      slug: pageSlug,
      pageType: pageType || PAGE_TYPES.CUSTOM,
      order: config.pages.length,
      visible: true,
      sections,
    };
    updateConfig((prev) => ({ ...prev, pages: [...prev.pages, newPage] }));
    setActivePageSlug(newPage.slug);
  };

  const handleDeletePage = (pageSlug) => {
    if (config.pages.length <= 1) return alert("لا يمكن حذف آخر صفحة");
    if (!confirm("حذف هذه الصفحة؟")) return;
    updateConfig((prev) => ({ ...prev, pages: prev.pages.filter((p) => p.slug !== pageSlug) }));
    if (activePageSlug === pageSlug) setActivePageSlug(config.pages[0].slug);
  };

  const handleApplyTemplate = (template) => {
    const loaded = loadTemplate(template);
    if (!loaded) return;
    updateConfig((prev) => ({
      ...prev,
      theme: loaded.theme,
      pages: loaded.pages,
    }));
    setActivePageSlug(loaded.pages[0]?.slug ?? "");
    setSelectedSectionId(null);
    alert(`✅ تم تطبيق قالب "${template.name}" بنجاح!`);
  };

  // ============================================================
  // LOADING / ERROR
  // ============================================================
  if (loading) return <LoadingScreen />;
  if (error || !config) return <ErrorScreen msg={error} />;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div dir="rtl" className="h-screen flex flex-col bg-neutral-100 overflow-hidden select-none">
      <Header
        slug={slug}
        saving={saving}
        device={currentDevice}
        setDevice={setCurrentDevice}
        onSave={() => handleSave(false)}
        onPublish={() => handleSave(true)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        status={config.status}
        pendingCount={pendingImages.size}
      />

      <div className="flex-1 flex overflow-hidden">
        <RightSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activePage={activePage}
          config={config}
          activePageSlug={activePageSlug}
          setActivePageSlug={setActivePageSlug}
          selectedSectionId={selectedSectionId}
          setSelectedSectionId={setSelectedSectionId}
          onOpenSectionPicker={() => setShowSectionPicker(true)}
          onDeleteSection={handleDeleteSection}
          onDuplicateSection={handleDuplicateSection}
          onMoveSection={handleMoveSection}
          onToggleVisible={handleToggleVisible}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
          onApplyTemplate={handleApplyTemplate}
        />

        <main
          className="flex-1 bg-neutral-200 overflow-y-auto flex justify-center items-start p-4"
          onClick={() => setSelectedSectionId(null)}
        >
          <div
            className={`bg-white overflow-hidden transition-all duration-300 ${
              currentDevice === "mobile"
                ? "w-[390px] rounded-[2rem] border-[8px] border-[#0A2947] shadow-2xl"
                : currentDevice === "tablet"
                ? "w-[768px] rounded-xl border border-gray-300 shadow-2xl"
                : "w-full"
            }`}
          >
            <DynamicRenderer
              pageConfig={activePage}
              themeConfig={config.theme}
              currentDevice={currentDevice}
              isBuilder
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
            />
          </div>
        </main>

        <PropertiesPanel
          selectedSection={selectedSection}
          config={config}
          slug={slug}
          onUpdateField={updateSectionField}
          onUpdateTheme={(k, v) => updateConfig((prev) => ({ ...prev, theme: { ...prev.theme, [k]: v } }))}
          onOpenVariantPicker={() => setShowVariantPicker(true)}
          pendingImages={pendingImages}
          setPendingImages={setPendingImages}
        />
      </div>

      {showSectionPicker && (
        <SectionPicker
          pageType={activePage?.pageType || PAGE_TYPES.HOME}
          onSelect={(type, variant) => handleAddSection(type, variant)}
          onClose={() => setShowSectionPicker(false)}
        />
      )}

      {showVariantPicker && selectedSection && (
        <VariantPicker
          type={selectedSection.type}
          currentVariant={selectedSection.variant}
          onSelect={handleVariantChange}
          onClose={() => setShowVariantPicker(false)}
        />
      )}
    </div>
  );
}

// ============================================================
// DEFAULT HOME PAGE
// ============================================================
function createDefaultHomePage() {
  const types = ["navbar", "announcementBar", "hero", "categories", "products", "testimonials", "cta", "footer"];
  const sections = types.map((t, i) => createSection(t, null, i)).filter(Boolean);
  return {
    id: genId("page"),
    name: "الرئيسية",
    slug: "",
    pageType: PAGE_TYPES.HOME,
    order: 0,
    visible: true,
    sections,
  };
}

// ============================================================
// LOADING / ERROR
// ============================================================
function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-100">
      <Loader2 className="animate-spin mb-4" size={40} />
      <span className="text-sm font-bold">جاري تحميل المحرر...</span>
    </div>
  );
}

function ErrorScreen({ msg }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-100">
      <AlertCircle size={48} className="mb-4 text-red-500" />
      <span className="text-sm font-bold text-red-600">{msg || "خطأ"}</span>
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({
  slug, saving, device, setDevice, onSave, onPublish,
  onUndo, onRedo, canUndo, canRedo, status, pendingCount = 0,
}) {
  return (
    <header className="h-16 border-b bg-white px-5 flex items-center justify-between z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A2947] to-[#1e4064] text-white flex items-center justify-center shadow-md">
          <Home size={16} />
        </div>
        <span className="font-black text-sm">محرر المتجر</span>
        <span className="text-[11px] font-mono bg-neutral-100 px-2.5 py-1 rounded-lg">{slug}</span>
        <span
          className={`text-[10px] px-2.5 py-1 rounded-lg font-bold ${
            status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {status === "published" ? "منشور" : "مسودة"}
        </span>
      </div>

      <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-xl">
        {[
          { key: "desktop", Icon: Monitor },
          { key: "tablet", Icon: Tablet },
          { key: "mobile", Icon: Smartphone },
        ].map(({ key, Icon }) => (
          <button
            key={key}
            onClick={() => setDevice(key)}
            className={`p-2 rounded-lg transition-all ${
              device === key ? "bg-white shadow-sm text-[#0A2947]" : "opacity-50 hover:opacity-100"
            }`}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onUndo} disabled={!canUndo} className="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-30">
          <Undo size={16} />
        </button>
        <button onClick={onRedo} disabled={!canRedo} className="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-30">
          <Redo size={16} />
        </button>

        <button
          onClick={onSave}
          disabled={saving}
          className={`text-xs font-bold px-4 py-2.5 rounded-xl border-2 transition flex items-center gap-1.5 ${
            pendingCount > 0
              ? "border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100"
              : "border-neutral-200 hover:border-[#0A2947]"
          }`}
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              جاري الرفع...
            </>
          ) : (
            <>
              <Save size={14} />
              حفظ
              {pendingCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </>
          )}
        </button>

        <button
          onClick={onPublish}
          disabled={saving}
          className="text-xs font-bold px-5 py-2.5 rounded-xl bg-[#0A2947] text-white hover:bg-[#1e4064] disabled:opacity-50 shadow-md hover:shadow-lg transition"
        >
          نشر
        </button>
      </div>
    </header>
  );
}

// ============================================================
// RIGHT SIDEBAR
// ============================================================
function RightSidebar(props) {
  const {
    activeTab, setActiveTab, activePage, config, activePageSlug, setActivePageSlug,
    selectedSectionId, setSelectedSectionId,
    onOpenSectionPicker, onDeleteSection, onDuplicateSection, onMoveSection, onToggleVisible,
    onAddPage, onDeletePage, onApplyTemplate,
  } = props;

  const [showPagePicker, setShowPagePicker] = useState(false);

  return (
    <aside className="w-80 bg-white border-s border-neutral-200 flex flex-col z-20">
      <div className="flex border-b border-neutral-200">
        {[
          { key: "sections", label: "السكاشن", Icon: Layout },
          { key: "pages", label: "الصفحات", Icon: FileText },
          { key: "templates", label: "القوالب", Icon: Sparkles },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3.5 flex items-center justify-center gap-2 font-bold text-xs transition-all ${
              activeTab === key
                ? "text-[#0A2947] border-b-2 border-[#0A2947] bg-neutral-50"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === "sections" && (
          <>
            <button
              onClick={onOpenSectionPicker}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0A2947] to-[#1e4064] text-white font-bold text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
            >
              <Plus size={16} /> إضافة سكشن جديد
            </button>

            <div className="space-y-2 mt-3">
              {activePage.sections.map((sec, idx) => {
                const meta = getSectionMeta(sec.type);
                const isSelected = selectedSectionId === sec.id;
                const isHidden = sec.visible === false;
                return (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSectionId(sec.id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#0A2947] bg-neutral-50 shadow-sm"
                        : "border-transparent bg-neutral-50/50 hover:bg-neutral-100"
                    } ${isHidden ? "opacity-40" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg">{meta?.icon}</span>
                        <span className="text-xs font-bold truncate">{meta?.label || sec.type}</span>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); onToggleVisible(sec.id); }}
                          className="p-1 rounded hover:bg-white"
                        >
                          {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDuplicateSection(sec.id); }}
                          className="p-1 rounded hover:bg-white"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteSection(sec.id); }}
                          className="p-1 rounded text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-neutral-500">
                        #{idx + 1} · {sec.variant}
                      </span>
                      <div className="flex gap-0.5">
                        <button
                          disabled={idx === 0}
                          onClick={(e) => { e.stopPropagation(); onMoveSection(idx, "up"); }}
                          className="p-1 rounded hover:bg-white disabled:opacity-20"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          disabled={idx === activePage.sections.length - 1}
                          onClick={(e) => { e.stopPropagation(); onMoveSection(idx, "down"); }}
                          className="p-1 rounded hover:bg-white disabled:opacity-20"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "pages" && (
          <>
            <button
              onClick={() => setShowPagePicker(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0A2947] to-[#1e4064] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Plus size={16} /> صفحة جديدة
            </button>
            <div className="space-y-2 mt-3">
              {config.pages.map((p) => (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border-2 flex items-center justify-between transition-all ${
                    activePageSlug === p.slug
                      ? "border-[#0A2947] bg-neutral-50"
                      : "border-transparent bg-neutral-50/50 hover:bg-neutral-100"
                  }`}
                >
                  <button
                    onClick={() => { setActivePageSlug(p.slug); setSelectedSectionId(null); }}
                    className="flex-1 text-start"
                  >
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">/{p.slug || "home"}</div>
                  </button>
                  {config.pages.length > 1 && (
                    <button onClick={() => onDeletePage(p.slug)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "templates" && <TemplatesTab onApply={onApplyTemplate} />}
      </div>

      {showPagePicker && (
        <PagePicker
          existingPages={config.pages}
          onSelect={(def) => {
            onAddPage(def.label, def.slug || def.type, def.type);
            setShowPagePicker(false);
          }}
          onClose={() => setShowPagePicker(false)}
        />
      )}
    </aside>
  );
}

// ============================================================
// TEMPLATES TAB
// ============================================================
function TemplatesTab({ onApply }) {
  const templates = getTemplateList();

  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
        ⚠️ تطبيق قالب جديد سيستبدل كل الصفحات والسكاشن الحالية. تأكد من حفظ العمل أولاً.
      </div>

      {templates.map((tpl) => (
        <button
          key={tpl.key}
          onClick={() => {
            if (confirm(`تطبيق قالب "${tpl.name}"؟ سيستبدل كل المحتوى الحالي.`)) {
              onApply(TEMPLATES[tpl.key]);
            }
          }}
          className="w-full text-start p-3 rounded-xl border-2 border-neutral-200 hover:border-[#0A2947] hover:shadow-md transition-all group"
        >
          <div className="flex gap-3">
            <img
              src={tpl.thumbnail}
              alt={tpl.name}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-xs text-[#0A2947] truncate">{tpl.name}</h4>
                {tpl.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 shrink-0">
                    {tpl.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-500 leading-relaxed mb-2">{tpl.description}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                <span>📄 {tpl.pageCount} صفحة</span>
                <span>📦 {tpl.sectionCount} سكشن</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                {["primaryColor", "secondaryColor", "backgroundColor"].map((k) => (
                  <div
                    key={k}
                    className="w-3 h-3 rounded-full border border-neutral-200"
                    style={{ backgroundColor: tpl.theme[k] }}
                  />
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// PAGE PICKER
// ============================================================
function PagePicker({ existingPages, onSelect, onClose }) {
  const existingTypes = existingPages.map((p) => p.pageType);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-black text-lg text-[#0A2947]">اختر نوع الصفحة</h3>
            <p className="text-xs text-neutral-500 mt-1">كل صفحة هتيجي مع السكاشن المناسبة لها تلقائياً</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PAGE_DEFINITIONS.map((def) => {
            const exists =
              existingTypes.includes(def.type) &&
              def.type !== PAGE_TYPES.CUSTOM &&
              def.type !== PAGE_TYPES.HOME;
            return (
              <button
                key={def.type}
                onClick={() => !exists && onSelect(def)}
                disabled={exists}
                className={`p-5 rounded-2xl border-2 text-start transition-all ${
                  exists
                    ? "border-neutral-100 bg-neutral-50 opacity-50 cursor-not-allowed"
                    : "border-neutral-200 hover:border-[#0A2947] hover:shadow-lg"
                }`}
              >
                <div className="text-4xl mb-3">{def.icon}</div>
                <div className="font-black text-sm mb-1 text-[#0A2947]">{def.label}</div>
                <div className="text-[10px] text-neutral-500 font-mono mb-2">/{def.slug || "home"}</div>
                <div className="text-[10px] text-neutral-500">{def.defaultSections.length} سكاشن</div>
                {exists && <div className="text-[10px] text-amber-600 font-bold mt-2">✓ موجودة بالفعل</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROPERTIES PANEL
// ============================================================
function PropertiesPanel({
  selectedSection,
  config,
  slug,
  onUpdateField,
  onUpdateTheme,
  onOpenVariantPicker,
  pendingImages,
  setPendingImages,
}) {
  if (!selectedSection) {
    return (
      <aside className="w-80 bg-white border-e border-neutral-200 overflow-y-auto p-4 space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200">
          <h3 className="font-black text-sm mb-1">الإعدادات العامة</h3>
          <p className="text-neutral-500 text-[11px] leading-relaxed">
            اختر سكشن من اليمين لتعديله، أو عدّل الثيم العام من هنا.
          </p>
        </div>

        <Accordion title="الألوان" defaultOpen icon={<Palette size={14} />}>
          {[
            { k: "primaryColor", l: "اللون الأساسي" },
            { k: "secondaryColor", l: "اللون الثانوي" },
            { k: "backgroundColor", l: "لون الخلفية" },
            { k: "surfaceColor", l: "خلفية البطاقات" },
            { k: "textPrimaryColor", l: "النص الأساسي" },
            { k: "textSecondaryColor", l: "النص الثانوي" },
          ].map(({ k, l }) => (
            <ColorControl
              key={k}
              label={l}
              value={config.theme[k] || "#ffffff"}
              onChange={(v) => onUpdateTheme(k, v)}
            />
          ))}
        </Accordion>

        <Accordion title="الخط والحواف" defaultOpen icon={<Type size={14} />}>
          <SelectControl
            label="نوع الخط"
            value={config.theme.fontFamily || ""}
            onChange={(v) => onUpdateTheme("fontFamily", v)}
            options={[
              { value: "'Cairo', Arial, sans-serif", label: "Cairo (عصري)" },
              { value: "'Tajawal', Arial, sans-serif", label: "Tajawal (نظيف)" },
              { value: "'Almarai', sans-serif", label: "Almarai (ودود)" },
              { value: "'El Messiri', sans-serif", label: "El Messiri (أنيق)" },
              { value: "'Amiri', serif", label: "Amiri (فخم)" },
              { value: "system-ui, sans-serif", label: "System Default" },
            ]}
          />

          <SelectControl
            label="نمط الظل"
            value={config.theme.shadow || "soft"}
            onChange={(v) => onUpdateTheme("shadow", v)}
            options={[
              { value: "flat", label: "بدون" },
              { value: "soft", label: "ناعم" },
              { value: "dramatic", label: "قوي" },
            ]}
          />

          <SliderControl
            label="استدارة الحواف"
            value={parseInt(config.theme.radius) || 12}
            min={0}
            max={40}
            onChange={(v) => onUpdateTheme("radius", `${v}px`)}
            suffix="px"
          />
        </Accordion>
      </aside>
    );
  }

  const meta = getSectionMeta(selectedSection.type);
  const content = selectedSection.content || {};
  const schema = getFieldSchema(selectedSection.type);

  const contentKeys = Object.keys(content);
  const schemaKeys = Object.keys(schema);
  const allKeys = Array.from(new Set([...contentKeys, ...schemaKeys]));

  const fieldKeys = allKeys.filter((k) => {
    if (
      [
        "items", "links", "categories", "columns", "social", "stats",
        "events", "paragraphs", "benefits", "productCards", "images", "variants",
      ].includes(k)
    ) {
      return false;
    }

    const val = content[k];
    const fieldSchema = schema[k];

    if (fieldSchema) return true;

    if (val && typeof val === "object" && !Array.isArray(val)) {
      if ("url" in val || "publicId" in val) return true;
      return false;
    }

    if (val === null) return true;

    return !Array.isArray(val) && typeof val !== "object";
  });

  return (
    <aside className="w-80 bg-white border-e border-neutral-200 overflow-y-auto p-4 space-y-3 text-xs">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A2947] to-[#1e4064] text-white flex items-center justify-between shadow-lg">
        <div className="min-w-0">
          <h3 className="font-black text-sm truncate">{meta?.label || selectedSection.type}</h3>
          <span className="text-[10px] opacity-70 font-mono">{selectedSection.variant}</span>
        </div>
        <Sparkles size={18} className="opacity-70 shrink-0" />
      </div>

      <button
        onClick={onOpenVariantPicker}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#a4714a] text-white font-bold text-xs hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        🎨 تغيير التصميم
      </button>

      <Accordion title="المحتوى" defaultOpen icon={<FileText size={14} />}>
        {fieldKeys.length === 0 && (
          <p className="text-[11px] text-neutral-400 py-2">لا توجد حقول نصية.</p>
        )}
        {fieldKeys.map((key) => {
          const value = content[key];
          const fieldSchema = schema[key] || {};
          return (
            <FieldRenderer
              key={key}
              fieldKey={key}
              value={value}
              schema={fieldSchema}
              slug={slug}
              onChange={(v) => onUpdateField(`content.${key}`, v)}
              pendingImages={pendingImages}
              setPendingImages={setPendingImages}
            />
          );
        })}
      </Accordion>

      {/* ⭐ محرر العناصر */}
      {Array.isArray(content.items) && content.items.length > 0 && (
        <Accordion
          title={`العناصر (${content.items.length})`}
          icon={<Layers size={14} />}
          defaultOpen={false}
        >
          {content.items.map((item, idx) => (
            <ItemEditor
              key={item.id || idx}
              item={item}
              index={idx}
              sectionType={selectedSection.type}
              onUpdate={(key, value) => {
                const newItems = [...content.items];
                newItems[idx] = { ...newItems[idx], [key]: value };
                onUpdateField("content.items", newItems);
              }}
              onDelete={() => {
                if (!confirm(`حذف العنصر "${item.title || item.name || idx + 1}"؟`)) return;
                const newItems = content.items.filter((_, i) => i !== idx);
                onUpdateField("content.items", newItems);
              }}
              onDuplicate={() => {
                const clone = {
                  ...JSON.parse(JSON.stringify(item)),
                  id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                };
                const newItems = [...content.items];
                newItems.splice(idx + 1, 0, clone);
                onUpdateField("content.items", newItems);
              }}
              slug={slug}
              pendingImages={pendingImages}
              setPendingImages={setPendingImages}
            />
          ))}

          <button
            onClick={() => {
              const newItem = {
                id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                icon: "⭐",
                title: "عنصر جديد",
                description: "الوصف هنا",
              };
              onUpdateField("content.items", [...content.items, newItem]);
            }}
            className="w-full py-2.5 rounded-lg border-2 border-dashed border-neutral-300 text-xs font-bold text-neutral-500 hover:border-[#0A2947] hover:text-[#0A2947] transition"
          >
            + إضافة عنصر جديد
          </button>
        </Accordion>
      )}

      <Accordion title="المظهر" icon={<Palette size={14} />}>
        <ColorControl
          label="لون الخلفية"
          value={selectedSection.style?.backgroundColor || "#ffffff"}
          onChange={(v) => onUpdateField("style.backgroundColor", v)}
        />
        <ColorControl
          label="لون النص"
          value={selectedSection.style?.color || "#000000"}
          onChange={(v) => onUpdateField("style.color", v)}
        />
      </Accordion>

      <Accordion title="المسافات" icon={<Layers size={14} />}>
        <div className="p-3 rounded-lg bg-neutral-50 space-y-3">
          <div className="text-[10px] font-bold text-neutral-500 uppercase">
            حشو داخلي (Padding)
          </div>
          <SpacingControl
            values={selectedSection.style?.spacing?.padding || {}}
            onChange={(side, v) => onUpdateField(`style.spacing.padding.${side}`, v)}
          />
        </div>

        <div className="p-3 rounded-lg bg-neutral-50 space-y-3">
          <div className="text-[10px] font-bold text-neutral-500 uppercase">
            هامش خارجي (Margin)
          </div>
          <SpacingControl
            values={selectedSection.style?.spacing?.margin || {}}
            onChange={(side, v) => onUpdateField(`style.spacing.margin.${side}`, v)}
          />
        </div>
      </Accordion>
    </aside>
  );
}

// ============================================================
// ITEM EDITOR — محرر لكل عنصر في items
// ============================================================
function ItemEditor({
  item,
  index,
  sectionType,
  onUpdate,
  onDelete,
  onDuplicate,
  slug,
  pendingImages,
  setPendingImages,
}) {
  const [open, setOpen] = useState(false);

  const getFields = () => {
    const common = ["icon", "title", "description", "image", "number"];

    const byType = {
      services: ["icon", "title", "description", "image"],
      testimonials: ["name", "role", "text", "rating", "avatar", "image"],
      team: ["name", "role", "image"],
      brands: ["name", "logo", "url"],
      stats: ["value", "label", "icon"],
      faq: ["question", "answer"],
      categories: ["name", "image", "count"],
      products: ["name", "price", "oldPrice", "image", "badge", "rating", "description"],
      story: ["year", "title", "description"],
      contact: ["title", "value", "icon"],
      default: common,
    };

    return byType[sectionType] || byType.default;
  };

  const fields = getFields();
  const itemKeys = Object.keys(item).filter(
    (k) => !["id", "_pendingKey"].includes(k) && typeof item[k] !== "object"
  );

  const allFields = Array.from(new Set([...fields, ...itemKeys]));

  const displayName =
    item.title ||
    item.name ||
    item.question ||
    item.label ||
    `العنصر ${index + 1}`;

  const displayIcon = item.icon || (item.image?.url ? "🖼️" : "📝");

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-2.5 flex items-center justify-between hover:bg-neutral-50 transition"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg shrink-0">{displayIcon}</span>
          <span className="text-xs font-bold truncate">{displayName}</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </div>
      </button>

      <div className="flex items-center justify-end gap-0.5 px-2 pb-1.5 -mt-1">
        <button
          onClick={onDuplicate}
          className="p-1 rounded hover:bg-neutral-100 text-neutral-500"
          title="تكرار"
        >
          <Copy size={11} />
        </button>
        <button
          onClick={onDelete}
          className="p-1 rounded text-red-500 hover:bg-red-50"
          title="حذف"
        >
          <Trash2 size={11} />
        </button>
      </div>

      {open && (
        <div className="px-2.5 pb-2.5 pt-2 space-y-2 border-t bg-neutral-50/50">
          {allFields.map((fieldKey) => {
            const value = item[fieldKey];

            if (["image", "logo", "avatar"].includes(fieldKey)) {
              return (
                <ImageControl
                  key={fieldKey}
                  label={getItemFieldLabel(fieldKey)}
                  value={value}
                  onChange={(v) => onUpdate(fieldKey, v)}
                  slug={slug}
                  fieldKey={`${item.id || index}_${fieldKey}`}
                  pendingImages={pendingImages}
                  setPendingImages={setPendingImages}
                />
              );
            }

            if (fieldKey === "rating") {
              return (
                <NumberControl
                  key={fieldKey}
                  label="التقييم (1-5)"
                  value={value ?? 5}
                  onChange={(v) => onUpdate(fieldKey, Number(v))}
                  min={0}
                  max={5}
                />
              );
            }

            if (typeof value === "number") {
              return (
                <NumberControl
                  key={fieldKey}
                  label={getItemFieldLabel(fieldKey)}
                  value={value}
                  onChange={(v) => onUpdate(fieldKey, Number(v))}
                />
              );
            }

            if (typeof value === "boolean") {
              return (
                <ToggleControl
                  key={fieldKey}
                  label={getItemFieldLabel(fieldKey)}
                  value={value}
                  onChange={(v) => onUpdate(fieldKey, v)}
                />
              );
            }

            const isLong =
              ["description", "text", "answer", "subtitle", "story"].includes(fieldKey) ||
              (typeof value === "string" && value.length > 60);

            return (
              <TextControl
                key={fieldKey}
                label={getItemFieldLabel(fieldKey)}
                value={value ?? ""}
                onChange={(v) => onUpdate(fieldKey, v)}
                multiline={isLong}
              />
            );
          })}

          <div className="pt-1 border-t text-[10px] text-neutral-400 flex justify-between">
            <span>الترتيب: #{index + 1}</span>
            <span className="font-mono">ID: {item.id?.slice(0, 12)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ⭐ ترجمة أسماء حقول العناصر
function getItemFieldLabel(key) {
  const labels = {
    icon: "الأيقونة (إيموجي)",
    title: "العنوان",
    description: "الوصف",
    image: "الصورة",
    logo: "اللوجو",
    avatar: "الصورة الشخصية",
    number: "الرقم",
    name: "الاسم",
    role: "الدور/الوظيفة",
    text: "النص",
    rating: "التقييم",
    question: "السؤال",
    answer: "الإجابة",
    value: "القيمة",
    label: "التسمية",
    count: "العدد",
    price: "السعر",
    oldPrice: "السعر القديم",
    badge: "الشارة",
    currency: "العملة",
    url: "الرابط",
    year: "السنة",
    inStock: "متوفر",
  };
  return labels[key] || key;
}

// ============================================================
// SPACING CONTROL
// ============================================================
function SpacingControl({ values = {}, onChange }) {
  const safeValues = {
    top: values.top || "0px",
    right: values.right || "0px",
    bottom: values.bottom || "0px",
    left: values.left || "0px",
  };

  const handleChange = (side, v) => {
    const num = parseInt(v) || 0;
    onChange(side, `${num}px`);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {[
          { side: "top", label: "أعلى" },
          { side: "right", label: "يمين" },
          { side: "bottom", label: "أسفل" },
          { side: "left", label: "يسار" },
        ].map(({ side, label }) => (
          <div key={side}>
            <label className="block text-[10px] text-neutral-500 mb-1">{label}</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={parseInt(safeValues[side]) || 0}
                onChange={(e) => handleChange(side, e.target.value)}
                className="w-full border border-neutral-200 rounded px-2 py-1 text-[11px] text-center focus:outline-none focus:border-[#0A2947]"
              />
              <span className="text-[10px] text-neutral-400">px</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 pt-1">
        {[
          { label: "بدون", v: 0 },
          { label: "S", v: 8 },
          { label: "M", v: 16 },
          { label: "L", v: 32 },
          { label: "XL", v: 64 },
        ].map(({ label, v }) => (
          <button
            key={label}
            onClick={() => {
              ["top", "right", "bottom", "left"].forEach((s) => onChange(s, `${v}px`));
            }}
            className="text-[10px] px-2 py-1 rounded border border-neutral-200 hover:bg-[#0A2947] hover:text-white transition"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// LINK SELECT
// ============================================================
function LinkSelect({ label, value, onChange }) {
  const [custom, setCustom] = useState(false);

  const isInternal = INTERNAL_PAGES.some((p) => p.value === value);
  const isExternal = EXTERNAL_LINKS.some((l) => l.value === value);

  return (
    <div>
      <label className="block text-[11px] font-semibold text-neutral-600 mb-1.5">
        {label}
      </label>

      <div className="flex gap-1 mb-2">
        {[
          { key: "internal", label: "صفحة" },
          { key: "external", label: "موقع" },
          { key: "custom", label: "مخصص" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => {
              if (t.key === "custom") {
                setCustom(true);
                onChange("");
              } else {
                setCustom(false);
              }
            }}
            className={`flex-1 py-1.5 rounded text-[10px] font-bold border transition ${
              (t.key === "internal" && !custom && (isInternal || !isExternal)) ||
              (t.key === "external" && !custom && isExternal) ||
              (t.key === "custom" && custom)
                ? "bg-[#0A2947] text-white border-[#0A2947]"
                : "border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!custom ? (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0A2947]"
        >
          <option value="">— اختر —</option>

          {!isExternal && (
            <optgroup label="📄 صفحات الموقع">
              {INTERNAL_PAGES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </optgroup>
          )}

          {!isInternal && (
            <optgroup label="🌐 مواقع خارجية">
              {EXTERNAL_LINKS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </optgroup>
          )}
        </select>
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0A2947]"
        />
      )}

      {value && (
        <div className="text-[10px] text-neutral-400 mt-1 font-mono truncate">
          → {value}
        </div>
      )}
    </div>
  );
}

// ============================================================
// FIELD RENDERER
// ============================================================
function FieldRenderer({
  fieldKey,
  value,
  schema,
  slug,
  onChange,
  pendingImages,
  setPendingImages,
}) {
  const { type, label, options, min, max, step, suffix } = schema;

  if (type === "image") {
    return (
      <ImageControl
        label={label || fieldKey}
        value={value}
        onChange={onChange}
        slug={slug}
        fieldKey={fieldKey}
        pendingImages={pendingImages}
        setPendingImages={setPendingImages}
      />
    );
  }

  if (LINK_FIELDS.includes(fieldKey) || type === "link") {
    return <LinkSelect label={label || fieldKey} value={value} onChange={onChange} />;
  }

  if (!type) {
    if (typeof value === "boolean") {
      return <ToggleControl label={label || fieldKey} value={value} onChange={onChange} />;
    }
    if (typeof value === "number") {
      return <NumberControl label={label || fieldKey} value={value} onChange={onChange} min={min} max={max} />;
    }
    if (["image", "logo", "backgroundImage", "avatar", "favicon"].includes(fieldKey)) {
      return (
        <ImageControl
          label={label || fieldKey}
          value={value}
          onChange={onChange}
          slug={slug}
          fieldKey={fieldKey}
          pendingImages={pendingImages}
          setPendingImages={setPendingImages}
        />
      );
    }
    return (
      <TextControl
        label={label || fieldKey}
        value={value}
        onChange={onChange}
        multiline={["subtitle", "description", "answer", "text"].includes(fieldKey)}
      />
    );
  }

  switch (type) {
    case "toggle":
      return <ToggleControl label={label} value={!!value} onChange={onChange} />;
    case "number":
      return <NumberControl label={label} value={value} onChange={onChange} min={min} max={max} />;
    case "slider":
      return <SliderControl label={label} value={value} onChange={onChange} min={min} max={max} step={step} suffix={suffix} />;
    case "select":
      return <SelectControl label={label} value={value} onChange={onChange} options={options || []} />;
    case "color":
      return <ColorControl label={label} value={value} onChange={onChange} />;
    case "textarea":
      return <TextControl label={label} value={value} onChange={onChange} multiline />;
    case "text":
    default:
      return <TextControl label={label} value={value} onChange={onChange} />;
  }
}

// ============================================================
// CONTROLS
// ============================================================
function TextControl({ label, value, onChange, multiline }) {
  return (
    <div>
      {label && (
        <label className="block text-[11px] font-semibold text-neutral-600 mb-1.5">{label}</label>
      )}
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:border-[#0A2947] focus:ring-2 focus:ring-[#0A2947]/10"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0A2947] focus:ring-2 focus:ring-[#0A2947]/10"
        />
      )}
    </div>
  );
}

function ToggleControl({ label, value, onChange }) {
  return (
    <label className="flex items-center justify-between py-1.5 cursor-pointer">
      <span className="text-[11px] font-semibold text-neutral-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
          value ? "bg-[#0A2947]" : "bg-neutral-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transform transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function NumberControl({ label, value, onChange, min, max }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-neutral-600 mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min ?? -Infinity, (Number(value) || 0) - 1))}
          className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 font-bold"
        >
          −
        </button>
        <input
          type="number"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          min={min}
          max={max}
          className="flex-1 border border-neutral-200 rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none focus:border-[#0A2947]"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max ?? Infinity, (Number(value) || 0) + 1))}
          className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange, min = 0, max = 100, step = 1, suffix = "" }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-semibold text-neutral-600">{label}</label>
        <span className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded">
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        value={value ?? min}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#0A2947]"
      />
    </div>
  );
}

function SelectControl({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-neutral-600 mb-1.5">{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          const found = options.find((o) => String(o.value) === v);
          onChange(found ? found.value : v);
        }}
        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0A2947] focus:ring-2 focus:ring-[#0A2947]/10"
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorControl({ label, value, onChange }) {
  const safeValue = value && /^#/.test(value) ? value : "#000000";
  return (
    <div>
      <label className="block text-[11px] font-semibold text-neutral-600 mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={safeValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-neutral-200 cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#0A2947]"
        />
      </div>
    </div>
  );
}

// ============================================================
// IMAGE CONTROL
// ============================================================
function ImageControl({
  label,
  value,
  onChange,
  slug,
  fieldKey,
  pendingImages,
  setPendingImages,
}) {
  const url = typeof value === "object" ? value?.url : value;
  const isPending = value?.publicId === "__PENDING__";
  const pendingKey = value?._pendingKey;

  const [mode, setMode] = useState(() => {
    if (!value) return "upload";
    if (isPending) return "upload";
    if (typeof value === "string" && value.startsWith("http")) return "url";
    if (typeof value === "object" && value.url && !value.publicId) return "url";
    return "upload";
  });

  const [urlInput, setUrlInput] = useState(() => {
    if (typeof value === "string") return value;
    if (value?.url && !isPending) return value.url;
    return "";
  });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (pendingKey && pendingImages.has(pendingKey)) {
      const old = pendingImages.get(pendingKey);
      if (old.previewUrl?.startsWith("blob:")) URL.revokeObjectURL(old.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    const key = `${fieldKey}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    setPendingImages((prev) => {
      const next = new Map(prev);
      next.set(key, { file, previewUrl, fieldKey });
      return next;
    });

    onChange({
      url: previewUrl,
      publicId: "__PENDING__",
      _pendingKey: key,
    });
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (pendingKey && pendingImages.has(pendingKey)) {
      const old = pendingImages.get(pendingKey);
      if (old.previewUrl?.startsWith("blob:")) URL.revokeObjectURL(old.previewUrl);
      setPendingImages((prev) => {
        const next = new Map(prev);
        next.delete(pendingKey);
        return next;
      });
    }

    onChange({
      url: trimmed,
      publicId: "",
    });
  };

  const handleDelete = () => {
    if (pendingKey && pendingImages.has(pendingKey)) {
      const old = pendingImages.get(pendingKey);
      if (old.previewUrl?.startsWith("blob:")) URL.revokeObjectURL(old.previewUrl);
      setPendingImages((prev) => {
        const next = new Map(prev);
        next.delete(pendingKey);
        return next;
      });
    }
    setUrlInput("");
    onChange(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-semibold text-neutral-600">{label}</label>
        {url && (
          <button
            onClick={handleDelete}
            className="text-[10px] text-red-500 hover:text-red-700 font-bold"
          >
            حذف
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-2">
        {[
          { key: "upload", label: "📤 رفع" },
          { key: "url", label: "🔗 رابط" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMode(tab.key)}
            className={`flex-1 py-1.5 rounded text-[10px] font-bold border transition ${
              mode === tab.key
                ? "bg-[#0A2947] text-white border-[#0A2947]"
                : "border-neutral-200 hover:bg-neutral-50 text-neutral-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {url && (
        <div className="relative mb-2 group">
          <img
            src={url}
            alt=""
            className="w-full h-32 object-cover rounded-lg border border-neutral-200"
          />
          {isPending && (
            <span className="absolute top-2 start-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
              ⏳ لم تُحفظ
            </span>
          )}
          {!isPending && value?.publicId === "" && value?.url && (
            <span className="absolute top-2 start-2 bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
              🔗 رابط خارجي
            </span>
          )}
          {!isPending && value?.publicId && value.publicId !== "" && (
            <span className="absolute top-2 start-2 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
              ☁️ Cloudinary
            </span>
          )}
          <button
            onClick={handleDelete}
            className="absolute top-2 end-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
            title="حذف"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {mode === "upload" && (
        <label className="block cursor-pointer">
          <span className="block text-center py-2.5 rounded-lg border-2 border-dashed border-neutral-200 text-xs font-bold text-neutral-500 hover:border-[#0A2947] hover:text-[#0A2947] transition">
            📤 {url ? "استبدال بصورة جديدة" : "اختر صورة من الجهاز"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      )}

      {mode === "url" && (
        <div className="space-y-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyUrl();
              }
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#0A2947]"
            dir="ltr"
          />
          <button
            onClick={handleApplyUrl}
            disabled={!urlInput.trim()}
            className="w-full py-2 rounded-lg bg-[#0A2947] text-white text-xs font-bold disabled:opacity-40 hover:bg-[#1e4064] transition"
          >
            تطبيق الرابط
          </button>
        </div>
      )}

      <p className="text-[9px] text-neutral-400 mt-2 leading-relaxed">
        💡 اختر صورة من الجهاز → تُرفع عند الحفظ. أو الصق رابط مباشر.
      </p>
    </div>
  );
}

// ============================================================
// ACCORDION
// ============================================================
function Accordion({ title, children, defaultOpen = false, icon }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-neutral-50"
      >
        <span className="flex items-center gap-2 text-xs font-bold">
          {icon}
          {title}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="px-3 pb-3 pt-3 space-y-3 border-t bg-neutral-50/50">{children}</div>}
    </div>
  );
}

// ============================================================
// SECTION PICKER
// ============================================================
function SectionPicker({ pageType, onSelect, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const available = getSectionsForPage(pageType);

  const grouped = available.reduce((acc, sec) => {
    if (!acc[sec.category]) acc[sec.category] = [];
    acc[sec.category].push(sec);
    return acc;
  }, {});

  if (selectedType) {
    const meta = getSectionMeta(selectedType);
    const variants = getSectionVariants(selectedType);
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-lg">{meta.label} — اختر تصميماً</h3>
              <p className="text-xs text-neutral-500">{variants.length} تصاميم متاحة</p>
            </div>
            <button onClick={onClose}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {variants.map((v) => (
              <button
                key={v.key}
                onClick={() => onSelect(selectedType, v.key)}
                className="p-4 border-2 border-neutral-200 rounded-xl hover:border-[#0A2947] transition text-start"
              >
                <div className="aspect-video mb-3 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-3xl">
                  {meta.icon}
                </div>
                <div className="font-bold text-sm mb-1">{v.name}</div>
                {v.description && <div className="text-xs text-neutral-500">{v.description}</div>}
              </button>
            ))}
          </div>
          <button onClick={() => setSelectedType(null)} className="mt-4 text-xs font-bold text-neutral-500">
            ← رجوع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-lg">إضافة سكشن</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        {Object.entries(grouped).map(([category, sections]) => (
          <div key={category} className="mb-6">
            <h4 className="text-xs font-bold text-neutral-500 mb-3 uppercase">
              {CATEGORY_LABELS[category] || category}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sections.map((sec) => (
                <button
                  key={sec.type}
                  onClick={() => setSelectedType(sec.type)}
                  className="p-4 border-2 border-neutral-200 rounded-xl hover:border-[#0A2947] transition text-center"
                >
                  <div className="text-3xl mb-2">{sec.icon}</div>
                  <div className="font-bold text-xs mb-1">{sec.label}</div>
                  <div className="text-[10px] text-neutral-500">
                    {Object.keys(sec.variants).length} تصاميم
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// VARIANT PICKER
// ============================================================
function VariantPicker({ type, currentVariant, onSelect, onClose }) {
  const meta = getSectionMeta(type);
  const variants = getSectionVariants(type);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-lg">اختر تصميماً</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((v) => (
            <button
              key={v.key}
              onClick={() => onSelect(v.key)}
              className={`p-4 border-2 rounded-xl transition text-start ${
                currentVariant === v.key
                  ? "border-[#0A2947] bg-neutral-50"
                  : "border-neutral-200 hover:border-[#0A2947]"
              }`}
            >
              <div className="aspect-video mb-3 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-3xl">
                {meta.icon}
              </div>
              <div className="font-bold text-sm mb-1">{v.name}</div>
              {v.description && <div className="text-xs text-neutral-500">{v.description}</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}