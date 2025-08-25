import { createIngredient } from "@/app/(app)/api/ingredients/actions";
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

type AddIngredientProps = {
  children: React.ReactNode;
};

const FormSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  quantity: z.number().min(0),
  unit: z.string(),
  price: z.number().min(0),
  currency: z.string(),
});

export function AddIngredient({ children }: AddIngredientProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      unit: "g",
      price: 1,
      currency: "PLN",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createIngredient(data);
  };

  return (
    <Dialog onOpenChange={(opened) => (opened ? form.reset() : null)}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj składnik</DialogTitle>
            <DialogDescription>Wpisz dane nowego składnika</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <IngredientForm form={form} />
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
