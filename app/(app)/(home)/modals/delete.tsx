import { Cake, deleteCake } from "@/app/(app)/api/cakes/actions";
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

type RemoveCakeProps = {
  cakeId: Cake["id"];
  onDelete: (id: string) => void;
  children: React.ReactNode;
};

export function RemoveCake({ cakeId, children, ...props }: RemoveCakeProps) {
  const onRemove = () => {
    startTransition(async () => {
      props.onDelete(cakeId);
      await deleteCake(cakeId);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Usun tort</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć ten tort?
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
