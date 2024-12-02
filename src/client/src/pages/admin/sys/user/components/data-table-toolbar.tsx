"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableOptions } from "./data-table-options";
import { DataTableNew } from "./data-table-new";
import DataTableDelete from "./data-table-delete";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const statuses: any[] = [
  {
    label: "正常",
    value: "NORMAL",
  },
  {
    label: "禁用",
    value: "DISABLED",
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSelected = Object.keys(table.getState().rowSelection).length > 0;

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>

      {isSelected && <DataTableDelete table={table} />}
      <DataTableViewOptions table={table} />
      <DataTableNew table={table} />
      <DataTableOptions table={table} />
    </div>
  );
}
