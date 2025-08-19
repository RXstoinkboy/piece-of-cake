// import { createRecipe } from "@/app/api/recipes/actions";
import { Recipe } from "@/app/api/recipes/actions";
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
import { createCake } from "@/app/api/cakes/actions";
// import { RecipeForm } from "./recipe-form";

type AddCakeProps = {
  children: React.ReactNode;
  recipes: Recipe[];
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(0).optional(),
  recipeIds: z
    .array(z.string())
    .min(1, "Musisz dodać przynajmniej jeden składnik tortu"),
});

export function AddCake({ children, recipes }: AddCakeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      recipeIds: [" "],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const normalizedData = {
      ...data,
      recipeIds: data.recipeIds.filter((id) => id.trim().length > 0),
    };
    createCake(normalizedData);
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
