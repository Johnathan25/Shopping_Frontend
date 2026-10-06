<<<<<<< HEAD
export const resolveSectionStyles = (style = {}, responsive = {}, currentDevice = "desktop") => {
  const deviceOverrides = responsive?.[currentDevice] || {};
  
  // دمج الـ Base Style مع استثناءات الجهاز المختار
  const mergedStyle = {
    ...style,
    ...deviceOverrides,
  };

  return {
    color: mergedStyle.color || "inherit",
    backgroundColor: mergedStyle.backgroundColor || "transparent",
    opacity: mergedStyle.opacity !== undefined ? mergedStyle.opacity : 1,
    borderWidth: mergedStyle.border?.width || "0px",
    borderStyle: mergedStyle.border?.type || "none",
    borderColor: mergedStyle.border?.color || "transparent",
    borderRadius: mergedStyle.border?.radius || "0px",
    marginTop: mergedStyle.spacing?.margin?.top || "0px",
    marginRight: mergedStyle.spacing?.margin?.right || "0px",
    marginBottom: mergedStyle.spacing?.margin?.bottom || "0px",
    marginLeft: mergedStyle.spacing?.margin?.left || "0px",
    paddingTop: mergedStyle.spacing?.padding?.top || "0px",
    paddingRight: mergedStyle.spacing?.padding?.right || "0px",
    paddingBottom: mergedStyle.spacing?.padding?.bottom || "0px",
    paddingLeft: mergedStyle.spacing?.padding?.left || "0px",
    fontSize: mergedStyle.text?.fontSize || "inherit",
    fontWeight: mergedStyle.text?.fontWeight || "inherit",
    lineHeight: mergedStyle.text?.lineHeight || "inherit",
    letterSpacing: mergedStyle.text?.letterSpacing || "inherit",
    textAlign: mergedStyle.text?.textAlign || "left",
    textTransform: mergedStyle.text?.textTransform || "none",
  };
=======
export const resolveSectionStyles = (style = {}, responsive = {}, currentDevice = "desktop") => {
  const deviceOverrides = responsive?.[currentDevice] || {};
  
  // دمج الـ Base Style مع استثناءات الجهاز المختار
  const mergedStyle = {
    ...style,
    ...deviceOverrides,
  };

  return {
    color: mergedStyle.color || "inherit",
    backgroundColor: mergedStyle.backgroundColor || "transparent",
    opacity: mergedStyle.opacity !== undefined ? mergedStyle.opacity : 1,
    borderWidth: mergedStyle.border?.width || "0px",
    borderStyle: mergedStyle.border?.type || "none",
    borderColor: mergedStyle.border?.color || "transparent",
    borderRadius: mergedStyle.border?.radius || "0px",
    marginTop: mergedStyle.spacing?.margin?.top || "0px",
    marginRight: mergedStyle.spacing?.margin?.right || "0px",
    marginBottom: mergedStyle.spacing?.margin?.bottom || "0px",
    marginLeft: mergedStyle.spacing?.margin?.left || "0px",
    paddingTop: mergedStyle.spacing?.padding?.top || "0px",
    paddingRight: mergedStyle.spacing?.padding?.right || "0px",
    paddingBottom: mergedStyle.spacing?.padding?.bottom || "0px",
    paddingLeft: mergedStyle.spacing?.padding?.left || "0px",
    fontSize: mergedStyle.text?.fontSize || "inherit",
    fontWeight: mergedStyle.text?.fontWeight || "inherit",
    lineHeight: mergedStyle.text?.lineHeight || "inherit",
    letterSpacing: mergedStyle.text?.letterSpacing || "inherit",
    textAlign: mergedStyle.text?.textAlign || "left",
    textTransform: mergedStyle.text?.textTransform || "none",
  };
>>>>>>> 36f8532 (Initial commit)
};