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
      <div className="flex flex-col items-center justify-center h-full w-full">
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
