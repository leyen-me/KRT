import { Row } from "@tanstack/react-table";
import { ArrowRight, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SysRoleDetailResponseType } from "@app/server/src/model";
import { RoleEditContext, RoleEditContextType } from "./data-table";
import { RoleContext, RoleContextType } from "..";

interface DataTableRowActionsProps<TData extends SysRoleDetailResponseType> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends SysRoleDetailResponseType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(RoleEditContext) as RoleEditContextType;
  const { activeRole, setActiveRole } = useContext(
    RoleContext
  ) as RoleContextType;

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
        variant={row.original.id === activeRole ? "default" : "ghost"}
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => setActiveRole(row.original.id)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
