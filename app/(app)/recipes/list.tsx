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
import { AddRecipe } from "./modals/add";
import { Recipe } from "@/app/(app)/api/recipes/actions";
import { Ingredient } from "@/app/(app)/api/ingredients/actions";
import { RemoveRecipe } from "./modals/delete";
import { EditRecipe } from "./modals/edit";

export const List = ({
  recipes,
  ingredients,
  onAdd,
  onEdit,
  onDelete,
}: {
  recipes: Recipe[];
  ingredients: Ingredient[];
  onAdd: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddRecipe ingredients={ingredients} onAdd={onAdd}>
        <Button variant="outline" className="w-fit">
          <PlusCircle />
          Dodaj przepis
        </Button>
      </AddRecipe>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Przepis</TableHead>
            <TableHead className="w-[100px]">Opis</TableHead>
            <TableHead className="w-[100px]">
              Koszt składników (śr. 18 cm)
            </TableHead>
            <TableHead className="w-[100px]">Waluta</TableHead>
            <TableHead className="w-[80px]">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>{recipe.description}</TableCell>
              <TableCell>{recipe.ingredients_cost}</TableCell>
              <TableCell>{recipe.ingredients_cost_currency}</TableCell>
              <TableCell className="mr-0 flex gap-2">
                <EditRecipe
                  onEdit={onEdit}
                  ingredients={ingredients}
                  recipe={recipe}
                >
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </EditRecipe>
                <RemoveRecipe onDelete={onDelete} recipeId={recipe.id}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                  >
                    <Trash2 />
                  </Button>
                </RemoveRecipe>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
