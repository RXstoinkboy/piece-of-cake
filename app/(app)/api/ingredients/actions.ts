"use server";

import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";

type IngredientInsert = Database["public"]["Tables"]["ingredients"]["Insert"];
type IngredientUpdate = Database["public"]["Tables"]["ingredients"]["Update"];
export type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

export const createIngredient = async ({
  name,
  quantity,
  unit,
  price,
  currency,
}: IngredientInsert) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ingredients")
      .insert({
        name,
        quantity,
        unit,
        price,
        currency,
      })
      .select()
      .single();
    if (error) {
      throw error;
    }
    revalidatePath("/ingredients");
    revalidatePath("/recipes");

    return data;
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
}: IngredientUpdate & { id: string }) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ingredients")
      .update({
        name,
        quantity,
        unit,
        currency,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    revalidatePath("/ingredients");
    revalidatePath("/recipes");
    revalidatePath("/");

    return data;
  } catch (error) {
    console.error(`Error updating ingredient with ID ${id}:`, error);
    throw error;
  }
};

export const deleteIngredient = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ingredients")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    revalidatePath("/ingredients");
    revalidatePath("/recipes");
    revalidatePath("/");

    return data;
  } catch (error) {
    console.error(`Error deleting ingredient with ID ${id}:`, error);
    throw error;
  }
};

export const getIngredient = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ingredients")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error getting ingredient with ID ${id}:`, error);
    throw error;
  }
};

export const getIngredients = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ingredients")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting ingredients:", error);
    throw error;
  }
};
