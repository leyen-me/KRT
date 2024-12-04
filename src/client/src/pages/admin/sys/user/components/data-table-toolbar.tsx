import { Table } from "@tanstack/react-table";
import { SysUserDetailResponseType } from "@app/server/src/model";
import { DataTableToolbarCreateBtn } from "./data-table-toolbar-create-btn";
import DataTableToolbarDeleteBtn from "./data-table-toolbar-delete-btn";
import { DataTableToolbarFilter } from "./data-table-toolbar-filter";
import { DataTableToolbarViewOptions } from "@/components/data-table-toolbar-view-options";

interface DataTableToolbarProps<TData extends SysUserDetailResponseType> {
  table: Table<TData>;

  isDelete: boolean;
  onDelete: () => void;

  isColumnFiltered: boolean;
  onResetColumnFilters: () => void;
}

export function DataTableToolbar<TData extends SysUserDetailResponseType>({
  table,
  isDelete,
  onDelete,

  isColumnFiltered,
  onResetColumnFilters,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <DataTableToolbarFilter
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
