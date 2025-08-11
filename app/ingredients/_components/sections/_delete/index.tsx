import { deleteIngredient } from "@/app/api/ingredients/actions";
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
import { Ingredient } from "@/lib/generated/prisma";

type RemoveIngredientProps = {
  ingredientId: Ingredient["id"];
  children: React.ReactNode;
};

export function RemoveIngredient({
  ingredientId,
  children,
}: RemoveIngredientProps) {
  const onRemove = async () => {
    await deleteIngredient(ingredientId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Usun składnik</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć ten składnik?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Anuluj</Button>
          </DialogClose>
          <DialogClose asChild onClick={onRemove}>
            <Button>Usuń</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
