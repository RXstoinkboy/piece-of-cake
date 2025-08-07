"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ingredient } from "./types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAddIngredient } from "@/lib/hooks/use-ingredients";

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
      {ingredients.map((ingredient) => (
        <Card key={ingredient._id}>
          <CardHeader>
            <CardTitle>{ingredient.name}</CardTitle>
            <CardDescription>{ingredient.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span>
                {ingredient.amount} {ingredient.unit}
              </span>
              <span>
                {ingredient.price} {ingredient.currency}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
