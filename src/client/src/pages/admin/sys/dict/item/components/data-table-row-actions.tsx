import { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SysDictItemDetailResponseType } from "@app/server/src/model";
import { DictItemEditContext, DictItemEditContextType } from "./data-table";

interface DataTableRowActionsProps<
  TData extends SysDictItemDetailResponseType
> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends SysDictItemDetailResponseType
>({ row }: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(DictItemEditContext) as DictItemEditContextType;

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
