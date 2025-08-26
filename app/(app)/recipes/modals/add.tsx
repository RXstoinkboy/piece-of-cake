import { createRecipe } from "@/app/(app)/api/recipes/actions";
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

type AddRecipeProps = {
  children: React.ReactNode;
  ingredients: Database["public"]["Tables"]["ingredients"]["Row"][];
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

export function AddRecipe({ children, ingredients }: AddRecipeProps) {
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
    const normalizedIngredients = data.ingredients.filter(
      (ingredient) =>
        ingredient.quantity > 0 && ingredient.ingredient_id !== "",
    );
    createRecipe({ ...data, ingredients: normalizedIngredients });
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset() : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj przepis</DialogTitle>
            <DialogDescription>
              Podaj listę składników przepisu dla średnicy 18 cm
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
