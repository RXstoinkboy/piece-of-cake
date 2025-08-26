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

type RemoveCakeProps = {
  cakeId: Cake["id"];
  children: React.ReactNode;
};

export function RemoveCake({ cakeId, children }: RemoveCakeProps) {
  const onRemove = async () => {
    await deleteCake(cakeId);
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
