"use client";

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
// import { RecipeForm } from "./recipe-form";

type AddRecipeProps = {
  children: React.ReactNode;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(0).optional(),
});

export default function AddRecipe({ children }: AddRecipeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createRecipe(data);
  };

  return (
    <Dialog>
      <Form {...form}>
        {/*<DialogTrigger asChild>{children}</DialogTrigger>*/}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj przepis</DialogTitle>
            <DialogDescription>
              Podaj listę składników przepisu
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/*<IngredientForm form={form} />*/}
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
