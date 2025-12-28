"use server";

import { CalculationCardType } from "@/features/card/schema";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export type CardsGetData = CalculationCardType;

export async function createCard(data: {
  cardId: string;
  name: string;
  unit: string;
  category: string;
  weight: string;
  expirationPeriod: string;
  description?: string;
  portion: string;
  recipe?: {
    name: string;
    quantity: string;
    coefficient: string;
    unit: string;
    productId?: string;
  }[];
}) {
  return await prisma.calculationCard.create({
    data: {
      cardId: data.cardId,
      name: data.name,
      unit: data.unit,
      category: data.category,
      weight: data.weight,
      expirationPeriod: data.expirationPeriod,
      portion: data.portion,
      description: data.description || "",
      recipe: data.recipe
        ? {
            create: data.recipe.map((r) => ({
              name: r.name,
              quantity: r.quantity,
              coefficient: r.coefficient,
              unit: r.unit,
              productId: r.productId ? Number(r.productId) : undefined,
            })),
          }
        : undefined,
    },
    include: { recipe: true },
  });
}

export async function updateCard(
  id: number,
  data: {
    name?: string;
    unit?: string;
    category?: string;
    weight?: string;
    expirationPeriod?: string;
    description?: string;
    recipe?: {
      id?: number;
      name: string;
      quantity: string;
      coefficient: string;
      unit: string;
      productId?: number;
    }[];
  }
) {
  return await prisma.calculationCard.update({
    where: { id },
    data: {
      name: data.name,
      unit: data.unit,
      category: data.category,
      weight: data.weight,
      expirationPeriod: data.expirationPeriod,
      description: data.description,
      recipe: data.recipe
        ? {
            deleteMany: {},
            create: data.recipe.map((r) => ({ ...r })),
          }
        : undefined,
    },
    include: { recipe: true },
  });
}

// get all
export async function _getAllCards() {
  return await prisma.calculationCard.findMany({
    include: { recipe: true },
  });
}

export const getAllCards = unstable_cache(_getAllCards, ["cards"], {
  revalidate: false,
  tags: ["cards"],
});

// get by id

export async function getCardById(id: number) {
  return await prisma.calculationCard.findUnique({
    where: { id },
    include: { recipe: true },
  });
}

// get by product
export async function _getCardsByProduct(productId: number) {
  return await prisma.calculationCard.findMany({
    where: { recipe: { some: { productId } } },
    include: { recipe: true },
  });
}
export const getCardsByProduct = unstable_cache(_getCardsByProduct, ["cards"], {
  revalidate: false,
  tags: ["cards"],
});

// get by category
export async function _getCardsByCategory(category: string) {
  return await prisma.calculationCard.findMany({
    where: { category },
    include: { recipe: true },
  });
}
export const getCardsByCategory = unstable_cache(
  _getCardsByCategory,
  ["cards"],
  {
    revalidate: false,
    tags: ["cards"],
  }
);

export async function deleteCard(id: number) {
  return await prisma.calculationCard.delete({
    where: { id },
  });
}
