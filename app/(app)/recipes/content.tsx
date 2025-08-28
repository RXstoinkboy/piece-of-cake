"use client";

import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddRecipe } from "./modals/add";
import { List } from "./list";
import { Recipe } from "@/app/(app)/api/recipes/actions";
import { Ingredient } from "@/app/(app)/api/ingredients/actions";
import { useOptimistic } from "react";

type ContentProps = {
  recipes: Recipe[];
  ingredients: Ingredient[];
};

type RecipeAction =
  | { type: "ADD"; payload: Recipe }
  | { type: "EDIT"; payload: Recipe }
  | { type: "DELETE"; payload: { id: Recipe["id"] } };

export const Content = ({ recipes, ingredients }: ContentProps) => {
  const [optimisticRecipes, dispatch] = useOptimistic<Recipe[], RecipeAction>(
    recipes,
    (recipes, action) => {
      switch (action.type) {
        case "ADD":
          return [...recipes, action.payload];
        case "EDIT":
          return recipes.map((recipe) =>
            recipe.id === action.payload.id ? action.payload : recipe,
          );
        case "DELETE":
          return recipes.filter((recipe) => recipe.id !== action.payload.id);
      }
    },
  );
  if (!recipes.length) {
    return (
      <div className="p-4 w-full max-w-5xl mx-auto">
        <Empty
          title="Brak przepisów"
          text="Dodaj pierwszy przepis, aby rozpocząć pracę."
          buttons={
            <AddRecipe
              onAdd={(recipe) => dispatch({ type: "ADD", payload: recipe })}
              ingredients={ingredients}
            >
              <EmptyButton>Dodaj przepis</EmptyButton>
            </AddRecipe>
          }
        />
      </div>
    );
  }

  return (
    <List
      onAdd={(recipe) => dispatch({ type: "ADD", payload: recipe })}
      onEdit={(recipe) => dispatch({ type: "EDIT", payload: recipe })}
      onDelete={(id) => dispatch({ type: "DELETE", payload: { id } })}
      recipes={optimisticRecipes}
      ingredients={ingredients}
    />
  );
};
