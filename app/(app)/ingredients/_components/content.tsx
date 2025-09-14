"use client";

import { Database } from "@/types/supabase";
import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { List } from "./sections/list";
import { AddIngredient } from "./sections/modals/add";
import { useOptimistic } from "react";
import { Ingredient } from "@/app/(app)/api/ingredients/actions";

type ContentProps = {
  ingredients: Database["public"]["Tables"]["ingredients"]["Row"][];
};

type IngredientAction =
  | { type: "ADD"; payload: Ingredient }
  | { type: "EDIT"; payload: Ingredient }
  | { type: "DELETE"; payload: { id: string } };

export const Content = ({ ingredients }: ContentProps) => {
  const [optimisticIngredients, dispatch] = useOptimistic<
    Ingredient[],
    IngredientAction
  >(ingredients, (state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];
      case "EDIT":
        return state.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient,
        );
      case "DELETE":
        return state.filter(
          (ingredient) => ingredient.id !== action.payload.id,
        );
      default:
        return state;
    }
    return state;
  });

  if (!ingredients.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Empty
          title="Brak produktów"
          text="Dodaj pierwszy produkt, aby rozpocząć pracę."
          buttons={
            <AddIngredient
              onAdd={(ingredient) =>
                dispatch({ type: "ADD", payload: ingredient })
              }
            >
              <EmptyButton>Dodaj produkt</EmptyButton>
            </AddIngredient>
          }
        />
      </div>
    );
  }

  return (
    <List
      onAdd={(ingredient) => dispatch({ type: "ADD", payload: ingredient })}
      onEdit={(ingredient) => dispatch({ type: "EDIT", payload: ingredient })}
      onDelete={(id) => dispatch({ type: "DELETE", payload: { id } })}
      ingredients={optimisticIngredients}
    />
  );
};
