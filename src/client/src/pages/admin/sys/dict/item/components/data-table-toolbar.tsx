import { Table } from "@tanstack/react-table";
import { SysDictItemDetailResponseType } from "@app/server/src/model";
import { DataTableToolbarCreateBtn } from "./data-table-toolbar-create-btn";
import DataTableToolbarDeleteBtn from "./data-table-toolbar-delete-btn";
import { DataTableToolbarViewOptions } from "@/components/data-table-toolbar-view-options";

interface DataTableToolbarProps<TData extends SysDictItemDetailResponseType> {
  table: Table<TData>;

  isDelete: boolean;
  onDelete: () => void;
}

export function DataTableToolbar<TData extends SysDictItemDetailResponseType>({
  table,
  isDelete,
  onDelete,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-2">
      {isDelete && <DataTableToolbarDeleteBtn onDelete={onDelete} />}
      <DataTableToolbarViewOptions table={table} />
      <DataTableToolbarCreateBtn />
    </div>
  );
}
