import { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserEditContext, UserEditContextType } from "./data-table";
import { useContext } from "react";
import { SysUserDetailResponseType } from "@app/server/src/model";

interface DataTableRowActionsProps<TData extends SysUserDetailResponseType> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends SysUserDetailResponseType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setId } = useContext(UserEditContext) as UserEditContextType;

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
