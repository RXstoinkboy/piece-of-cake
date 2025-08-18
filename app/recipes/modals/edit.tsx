import { createRecipe, Recipe, updateRecipe } from "@/app/api/recipes/actions";
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
import { Ingredient } from "@/app/api/ingredients/actions";

type EditRecipeProps = {
  children: React.ReactNode;
  ingredients: Ingredient[];
  recipe: Recipe;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(0).optional(),
  ingredients: z
    .array(
      z.object({
        ingredient_id: z.string().min(1, "Nazwa składnika jest wymagana"),
        quantity: z.number().positive("Ilość musi być większa od zera"),
      }),
    )
    .min(1, "Musisz dodać przynajmniej jeden składnik"),
});

export function EditRecipe({ children, ingredients, recipe }: EditRecipeProps) {
  const mapDtoToForm = (recipe: Recipe) => ({
    name: recipe.name,
    description: recipe.description ?? "",
    ingredients: recipe.recipe_ingredients.map((ingredient) => ({
      ingredient_id: ingredient.ingredient_id.id,
      quantity: ingredient.quantity ?? 0,
    })),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: mapDtoToForm(recipe),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const normalizedIngredients = data.ingredients.filter(
      (ingredient) =>
        ingredient.quantity > 0 && ingredient.ingredient_id !== "",
    );
    updateRecipe({
      id: recipe.id,
      ...data,
      ingredients: normalizedIngredients,
    });
  };

  return (
    <Dialog
      onOpenChange={(opened) =>
        opened ? form.reset(mapDtoToForm(recipe)) : null
      }
    >
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edytuj przepis</DialogTitle>
            <DialogDescription>
              Edytuj listę składników przepisu dla średnicy 18 cm
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RecipeForm form={form} ingredients={ingredients} />
            <DialogFooter>
              <DialogClose asChild disabled={!form.formState.isValid}>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              {/*{form.formState.isValid ? (
                <DialogClose asChild>
                  <Button type="submit">Edytuj</Button>
                </DialogClose>
              ) : (*/}
              <Button type="submit">Edytuj</Button>
              {/*)}*/}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
