import {
  Ingredient,
  updateIngredient,
} from "@/app/(app)/api/ingredients/actions";
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
import { IngredientForm } from "./ingredient-form";
import { startTransition } from "react";

type EditIngredientProps = {
  children: React.ReactNode;
  ingredient: Ingredient;
  onEdit: (ingredient: Ingredient) => void;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  quantity: z.number().min(0),
  unit: z.string(),
  price: z.number().min(0),
  currency: z.string(),
});

export function EditIngredient({
  children,
  ingredient,
  onEdit,
}: EditIngredientProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: ingredient,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      onEdit({ ...ingredient, ...data });
      await updateIngredient({ id: ingredient.id, ...data });
    });

    await updateIngredient({ id: ingredient.id, ...data });
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset(ingredient) : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edytuj składnik</DialogTitle>
            <DialogDescription>Wpisz nowe dane składnika</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <IngredientForm form={form} />
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
