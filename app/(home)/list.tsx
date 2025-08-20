import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AddCake, AddRecipe } from "./modals/add";
import { Recipe } from "../api/recipes/actions";
import { Ingredient } from "../api/ingredients/actions";
import { RemoveRecipe } from "./modals/delete";
import { EditRecipe } from "./modals/edit";
import { RecipeCard } from "./cake-recipe-card";
import { Cake } from "../api/cakes/actions";

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
        <RecipeCard key={cake.id} cake={cake} />
      ))}
    </div>
  );
};
