"use client";

import { Database } from "@/types/supabase";
import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddRecipe } from "./@add";

type ContentProps = {
  recipes: Database["public"]["Tables"]["recipes"]["Row"][];
  ingredients: Database["public"]["Tables"]["ingredients"]["Row"][];
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

  // return <List recipes={recipes} />;
};
