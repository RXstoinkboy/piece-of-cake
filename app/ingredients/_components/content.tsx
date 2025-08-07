"use client";

import { Empty } from "../../../components/molecules/empty-state";
import { List } from "./sections/_list";
import { Ingredient } from "./sections/_list/types";
import { useIngredients, useAddIngredient } from "@/lib/hooks/use-ingredients";

type ContentProps = {
  initialIngredients: Ingredient[];
};

export const Content = ({ initialIngredients }: ContentProps) => {
  const { data: ingredients = [], isLoading } =
    useIngredients(initialIngredients);
  const addIngredientMutation = useAddIngredient();

  const handleAddIngredient = async () => {
    addIngredientMutation.mutate({});
  };

  if (isLoading && !ingredients.length) {
    return <div>Ładowanie...</div>;
  }

  if (!ingredients.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Empty
          title="Brak składników"
          text="Dodaj pierwszy składnik, aby rozpocząć pracę."
          buttonText="Dodaj składnik"
          onClick={handleAddIngredient}
        />
      </div>
    );
  }

  return <List ingredients={ingredients} />;
};
