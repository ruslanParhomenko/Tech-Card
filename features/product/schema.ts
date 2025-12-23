import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().default(""),
  coefficient: z.string().default(""),
  unit: z.string().default(""),
  productId: z.number().nullable().optional(),
});

export type ProductType = z.infer<typeof productSchema>;
export const productDefaultValues = productSchema.default({
  name: "",
  coefficient: "",
  unit: "",
  productId: null,
});
