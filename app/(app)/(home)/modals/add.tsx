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
import { Cake, createCake } from "@/app/(app)/api/cakes/actions";
import { startTransition } from "react";

type AddCakeProps = {
  children: React.ReactNode;
  recipes: Recipe[];
  onAdd: (cake: Cake) => void;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(0).optional(),
  recipes: z
    .array(
      z.object({
        recipe_id: z.string(),
        order: z.number(),
      }),
    )
    .min(1, "Musisz dodać przynajmniej jeden składnik tortu"),
});

export function AddCake({ children, recipes, onAdd }: AddCakeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      recipes: [
        {
          recipe_id: "",
          order: 0,
        },
      ],
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

      onAdd({
        ...normalizedData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: `${new Date().getTime()}-temp`,
        description: data.description ?? null,
        cake_recipes: data.recipes.map((recipe) => ({
          recipe_id: recipes.find((r) => r.id === recipe.recipe_id)!,
          order: recipe.order,
        })),
      });
      createCake(normalizedData);
    });
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset() : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj tort</DialogTitle>
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
