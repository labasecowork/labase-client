import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  categoryId: z.string().uuid("Categoría inválida"),
  content: z.string().min(1, "El contenido es obligatorio"),
});

export type CreateArticleData = z.infer<typeof createArticleSchema>;

// Helper function to prepare FormData for API submission
export function prepareArticleFormData(
  formData: CreateArticleData,
  bannerFile: File | null,
  contentFile: File | null,
): FormData {
  const apiFormData = new FormData();

  apiFormData.append("title", formData.title);
  apiFormData.append("categoryId", formData.categoryId);

  // Add banner file if available
  if (bannerFile) {
    apiFormData.append("banner", bannerFile);
  }

  // Add content file if available
  if (contentFile) {
    apiFormData.append("content", contentFile);
  }

  return apiFormData;
}
