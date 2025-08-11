"use client";

import { Ingredient } from "@/lib/generated/prisma";
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
import { AddIngredient } from "../modals/add";
import { RemoveIngredient } from "../modals/delete";
import { EditIngredient } from "../modals/edit";

export const List = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <AddIngredient>
        <Button variant="outline" className="w-fit">
          <PlusCircle />
          Dodaj składnik
        </Button>
      </AddIngredient>
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
              <TableCell className="mr-0 flex gap-2">
                <EditIngredient ingredient={ingredient}>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </EditIngredient>
                <RemoveIngredient ingredientId={ingredient.id}>
                  <Button variant="outline" size="icon">
                    <Trash2 />
                  </Button>
                </RemoveIngredient>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
