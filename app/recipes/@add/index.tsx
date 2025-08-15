import { createRecipe } from "@/app/api/recipes/actions";
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
import { RecipeForm } from "../modals/recipe-form";
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
        quantity: z.number().min(0, "Ilość jest wymagana"),
      }),
    )
    .optional(),
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
    console.log("data: ", data);
    // await createRecipe(data);
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset() : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj przepis</DialogTitle>
            <DialogDescription>
              Podaj listę składników przepisu
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RecipeForm form={form} ingredients={ingredients} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Dodaj</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
