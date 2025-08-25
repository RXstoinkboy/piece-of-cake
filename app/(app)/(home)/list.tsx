import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddCake } from "./modals/add";
import { Recipe } from "@/app/(app)/api/recipes/actions";
import { RecipeCard } from "./cake-recipe-card";
import { Cake } from "@/app/(app)/api/cakes/actions";

export const List = ({
  recipes,
  cakes,
}: {
  recipes: Recipe[];
  cakes: Cake[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddCake recipes={recipes}>
        <Button variant="outline" className="w-fit">
          <PlusCircle />
          Dodaj tort
        </Button>
      </AddCake>
      {cakes.map((cake) => (
        <RecipeCard key={cake.id} cake={cake} recipes={recipes} />
      ))}
    </div>
  );
};
