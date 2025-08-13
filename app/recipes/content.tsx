"use client";

import { Database } from "@/types/supabase";
import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddRecipe } from "./@add";
// import { List } from "./sections/list";
// import { AddIngredient } from "./sections/modals/add";

type ContentProps = {
  recipes: Database["public"]["Tables"]["recipes"]["Row"][];
};

export const Content = ({ recipes }: ContentProps) => {
  if (!recipes.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Empty
          title="Brak przepisów"
          text="Dodaj pierwszy przepis, aby rozpocząć pracę."
          buttons={
            <AddRecipe>
              <EmptyButton>Dodaj przepis</EmptyButton>
            </AddRecipe>
          }
        />
      </div>
    );
  }

  // return <List recipes={recipes} />;
};
