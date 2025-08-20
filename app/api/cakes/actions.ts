"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";

type CakeInsert = Database["public"]["Tables"]["cakes"]["Insert"];
type CakeRecipeInsert = Database["public"]["Tables"]["cake_recipes"]["Insert"];

type CreateCakePayload = CakeInsert & {
  recipeIds?: string[];
};
type CakeSelect = Database["public"]["Tables"]["cakes"]["Row"];
type RecipeRow = Database["public"]["Tables"]["recipes"]["Row"];

export type Cake = CakeSelect & {
  cake_recipes: { recipe_id: Pick<RecipeRow, "id" | "name"> }[];
};

export const createCake = async ({
  name,
  description,
  recipeIds,
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

    if (!recipeIds?.length || !newCakeId) {
      revalidatePath("/");
      return { ...cakeData, cake_recipes: [] };
    }

    const cakeRecipesToInsert: CakeRecipeInsert[] = recipeIds.map(
      (recipeId) => ({
        cake_id: newCakeId,
        recipe_id: recipeId,
      }),
    );

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

export const getCakes = async () => {
  try {
    const { data, error } = await supabase
      .from("cakes")
      .select("*, cake_recipes(recipe_id(name, id))")
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
