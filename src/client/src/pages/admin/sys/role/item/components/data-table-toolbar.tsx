import { Table } from "@tanstack/react-table";
import { SysUserRoleDetailResponseType } from "@app/server/src/model";
import { DataTableToolbarCreateBtn } from "./data-table-toolbar-create-btn";
import DataTableToolbarDeleteBtn from "./data-table-toolbar-delete-btn";
import { DataTableToolbarViewOptions } from "@/components/data-table-toolbar-view-options";
import { DataTableToolbarFilter } from "../../../user/components/data-table-toolbar-filter";

interface DataTableToolbarProps<TData extends SysUserRoleDetailResponseType> {
  table: Table<TData>;

  isDelete: boolean;
  onDelete: () => void;
  isColumnFiltered: boolean;
  onResetColumnFilters: () => void;
}

export function DataTableToolbar<TData extends SysUserRoleDetailResponseType>({
  table,
  isDelete,
  onDelete,

  isColumnFiltered,
  onResetColumnFilters,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <DataTableToolbarFilter
        // @ts-ignore
        table={table}
        isColumnFiltered={isColumnFiltered}
        onResetColumnFilters={onResetColumnFilters}
      />

      {isDelete && <DataTableToolbarDeleteBtn onDelete={onDelete} />}
      <DataTableToolbarViewOptions table={table} />
      <DataTableToolbarCreateBtn />
    </div>
  );
}
