"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

export const createIngredient = async ({
  name,
  quantity,
  unit,
  price,
  currency,
}: Prisma.IngredientCreateInput) => {
  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        quantity,
        unit,
        price,
        currency,
      },
    });
    revalidatePath("/ingredients");
    revalidatePath("/recipes");
    return ingredient;
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw error;
  }
};

export const updateIngredient = async ({
  id,
  name,
  quantity,
  unit,
  currency,
}: Prisma.IngredientUpdateInput & { id: string }) => {
  try {
    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: {
        name,
        quantity,
        unit,
        currency,
      },
    });
    revalidatePath("/ingredients");
    revalidatePath("/recipes");

    return ingredient;
  } catch (error) {
    console.error(`Error updating ingredient with ID ${id}:`, error);
    throw error;
  }
};

export const deleteIngredient = async (id: string) => {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: { id },
    });
    revalidatePath("/ingredients");
    revalidatePath("/recipes");

    return ingredient;
  } catch (error) {
    console.error(`Error deleting ingredient with ID ${id}:`, error);
    throw error;
  }
};

export const getIngredient = async (id: string) => {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id },
    });
    return ingredient;
  } catch (error) {
    console.error(`Error getting ingredient with ID ${id}:`, error);
    throw error;
  }
};

export const getIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
  } catch (error) {
    console.error("Error getting ingredients:", error);
    throw error;
  }
};
