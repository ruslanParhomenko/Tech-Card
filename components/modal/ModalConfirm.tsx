import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ModalConfirm({
  open,
  setOpen,
  handleConfirm,
  message,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void;
  message: "сохранить" | "обновить" | "удалить" | "добавить";
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {`Вы действительно хотите ${message} ?`}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            отмена
          </Button>
          <Button onClick={handleConfirm}>подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
