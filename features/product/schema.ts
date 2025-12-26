import { z } from "zod";
import { CATEGORY_UNIT } from "./constants";

export const unitEnum = z.enum(
  CATEGORY_UNIT.map((u) => u.value) as ["kg", "l", "pcs"]
);

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  coefficient: z.string(),
  unit: unitEnum,
  category: z.string(),
  key: z.string(),
});

export type ProductType = z.infer<typeof productSchema>;

export const productDefaultValues = {
  name: "",
  coefficient: "",
  unit: undefined,
  category: undefined,
  key: "",
};
