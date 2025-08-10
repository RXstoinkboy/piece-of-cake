"use client";

import { Ingredient } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAddIngredient } from "@/lib/hooks/use-ingredients";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const List = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const addIngredientMutation = useAddIngredient();

  const handleAddIngredient = () => {
    addIngredientMutation.mutate({});
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-fit"
        onClick={handleAddIngredient}
        disabled={addIngredientMutation.isPending}
      >
        <PlusCircle />
        {addIngredientMutation.isPending ? "Dodawanie..." : "Dodaj składnik"}
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Składnik</TableHead>
            <TableHead className="w-[100px]">Ilość</TableHead>
            <TableHead className="w-[100px]">Jednostka</TableHead>
            <TableHead className="w-[100px]">Cena</TableHead>
            <TableHead className="w-[100px]">Waluta</TableHead>
            <TableHead className="w-[80px]">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>{ingredient.quantity}</TableCell>
              <TableCell>{ingredient.unit}</TableCell>
              <TableCell>{ingredient.price}</TableCell>
              <TableCell>{ingredient.currency}</TableCell>
              <TableCell className="mr-0">
                <Button variant="outline" size="icon">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
