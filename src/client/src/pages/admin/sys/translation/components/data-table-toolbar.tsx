import { Table } from "@tanstack/react-table";
import { SysTranslationDetailResponseType } from "@app/server/src/model";
import { DataTableToolbarCreateBtn } from "./data-table-toolbar-create-btn";
import DataTableToolbarDeleteBtn from "./data-table-toolbar-delete-btn";
import { DataTableToolbarOptions } from "./data-table-toolbar-options";
import { DataTableToolbarViewOptions } from "./data-table-toolbar-view-options";
import { DataTableToolbarFilter } from "./data-table-toolbar-filter";

interface DataTableToolbarProps<TData extends SysTranslationDetailResponseType> {
  table: Table<TData>;

  isDelete: boolean;
  onDelete: () => void;

  isColumnFiltered: boolean;
  onResetColumnFilters: () => void;
}

export function DataTableToolbar<TData extends SysTranslationDetailResponseType>({
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
      <DataTableToolbarOptions />
    </div>
  );
}
