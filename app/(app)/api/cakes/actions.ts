"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";

type CakeInsert = Database["public"]["Tables"]["cakes"]["Insert"];
type CakeUpdate = Database["public"]["Tables"]["cakes"]["Update"];
type CakeRecipeInsert = Database["public"]["Tables"]["cake_recipes"]["Insert"];

type CreateCakePayload = CakeInsert & {
  recipes?: Pick<CakeRecipeInsert, "order" | "recipe_id">[];
};

type UpdateCakePayload = CakeUpdate & {
  id: string;
  recipes?: Pick<CakeRecipeInsert, "order" | "recipe_id">[];
};

type CakeSelect = Database["public"]["Tables"]["cakes"]["Row"];
type RecipeRow = Database["public"]["Tables"]["recipes"]["Row"];

export type Cake = CakeSelect & {
  cake_recipes: { recipe_id: Pick<RecipeRow, "id" | "name">; order: number }[];
};

export const createCake = async ({
  name,
  description,
  recipes,
}: CreateCakePayload) => {
  try {
    // 1. Insert the new cake
    const { data: cakeData, error: cakeError } = await supabase
      .from("cakes")
      .insert({ name, description })
      .select()
      .single();

    if (cakeError) {
      throw cakeError;
    }

    const newCakeId = cakeData?.id;

    if (!recipes?.length || !newCakeId) {
      revalidatePath("/");
      return { ...cakeData, cake_recipes: [] };
    }

    const cakeRecipesToInsert: CakeRecipeInsert[] = recipes.map((recipe) => ({
      cake_id: newCakeId,
      recipe_id: recipe.recipe_id,
      order: recipe.order,
    }));

    const { error: cakeRecipesError } = await supabase
      .from("cake_recipes")
      .insert(cakeRecipesToInsert);

    if (cakeRecipesError) {
      throw cakeRecipesError;
    }

    revalidatePath("/");
    return { ...cakeData, cake_recipes: cakeRecipesToInsert };
  } catch (error) {
    console.error("Error creating cake with recipes:", error);
    throw error;
  }
};

export const updateCake = async ({
  id,
  recipes,
  ...cakeUpdateData
}: UpdateCakePayload) => {
  try {
    // 1. Update the cake
    const { data: updatedCakeData, error: cakeError } = await supabase
      .from("cakes")
      .update(cakeUpdateData)
      .eq("id", id)
      .select()
      .single();

    if (cakeError) {
      throw cakeError;
    }

    // 2. Delete old cake_recipes to sync with new recipeIds
    const { error: deleteError } = await supabase
      .from("cake_recipes")
      .delete()
      .eq("cake_id", id);

    if (deleteError) {
      throw deleteError;
    }

    const updatedCakeId = updatedCakeData?.id;

    if (!recipes?.length || !updatedCakeId) {
      revalidatePath("/");
      return { ...updatedCakeData, cake_recipes: [] };
    }

    const cakeRecipesToInsert: CakeRecipeInsert[] = recipes.map((recipe) => ({
      cake_id: updatedCakeId,
      recipe_id: recipe.recipe_id,
      order: recipe.order,
    }));

    const { error: cakeRecipesError } = await supabase
      .from("cake_recipes")
      .insert(cakeRecipesToInsert);

    if (cakeRecipesError) {
      throw cakeRecipesError;
    }

    revalidatePath("/");
    return { ...updatedCakeData, cake_recipes: cakeRecipesToInsert };
  } catch (error) {
    console.error("Error updating cake with recipes:", error);
    throw error;
  }
};

export const getCakes = async (): Promise<Cake[]> => {
  try {
    const { data, error } = await supabase
      .from("cakes")
      .select("*, cake_recipes(recipe_id(name, id), order)")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching cakes:", error);
    throw error;
  }
};

export const deleteCake = async (id: string) => {
  try {
    const { error: cakeError } = await supabase
      .from("cakes")
      .delete()
      .eq("id", id);

    if (cakeError) {
      throw cakeError;
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting cake:", error);
    throw error;
  }
};
