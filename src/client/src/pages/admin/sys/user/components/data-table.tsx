import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { SysUserDetailType } from "@app/server/src/model";
import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constants";
import { SysUserPageResponseType } from "@app/server/src/model";
import { fetchSysUserPage } from "@/api/sys/user";
import { DataTableModelDrawer } from "./data-table-model-drawer";

interface DataTableProps {
  columns: ColumnDef<SysUserDetailType, any>[];
}

export const UserEditContext = createContext({
  id: "",
  setId: ({ id }: { id: string }) => {},
});

export function DataTable({ columns }: DataTableProps) {
  const [editId, setEditId] = useState("");
  const setEditIdAction = ({ id }: { id: string }) => setEditId(id);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const { data, isLoading: loading } = useQuery<SysUserPageResponseType>({
    queryKey: [
      "/sys/user/page",
      pagination.pageIndex,
      pagination.pageSize,
      columnFilters,
    ],
    queryFn: async () => {
      const response = await fetchSysUserPage({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        ...Object.fromEntries(
          columnFilters.map((filter) => [filter.id, filter.value])
        ),
      });
      return response.data;
    },
  });

  const table = useReactTable({
    data: data?.list || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },

    // enable row selection
    enableRowSelection: true,

    // use server side pagination
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),
    manualPagination: true,

    // user server side filtering
    manualFiltering: true,
    getFilteredRowModel: undefined,

    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <UserEditContext.Provider value={{ id: editId, setId: setEditIdAction }}>
      <div className="space-y-4">
        <DataTableToolbar table={table} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} total={data?.total || 0} />
      </div>
      <DataTableModelDrawer />
    </UserEditContext.Provider>
  );
}
