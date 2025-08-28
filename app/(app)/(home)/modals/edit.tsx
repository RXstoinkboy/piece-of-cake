import { Recipe } from "@/app/(app)/api/recipes/actions";
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
import { CakeForm } from "./cake-form";
import { Cake, updateCake } from "@/app/(app)/api/cakes/actions";
import { startTransition } from "react";

type EditCakeProps = {
  children: React.ReactNode;
  recipes: Recipe[];
  cake: Cake;
  onEdit: (cake: Cake) => void;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().optional(),
  recipes: z
    .array(
      z.object({
        recipe_id: z.string(),
        order: z.number(),
      }),
    )
    .min(1, "Musisz dodać przynajmniej jeden składnik tortu"),
});

export function EditCake({ children, recipes, cake, onEdit }: EditCakeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: cake.name,
      description: cake.description || undefined,
      recipes: cake.cake_recipes.map(({ recipe_id, order }) => ({
        recipe_id: recipe_id.id,
        order: order,
      })),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const normalizedData = {
        ...data,
        recipes: data.recipes.filter(
          ({ recipe_id }) => recipe_id.trim().length > 0,
        ),
      };
      onEdit({
        ...normalizedData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: cake.id,
        description: data.description ?? null,
        cake_recipes: normalizedData.recipes.map((recipe) => ({
          recipe_id: recipes.find((r) => r.id === recipe.recipe_id)!,
          order: recipe.order,
        })),
      });
      updateCake({ id: cake.id, ...normalizedData });
    });
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset() : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edytuj tort</DialogTitle>
            <DialogDescription>
              Wpisz dane na temat swojego tortu
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CakeForm form={form} recipes={recipes} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              {form.formState.isValid ? (
                <DialogClose asChild>
                  <Button type="submit">Edytuj</Button>
                </DialogClose>
              ) : (
                <Button type="submit">Edytuj</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
