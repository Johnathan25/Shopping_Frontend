import api from "../services/api";


export const uploadImage = async (file, slug, context = "section") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("context", context);

  const res = await api.post(`/websiteSettings/${slug}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data; // { url, publicId }
};

/**
 * Delete an image from Cloudinary.
 */
export const deleteImage = async (publicId, slug) => {
  if (!publicId) return;
  try {
    await api.delete(`/websiteSettings/${slug}/upload`, {
      data: { publicId },
    });
  } catch (e) {
    console.error("Delete image failed:", e);
  }
};