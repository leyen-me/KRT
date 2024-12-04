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
import { DataTableToolbar } from "./data-table-toolbar";
import {
  DeleteResponseType,
  DeleteSchemaType,
  SysTranslationDetailResponseType,
  SysTranslationPageResponseType,
} from "@app/server/src/model";
import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constants";
import { DataTableModelDrawer } from "./data-table-model-drawer";
import { QUERY_KEY } from "@/constants/query-key";
import { IResult } from "@app/result";
import { useToast } from "@/hooks/use-toast";
import { t } from "@app/i18n";
import { fetchSysTranslationDelete, fetchSysTranslationPage } from "@/api/sys/translation";
import { DataTablePagination } from "@/components/data-table-pagination";

interface DataTableProps {
  columns: ColumnDef<SysTranslationDetailResponseType, any>[];
}

export type TranslationEditContextType = {
  id: string;
  setId: ({ id }: { id: string }) => void;
};
export const TranslationEditContext = createContext<TranslationEditContextType | null>(null);

export function DataTable({ columns }: DataTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [editId, setEditId] = useState("");
  const setEditIdAction = ({ id }: { id: string }) => setEditId(id);

  // selected ids
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    const currentPageSelectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    const currentPageAllRows = table
      .getRowModel()
      .rows.map((row) => row.original.id);

    const newSelectedIds = new Set(selectedIds);

    currentPageAllRows.forEach((id) => {
      if (!currentPageSelectedRows.includes(id) && newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      }
    });

    currentPageSelectedRows.forEach((id) => {
      newSelectedIds.add(id);
    });

    setSelectedIds(newSelectedIds);
  }, [rowSelection]);

  // page change
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const { data } = useQuery<SysTranslationPageResponseType>({
    queryKey: [
      QUERY_KEY.SYS_TRANSLATION_PAGE,
      pagination.pageIndex,
      pagination.pageSize,
      columnFilters,
    ],
    queryFn: async () => {
      const response = await fetchSysTranslationPage({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        ...Object.fromEntries(
          columnFilters.map((filter) => [filter.id, filter.value])
        ),
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      // set selected ids
      const newSelection: Record<number, boolean> = {};
      for (const id of selectedIds) {
        const index = data?.list.findIndex((user) => id === user.id);
        if (index !== -1 && index !== undefined) {
          newSelection[index] = true;
        }
      }
      if (Object.keys(newSelection).length > 0) {
        setRowSelection({});
        setRowSelection(newSelection);
      } else {
        setRowSelection({});
      }
    }
  }, [pagination, data]);

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

  const { mutate: mutateDelete } = useMutation<
    IResult<DeleteResponseType>,
    Error,
    DeleteSchemaType
  >({
    mutationFn: fetchSysTranslationDelete,
    onSuccess: (res) => {
      const { message } = res;
      toast({
        title: t("pages.common.toast.success.description"),
        variant: "success",
        description: message,
      });
      // 清空选中
      setRowSelection({});
      setSelectedIds(new Set());
      // 刷新
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SYS_TRANSLATION_PAGE] });
    },
    onError: (error) => {
      toast({
        title: t("pages.common.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const isColumnFiltered = table.getState().columnFilters.length > 0;
  const onResetColumnFilters = () => {
    table.resetColumnFilters();
  };

  const onDelete = () => {
    mutateDelete({
      ids: Array.from(selectedIds),
    });
  };

  return (
    <TranslationEditContext.Provider value={{ id: editId, setId: setEditIdAction }}>
      <div className="space-y-4">
        <DataTableToolbar
          table={table}
          isDelete={selectedIds.size > 0}
          onDelete={onDelete}
          isColumnFiltered={isColumnFiltered}
          onResetColumnFilters={onResetColumnFilters}
        />
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
                    {t("pages.common.data_table.no_data")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} total={data?.total || 0} />
      </div>
      <DataTableModelDrawer />
    </TranslationEditContext.Provider>
  );
}
