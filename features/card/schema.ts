import { z } from "zod";

// Схема для RecipeItem
export const recipeItemSchema = z.object({
  name: z.string().default(""),
  quantity: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Количество должно содержать только цифры и точку")
    .default("0"),
  coefficient: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Коэффициент должен содержать только цифры и точку")
    .default("1"),
  unit: z.string().default(""),
});

// Дефолтные значения для RecipeItem
export const recipeItemDefaultValues = {
  name: "",
  quantity: "0",
  coefficient: "1",
  unit: "",
};

// Схема для CalculationCard
export const calculationCardSchema = z.object({
  portion: z.number().optional().default(0),
  cardId: z
    .string()
    .regex(/^\d+$/, "CardId должен содержать только цифры")
    .optional()
    .default(""),

  name: z.string().optional().default(""),
  unit: z.string().optional().default(""),
  category: z.string().optional().default(""),

  weight: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Вес должен содержать только цифры и точку")
    .optional()
    .default("0"),

  expirationPeriod: z.string().optional().default(""),
  description: z.string().optional().default(""),

  recipe: z.array(recipeItemSchema).optional().default([]),
});

// Дефолтные значения для CalculationCard
export const calculationCardDefaultValues = {
  cardId: "",
  name: "",
  unit: "",
  category: "",
  weight: "0",
  expirationPeriod: "",
  description: "",
  recipe: [],
};

// Типы TypeScript
export type RecipeItemType = z.infer<typeof recipeItemSchema>;

export type CalculationCardType = z.output<typeof calculationCardSchema>;
export type CalculationCardFormValues = z.input<typeof calculationCardSchema>;
