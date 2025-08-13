"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";

type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
type RecipeUpdate = Database["public"]["Tables"]["recipes"]["Update"];
type RecipeSelect = Database["public"]["Tables"]["recipes"]["Row"];

export const createRecipe = async ({ name, description }: RecipeInsert) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .insert({ name, description })
      .select()
      .single();
    if (error) {
      throw error;
    }
    revalidatePath("/recipes");
    revalidatePath("/ingredients"); // Recipes are related to ingredients, so revalidate both.
    return data;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

export const updateRecipe = async ({
  id,
  name,
  description,
}: RecipeUpdate & { id: string }) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .update({ name, description })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    revalidatePath("/recipes");
    revalidatePath("/ingredients");
    return data;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    revalidatePath("/recipes");
    revalidatePath("/ingredients");
    return data;
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
