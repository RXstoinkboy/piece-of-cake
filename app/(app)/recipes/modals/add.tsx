import { createRecipe, Recipe } from "@/app/(app)/api/recipes/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RecipeForm } from "./recipe-form";
import { Database } from "@/types/supabase";
import { startTransition } from "react";

type AddRecipeProps = {
  children: React.ReactNode;
  ingredients: Database["public"]["Tables"]["ingredients"]["Row"][];
  onAdd: (recipe: Recipe) => void;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(0).optional(),
  ingredients: z
    .array(
      z.object({
        ingredient_id: z.string().min(1, "Nazwa produktu jest wymagana"),
        quantity: z.number().positive("Ilość musi być większa od zera"),
      }),
    )
    .min(1, "Musisz dodać przynajmniej jeden produkt"),
});

export function AddRecipe({ children, ingredients, onAdd }: AddRecipeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [
        {
          ingredient_id: "",
          quantity: 0,
        },
      ],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const normalizedIngredients = data.ingredients.filter(
        (ingredient) =>
          ingredient.quantity > 0 && ingredient.ingredient_id !== "",
      );
      onAdd({
        ...data,
        description: data.description || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: `${new Date().getTime()}-temp`,
        ingredients_cost: normalizedIngredients.reduce((acc, ingredient) => {
          const ingredientData = ingredients.find(
            (ing) => ing.id === ingredient.ingredient_id,
          );
          return acc + ingredient.quantity * (ingredientData?.price ?? 0);
        }, 0),
        ingredients_cost_currency: "PLN",
        recipe_ingredients: normalizedIngredients.map((ingredient) => ({
          ingredient_id: ingredients.find(
            (ing) => ing.id === ingredient.ingredient_id,
          )!,
          quantity: ingredient.quantity,
        })),
      });
      createRecipe({ ...data, ingredients: normalizedIngredients });
    });
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset() : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj przepis</DialogTitle>
            <DialogDescription>
              Podaj listę produktów przepisu dla średnicy 18 cm
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RecipeForm form={form} ingredients={ingredients} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              {form.formState.isValid ? (
                <DialogClose asChild>
                  <Button type="submit">Dodaj</Button>
                </DialogClose>
              ) : (
                <Button type="submit">Dodaj</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
