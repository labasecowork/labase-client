import { z } from "zod";

export const productSchema = z.object({
  productName: z.string(),
  productType: z.string(),
  productCategory: z.string(),
  sku: z.string(),
  barcode: z.string(),
  description: z.string(),
  isReturnable: z.boolean(),
  hasVariant: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
