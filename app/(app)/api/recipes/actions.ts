"use server";

import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";
import { getRecipeIngredients } from "./utils";
import { createClient } from "@/lib/supabase/server";

type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
type IngredientForRecipeInsert = Omit<
  Database["public"]["Tables"]["recipe_ingredients"]["Insert"],
  "recipe_id"
>;
type IngredientForRecipeUpdate =
  Database["public"]["Tables"]["recipe_ingredients"]["Insert"];
type RecipeUpdate = Database["public"]["Tables"]["recipes"]["Update"];

type CreateRecipePayload = RecipeInsert & {
  ingredients?: IngredientForRecipeInsert[];
};
type UpdateRecipePayload = RecipeUpdate & {
  ingredients?: IngredientForRecipeInsert[];
};
type IngredientDetails = Pick<
  Database["public"]["Tables"]["ingredients"]["Row"],
  "name" | "quantity" | "price" | "unit" | "currency" | "id"
>;

type RecipeIngredientJoin = {
  ingredient_id: IngredientDetails;
  quantity: Database["public"]["Tables"]["recipe_ingredients"]["Row"]["quantity"];
};

export type Recipe = Database["public"]["Tables"]["recipes"]["Row"] & {
  recipe_ingredients: RecipeIngredientJoin[];
  ingredients_cost: number;
  ingredients_cost_currency: string;
};

export const createRecipe = async ({
  name,
  description,
  ingredients,
}: CreateRecipePayload) => {
  try {
    const supabase = await createClient();
    // 1. Insert the new recipe
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipes")
      .insert({ name, description })
      .select()
      .single();

    if (recipeError) {
      throw recipeError;
    }

    const newRecipeId = recipeData?.id;

    if (!ingredients?.length || !newRecipeId) {
      revalidatePath("/recipes");

      return { ...recipeData, ingredients: [] };
    }

    const ingredientsToInsert = ingredients.map((ingredient) => ({
      recipe_id: newRecipeId,
      ingredient_id: ingredient.ingredient_id,
      quantity: ingredient.quantity,
    }));

    const { error: recipeIngredientsError } = await supabase
      .from("recipe_ingredients")
      .insert(ingredientsToInsert);

    if (recipeIngredientsError) {
      throw recipeIngredientsError;
    }

    revalidatePath("/recipes");

    return { ...recipeData, ingredients: ingredientsToInsert };
  } catch (error) {
    console.error("Error creating recipe with ingredients:", error);
    throw error;
  }
};

export const updateRecipe = async ({
  id,
  name,
  description,
  ingredients,
}: UpdateRecipePayload & { id: string }) => {
  try {
    const supabase = await createClient();
    const { data: recipeData, error } = await supabase
      .from("recipes")
      .update({ name, description })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }

    const { error: recipeIngredientsError } = await supabase
      .from("recipe_ingredients")
      .delete()
      .eq("recipe_id", id);
    if (recipeIngredientsError) {
      throw recipeIngredientsError;
    }

    if (!ingredients?.length) {
      revalidatePath("/recipes");

      return { ...recipeData, ingredients: [] };
    }

    const ingredientsToInsert: IngredientForRecipeUpdate[] = ingredients.map(
      (ingredient) => ({
        recipe_id: id,
        ingredient_id: ingredient.ingredient_id,
        quantity: ingredient.quantity,
      }),
    );

    const { error: newRecipeIngredientsError } = await supabase
      .from("recipe_ingredients")
      .insert(ingredientsToInsert)
      .select();
    if (newRecipeIngredientsError) {
      throw newRecipeIngredientsError;
    }

    revalidatePath("/recipes");
    revalidatePath("/");

    return { ...recipeData, recipe_ingredients: ingredientsToInsert };
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) {
      throw error;
    }
    revalidatePath("/recipes");
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw error;
  }
};

export const getRecipe = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error getting recipe with ID ${id}:`, error);
    throw error;
  }
};

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("recipes")
      .select(
        "id, name, description, created_at, updated_at, recipe_ingredients(ingredient_id(id, name, quantity, price, unit, currency), quantity)",
      )
      .order("created_at", { ascending: true });
    if (error) {
      throw error;
    }

    return getRecipeIngredients(data);
  } catch (error) {
    console.error("Error getting recipes:", error);
    throw error;
  }
};
