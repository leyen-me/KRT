import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { t } from "@app/i18n";

type DataTableToolbarDeleteBtnProps = {
  onDelete: () => void;
};

export default function DataTableToolbarDeleteBtn({
  onDelete,
}: DataTableToolbarDeleteBtnProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="ml-auto flex">
          <Trash2 />
          {t("pages.common.data_table.toolbar.delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("pages.common.data_table.toolbar.delete.dialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("pages.common.data_table.toolbar.delete.dialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("pages.common.data_table.toolbar.delete.dialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {t("pages.common.data_table.toolbar.delete.dialog.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
