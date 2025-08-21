"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CircleOff, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Cake } from "../api/cakes/actions";
import { Recipe } from "../api/recipes/actions";
import { RemoveCake } from "./modals/delete";
import { EditCake } from "./modals/edit";

type RecipeCardProps = {
  cake: Cake;
  recipes: Recipe[];
};

export const RecipeCard = ({ cake, recipes }: RecipeCardProps) => {
  const [value, setValue] = useState([18]);
  const onChange = (newValue: number[]) => {
    setValue(newValue);
  };

  const totalPriceForDefaultDiameter = cake.cake_recipes.reduce(
    (acc, { recipe_id }) => {
      const recipe = recipes.find((recipe) => recipe.id === recipe_id.id);
      return acc + (recipe?.ingredients_cost || 0);
    },
    0,
  );

  const calculatePriceForDiameter = (diameter: number) => {
    const defaultDiameter = 18;
    const priceRatio =
      (Math.PI * diameter ** 2) / 4 / ((Math.PI * defaultDiameter ** 2) / 4);
    return totalPriceForDefaultDiameter * priceRatio;
  };
  const priceForDiameter = calculatePriceForDiameter(value[0]);

  return (
    <Card className="min-w-full max-w-sm mb-2 ">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {cake.name}
          <EditCake recipes={recipes} cake={cake}>
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </EditCake>
          <RemoveCake cakeId={cake.id}>
            <Button variant="outline" size="icon">
              <Trash2 />
            </Button>
          </RemoveCake>
        </CardTitle>
        <CardContent className="grid grid-cols-2 px-0 gap-8">
          <ul>
            {cake.cake_recipes.map(({ recipe_id }) => (
              <li key={recipe_id.id}>{recipe_id.name}</li>
            ))}
          </ul>
          <section className="flex-1 flex flex-col items-end justify-center gap-3">
            <article className="flex gap-1 items-end">
              <h2 className="text-6xl font-bold">
                {priceForDiameter.toFixed(2)}
              </h2>
              <h3 className="text-2xl font-semibold">PLN</h3>
            </article>
            <Slider
              min={10}
              max={32}
              step={1}
              value={value}
              onValueChange={onChange}
            />
            <article className="flex gap-1 w-full justify-center items-center">
              <CircleOff size={18} className="rotate-90" />
              <span>{value[0]} cm</span>
            </article>
          </section>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
