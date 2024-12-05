import { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SysUserRoleDetailResponseType } from "@app/server/src/model";
import { UserRoleEditContext, UserRoleEditContextType } from "./data-table";

interface DataTableRowActionsProps<
  TData extends SysUserRoleDetailResponseType
> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends SysUserRoleDetailResponseType
>({ row }: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(UserRoleEditContext) as UserRoleEditContextType;

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
