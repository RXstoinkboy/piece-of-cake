import { deleteRecipe, Recipe } from "@/app/(app)/api/recipes/actions";
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

type RemoveRecipeProps = {
  recipeId: Recipe["id"];
  children: React.ReactNode;
  onDelete: (recipeId: Recipe["id"]) => void;
};

export function RemoveRecipe({
  recipeId,
  children,
  onDelete,
}: RemoveRecipeProps) {
  const onRemove = async () => {
    startTransition(async () => {
      onDelete(recipeId);
      await deleteRecipe(recipeId);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Usuń przepis</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć ten przepis?
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
