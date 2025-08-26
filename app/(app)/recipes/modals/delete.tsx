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

type RemoveRecipeProps = {
  recipeId: Recipe["id"];
  children: React.ReactNode;
};

export function RemoveRecipe({ recipeId, children }: RemoveRecipeProps) {
  const onRemove = async () => {
    await deleteRecipe(recipeId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Usun przepis</DialogTitle>
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
