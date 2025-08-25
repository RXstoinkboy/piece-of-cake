"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    revalidatePath("/", "layout");
    redirect("/");

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    revalidatePath("/", "layout");
    redirect("/login");
  } catch (error) {
    throw error;
  }
};

// export const resetPassword
