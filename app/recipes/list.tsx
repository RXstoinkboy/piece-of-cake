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
import { AddRecipe } from "./@add";
import { Recipe } from "../api/recipes/actions";
import { Ingredient } from "../api/ingredients/actions";
// import { RemoveIngredient } from "../modals/delete";
// import { EditIngredient } from "../modals/edit";

export const List = ({
  recipes,
  ingredients,
}: {
  recipes: Recipe[];
  ingredients: Ingredient[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddRecipe ingredients={ingredients}>
        <Button variant="outline" className="w-fit">
          <PlusCircle />
          Dodaj składnik
        </Button>
      </AddRecipe>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Przepis</TableHead>
            <TableHead className="w-[100px]">Opis</TableHead>
            {/*<TableHead className="w-[100px]">Jednostka</TableHead>
            <TableHead className="w-[100px]">Cena</TableHead>
            <TableHead className="w-[100px]">Waluta</TableHead>*/}
            <TableHead className="w-[80px]">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>{recipe.description}</TableCell>
              {/*<TableCell>{recipe.unit}</TableCell>
              <TableCell>{recipe.price}</TableCell>
              <TableCell>{recipe.currency}</TableCell>*/}
              <TableCell className="mr-0 flex gap-2">
                {/*<EditIngredient ingredient={ingredient}>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </EditIngredient>
                <RemoveIngredient ingredientId={ingredient.id}>
                  <Button variant="outline" size="icon">
                    <Trash2 />
                  </Button>
                </RemoveIngredient>*/}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
