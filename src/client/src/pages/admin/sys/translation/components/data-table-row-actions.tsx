import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TranslationEditContext, TranslationEditContextType } from "./data-table";
import { useContext } from "react";
import { SysTranslationDetailResponseType } from "@app/server/src/model";
import { t } from "@app/i18n";

interface DataTableRowActionsProps<TData extends SysTranslationDetailResponseType> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends SysTranslationDetailResponseType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(TranslationEditContext) as TranslationEditContextType;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setId({ id: row.original.id });
          }}
        >
          {t("pages.common.data_table.row_actions.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setId({ id: row.original.id });
          }}
        >
          {t("pages.common.data_table.row_actions.detail")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {t("pages.common.data_table.row_actions.delete")}
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
