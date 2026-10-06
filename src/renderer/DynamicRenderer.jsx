<<<<<<< HEAD
import React from "react";
import { componentRegistry } from "./ComponentRegistry";
import { resolveSectionStyles } from "./StyleResolver";

export default function DynamicRenderer({
  pageConfig,
  themeConfig = {},
  currentDevice = "desktop",
  isBuilder = false,
  selectedSectionId = null,
  onSelectSection = () => {},
}) {
  if (!pageConfig || !pageConfig.sections) {
    return <div className="p-8 text-center text-gray-400">لا توجد سكاشن مضافة لهذه الصفحة.</div>;
  }

  const sortedSections = [...pageConfig.sections].sort((a, b) => a.order - b.order);

  return (
    <div
      className="w-full min-h-screen transition-all"
      style={{
        fontFamily: themeConfig.fontFamily || "sans-serif",
        backgroundColor: themeConfig.backgroundColor || "#ffffff",
        color: themeConfig.textPrimaryColor || "#000000",
      }}
    >
      {sortedSections.map((section) => {
        const Component = componentRegistry[section.type];
        if (!Component) {
          return null;
        }

        const resolvedStyles = resolveSectionStyles(section.style, section.responsive, currentDevice);
        const isSelected = isBuilder && selectedSectionId === section.id;

        return (
          <div
            key={section.id}
            onClick={(e) => {
              if (isBuilder) {
                e.stopPropagation();
                onSelectSection(section.id);
              }
            }}
            className={`relative transition-all ${
              isBuilder
                ? `cursor-pointer hover:ring-2 hover:ring-blue-400 ${
                    isSelected ? "ring-2 ring-blue-600 shadow-lg z-10" : ""
                  }`
                : ""
            }`}
          >
            {isBuilder && (
              <span
                className={`absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded shadow z-20 pointer-events-none ${
                  isSelected ? "bg-blue-600 text-white" : "bg-black/70 text-white"
                }`}
              >
                {section.type}
              </span>
            )}
            <Component
              content={section.content}
              style={section.style}
              layout={section.layout}
              resolvedStyles={resolvedStyles}
              theme={themeConfig}
              isBuilder={isBuilder}
            />
          </div>
        );
      })}
    </div>
  );
=======
import React from "react";
import { componentRegistry } from "./ComponentRegistry";
import { resolveSectionStyles } from "./StyleResolver";

export default function DynamicRenderer({
  pageConfig,
  themeConfig = {},
  currentDevice = "desktop",
  isBuilder = false,
  selectedSectionId = null,
  onSelectSection = () => {},
}) {
  if (!pageConfig || !pageConfig.sections) {
    return <div className="p-8 text-center text-gray-400">لا توجد سكاشن مضافة لهذه الصفحة.</div>;
  }

  const sortedSections = [...pageConfig.sections].sort((a, b) => a.order - b.order);

  return (
    <div
      className="w-full min-h-screen transition-all"
      style={{
        fontFamily: themeConfig.fontFamily || "sans-serif",
        backgroundColor: themeConfig.backgroundColor || "#ffffff",
        color: themeConfig.textPrimaryColor || "#000000",
      }}
    >
      {sortedSections.map((section) => {
        const Component = componentRegistry[section.type];
        if (!Component) {
          return null;
        }

        const resolvedStyles = resolveSectionStyles(section.style, section.responsive, currentDevice);
        const isSelected = isBuilder && selectedSectionId === section.id;

        return (
          <div
            key={section.id}
            onClick={(e) => {
              if (isBuilder) {
                e.stopPropagation();
                onSelectSection(section.id);
              }
            }}
            className={`relative transition-all ${
              isBuilder
                ? `cursor-pointer hover:ring-2 hover:ring-blue-400 ${
                    isSelected ? "ring-2 ring-blue-600 shadow-lg z-10" : ""
                  }`
                : ""
            }`}
          >
            {isBuilder && (
              <span
                className={`absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded shadow z-20 pointer-events-none ${
                  isSelected ? "bg-blue-600 text-white" : "bg-black/70 text-white"
                }`}
              >
                {section.type}
              </span>
            )}
            <Component
              content={section.content}
              style={section.style}
              layout={section.layout}
              resolvedStyles={resolvedStyles}
              theme={themeConfig}
              isBuilder={isBuilder}
            />
          </div>
        );
      })}
    </div>
  );
>>>>>>> 36f8532 (Initial commit)
}