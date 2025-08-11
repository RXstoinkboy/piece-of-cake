"use client";

import { Ingredient } from "@/lib/generated/prisma";
import { Empty, EmptyButton } from "../../../components/molecules/empty-state";
import { List } from "./sections/list";
import { AddIngredient } from "./sections/modals/add";

type ContentProps = {
  ingredients: Ingredient[];
};

export const Content = ({ ingredients }: ContentProps) => {
  if (!ingredients.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Empty
          title="Brak składników"
          text="Dodaj pierwszy składnik, aby rozpocząć pracę."
          buttons={
            <AddIngredient>
              <EmptyButton>Dodaj składnik</EmptyButton>
            </AddIngredient>
          }
        />
      </div>
    );
  }

  return <List ingredients={ingredients} />;
};
