"use client";

import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddRecipe } from "./modals/add";
import { List } from "./list";
import { Recipe } from "../api/recipes/actions";
import { Ingredient } from "../api/ingredients/actions";

type ContentProps = {
  recipes: Recipe[];
  ingredients: Ingredient[];
};

export const Content = ({ recipes, ingredients }: ContentProps) => {
  if (!recipes.length) {
    return (
      <div className="p-4 w-full max-w-5xl mx-auto">
        <Empty
          title="Brak przepisów"
          text="Dodaj pierwszy przepis, aby rozpocząć pracę."
          buttons={
            <AddRecipe ingredients={ingredients}>
              <EmptyButton>Dodaj przepis</EmptyButton>
            </AddRecipe>
          }
        />
      </div>
    );
  }

  return <List recipes={recipes} ingredients={ingredients} />;
};
