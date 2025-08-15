"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";

type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
type IngredientForRecipeInsert = Omit<
  Database["public"]["Tables"]["recipe_ingredients"]["Insert"],
  "recipe_id"
>;
type RecipeUpdate = Database["public"]["Tables"]["recipes"]["Update"];

type CreateRecipePayload = RecipeInsert & {
  ingredients?: IngredientForRecipeInsert[];
};
type UpdateRecipePayload = RecipeUpdate & {
  ingredients?: IngredientForRecipeInsert[];
};

export const createRecipe = async ({
  name,
  description,
  ingredients,
}: CreateRecipePayload) => {
  try {
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
      .eq("recipe_id", id)
      .select()
      .single();
    if (recipeIngredientsError) {
      throw recipeIngredientsError;
    }

    if (!ingredients?.length) {
      revalidatePath("/recipes");
      return { ...recipeData, ingredients: [] };
    }

    const ingredientsToInsert = ingredients.map((ingredient) => ({
      recipe_id: id,
      ingredient_id: ingredient.ingredient_id,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      notes: ingredient.notes,
    }));

    const { error: newRecipeIngredientsError } = await supabase
      .from("recipe_ingredients")
      .insert(ingredientsToInsert)
      .select()
      .single();
    if (newRecipeIngredientsError) {
      throw newRecipeIngredientsError;
    }

    revalidatePath("/recipes");
    return { ...recipeData, ingredients: ingredientsToInsert };
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
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

export const getRecipes = async () => {
  try {
    const { data, error } = await supabase.from("recipes").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting recipes:", error);
    throw error;
  }
};
