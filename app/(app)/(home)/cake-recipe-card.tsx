"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CircleOff, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Cake } from "@/app/(app)/api/cakes/actions";
import { Recipe } from "@/app/(app)/api/recipes/actions";
import { RemoveCake } from "./modals/delete";
import { EditCake } from "./modals/edit";
import { Separator } from "@/components/ui/separator";
import { useDeepCompareEffect } from "react-use";

const createKey = (id: string, index: number) => `${id}-${index}`;

type RecipeCardProps = {
  cake: Cake;
  recipes: Recipe[];
  onEdit: (cake: Cake) => void;
  onDelete: (id: string) => void;
};

export const RecipeCard = ({
  cake,
  recipes,
  onEdit,
  onDelete,
}: RecipeCardProps) => {
  const initialOrderedRecipes = (cake.cake_recipes ?? []).sort(
    (a, b) => a.order - b.order,
  );
  const initialDimensions = initialOrderedRecipes.reduce(
    (acc, { recipe_id }, index) => {
      const key = createKey(recipe_id.id, index);
      return {
        ...acc,
        [key]: [18],
      };
    },
    {},
  );
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [orderedRecipes, setOrderedRecipes] = useState<Cake["cake_recipes"]>(
    initialOrderedRecipes,
  );

  const onChange = (newValue: number[], id: string) => {
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [id]: newValue,
    }));
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
  const finalPrice = (Object.values(dimensions) as number[][]).reduce(
    (acc, item) => {
      return acc + calculatePriceForDiameter(item[0]);
    },
    0,
  );

  useDeepCompareEffect(() => {
    const orderedRecipes = (cake.cake_recipes ?? []).sort(
      (a, b) => a.order - b.order,
    );
    const initialDimensions = orderedRecipes.reduce(
      (acc, { recipe_id }, index) => {
        const key = createKey(recipe_id.id, index);
        return {
          ...acc,
          [key]: [18],
        };
      },
      {},
    );
    setOrderedRecipes(orderedRecipes);
    setDimensions(initialDimensions);
  }, [cake.cake_recipes]);

  return (
    <Card className="min-w-full max-w-sm mb-2 ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {cake.name}
          <div className="flex gap-2 items-center">
            <EditCake onEdit={onEdit} recipes={recipes} cake={cake}>
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
            </EditCake>
            <RemoveCake onDelete={onDelete} cakeId={cake.id}>
              <Button
                variant="outline"
                size="icon"
                className="text-destructive"
              >
                <Trash2 />
              </Button>
            </RemoveCake>
          </div>
        </CardTitle>
        <CardContent className="p-0 mt-4">
          <ul className="grid gap-1">
            {orderedRecipes.map(({ recipe_id }, index) => {
              const key = createKey(
                recipe_id.id,
                index,
              ) as keyof typeof dimensions;
              return (
                <li
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-2 p-2 gap-8 border rounded-md items-center"
                >
                  <p>{recipe_id.name}</p>
                  <section className="flex items-center justify-center gap-3">
                    <section className="flex flex-1 flex-col">
                      <Slider
                        min={10}
                        max={32}
                        step={1}
                        value={dimensions[key]}
                        onValueChange={(newValue) => onChange(newValue, key)}
                      />
                    </section>
                    <article className="flex gap-2 items-center">
                      <article className=" flex gap-1 w-full justify-center items-center">
                        <CircleOff size={18} className="rotate-90" />
                        <span>{dimensions[key]?.[0]} cm</span>
                      </article>{" "}
                      /
                      <p>
                        {calculatePriceForDiameter(
                          dimensions[key]?.[0],
                        ).toFixed(2)}
                        <span className="ml-1">PLN</span>
                      </p>
                    </article>
                  </section>
                </li>
              );
            })}
          </ul>
          <Separator className="my-2" />
          <article className="flex justify-end items-baseline gap-2 px-1">
            <h3 className="text-2xl mr-2">Suma:</h3>
            <h2 className="text-6xl font-bold">{finalPrice.toFixed(2)}</h2>
            <h3 className="text-2xl font-semibold">PLN</h3>
          </article>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
