import { Row } from "@tanstack/react-table";
import { ArrowRight, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SysDictDetailResponseType } from "@app/server/src/model";
import { DictEditContext, DictEditContextType } from "./data-table";
import { DictContext, DictContextType } from "..";

interface DataTableRowActionsProps<TData extends SysDictDetailResponseType> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends SysDictDetailResponseType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(DictEditContext) as DictEditContextType;
  const { activeDict, setActiveDict } = useContext(
    DictContext
  ) as DictContextType;

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => setId({ id: row.original.id })}
      >
        <Pencil />
      </Button>
      <Button
        variant={row.original.id === activeDict ? "default" : "ghost"}
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => setActiveDict(row.original.id)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
