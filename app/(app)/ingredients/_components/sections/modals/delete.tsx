import {
  deleteIngredient,
  Ingredient,
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
import { startTransition } from "react";

type RemoveIngredientProps = {
  ingredientId: Ingredient["id"];
  children: React.ReactNode;
  onDelete: (id: Ingredient["id"]) => void;
};

export function RemoveIngredient({
  ingredientId,
  children,
  onDelete,
}: RemoveIngredientProps) {
  const onRemove = async () => {
    startTransition(async () => {
      onDelete(ingredientId);
      await deleteIngredient(ingredientId);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Usuń składnik</DialogTitle>
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
