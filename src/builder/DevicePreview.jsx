<<<<<<< HEAD
import React from "react";
import DynamicRenderer from "../renderer/DynamicRenderer";

export default function DevicePreview({
  config,
  activePageSlug,
  currentDevice,
  selectedSectionId,
  onSelectSection,
}) {
  const activePage =
    config.pages.find((p) => p.slug === activePageSlug) || config.pages[0];

  const deviceWidths = {
    desktop: "w-full max-w-full",
    tablet: "w-[768px] max-w-full shadow-2xl rounded-xl border border-gray-400 my-4",
    mobile: "w-[375px] max-w-full shadow-2xl rounded-2xl border-4 border-gray-800 my-4",
  };

  return (
    <div
      className="flex-1 bg-gray-100 overflow-y-auto flex justify-center items-start p-4 transition-all"
      onClick={() => onSelectSection(null)}
    >
      <div className={`transition-all duration-300 overflow-hidden bg-white ${deviceWidths[currentDevice]}`}>
        <DynamicRenderer
          pageConfig={activePage}
          themeConfig={config.theme}
          currentDevice={currentDevice}
          isBuilder={true}
          selectedSectionId={selectedSectionId}
          onSelectSection={onSelectSection}
        />
      </div>
    </div>
  );
=======
import React from "react";
import DynamicRenderer from "../renderer/DynamicRenderer";

export default function DevicePreview({
  config,
  activePageSlug,
  currentDevice,
  selectedSectionId,
  onSelectSection,
}) {
  const activePage =
    config.pages.find((p) => p.slug === activePageSlug) || config.pages[0];

  const deviceWidths = {
    desktop: "w-full max-w-full",
    tablet: "w-[768px] max-w-full shadow-2xl rounded-xl border border-gray-400 my-4",
    mobile: "w-[375px] max-w-full shadow-2xl rounded-2xl border-4 border-gray-800 my-4",
  };

  return (
    <div
      className="flex-1 bg-gray-100 overflow-y-auto flex justify-center items-start p-4 transition-all"
      onClick={() => onSelectSection(null)}
    >
      <div className={`transition-all duration-300 overflow-hidden bg-white ${deviceWidths[currentDevice]}`}>
        <DynamicRenderer
          pageConfig={activePage}
          themeConfig={config.theme}
          currentDevice={currentDevice}
          isBuilder={true}
          selectedSectionId={selectedSectionId}
          onSelectSection={onSelectSection}
        />
      </div>
    </div>
  );
>>>>>>> 36f8532 (Initial commit)
}