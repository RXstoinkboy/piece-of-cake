"use client";

import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddCake } from "./modals/add";
import { RecipeCard } from "./cake-recipe-card";
import { Recipe } from "../api/recipes/actions";
import { Cake } from "../api/cakes/actions";
import { List } from "./list";

type ContentProps = {
  recipes: Recipe[];
  cakes: Cake[];
};

export const Content = ({ recipes, cakes }: ContentProps) => {
  if (!cakes.length) {
    return (
      <section className="p-4 w-full max-w-5xl mx-auto">
        <Empty
          title="Nie masz jeszcze żadnego tortu"
          text="Dodaj pierwszy przepis, aby rozpocząć pracę."
          buttons={
            <AddCake recipes={recipes}>
              <EmptyButton>Dodaj przepis</EmptyButton>
            </AddCake>
          }
        />
      </section>
    );
  }

  return <List cakes={cakes} recipes={recipes} />;
};
