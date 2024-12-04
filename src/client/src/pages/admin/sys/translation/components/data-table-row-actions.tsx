import { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TranslationEditContext,
  TranslationEditContextType,
} from "./data-table";
import { useContext } from "react";
import { SysTranslationDetailResponseType } from "@app/server/src/model";

interface DataTableRowActionsProps<
  TData extends SysTranslationDetailResponseType
> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends SysTranslationDetailResponseType
>({ row }: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(
    TranslationEditContext
  ) as TranslationEditContextType;

  return (
    <Button
      variant="ghost"
      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      onClick={() => setId({ id: row.original.id })}
    >
      <Pencil />
    </Button>
  );
}
