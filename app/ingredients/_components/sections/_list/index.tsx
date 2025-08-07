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

export const List = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="w-fit">
        <PlusCircle />
        Dodaj składnik
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
