"use client";

import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddCake } from "./modals/add";
import { Recipe } from "@/app/(app)/api/recipes/actions";
import { Cake } from "@/app/(app)/api/cakes/actions";
import { List } from "./list";
import { useOptimistic } from "react";

type ContentProps = {
  recipes: Recipe[];
  cakes: Cake[];
};

type CakeActions =
  | { type: "ADD"; payload: Cake }
  | { type: "EDIT"; payload: Cake }
  | { type: "REMOVE"; payload: { id: string } };

export const Content = ({ recipes, cakes }: ContentProps) => {
  const [optimisticCakes, dispatch] = useOptimistic<Cake[], CakeActions>(
    cakes,
    (state, action) => {
      switch (action.type) {
        case "ADD":
          return [action.payload, ...state];
        case "EDIT":
          return state.map((ingredient) =>
            ingredient.id === action.payload.id ? action.payload : ingredient,
          );
        case "REMOVE":
          return state.filter((cake) => cake.id !== action.payload.id);
        default:
          return state;
      }
    },
  );

  if (!cakes.length) {
    return (
      <section className="p-4 w-full max-w-5xl mx-auto">
        <Empty
          title="Nie masz jeszcze żadnego tortu"
          text="Dodaj pierwszy przepis, aby rozpocząć pracę."
          buttons={
            <AddCake
              onAdd={(cake) => dispatch({ type: "ADD", payload: cake })}
              recipes={recipes}
            >
              <EmptyButton>Dodaj przepis</EmptyButton>
            </AddCake>
          }
        />
      </section>
    );
  }

  return (
    <List
      onAdd={(cake) => dispatch({ type: "ADD", payload: cake })}
      onEdit={(cake) => dispatch({ type: "EDIT", payload: cake })}
      onDelete={(cakeId) =>
        dispatch({ type: "REMOVE", payload: { id: cakeId } })
      }
      cakes={optimisticCakes}
      recipes={recipes}
    />
  );
};
