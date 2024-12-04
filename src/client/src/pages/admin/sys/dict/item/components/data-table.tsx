import {
  ColumnDef,
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
  SysDictItemDetailResponseType,
  SysDictItemListResponseType,
} from "@app/server/src/model";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTableModelDrawer } from "./data-table-model-drawer";
import { QUERY_KEY } from "@/constants/query-key";
import { IResult } from "@app/result";
import { useToast } from "@/hooks/use-toast";
import { t } from "@app/i18n";
import {
  fetchSysDictItemDelete,
  fetchSysDictItemList,
} from "@/api/sys/dict/item";
import { DictContext } from "../..";
import { DictContextType } from "../..";

interface DataTableProps {
  columns: ColumnDef<SysDictItemDetailResponseType, any>[];
}

export type DictItemEditContextType = {
  id: string;
  setId: ({ id }: { id: string }) => void;
};
export const DictItemEditContext =
  createContext<DictItemEditContextType | null>(null);

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

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const { activeDict } = useContext(DictContext) as DictContextType;

  const { data } = useQuery<SysDictItemListResponseType>({
    queryKey: [QUERY_KEY.SYS_DICT_ITEM_LIST],
    queryFn: async () => {
      const response = await fetchSysDictItemList({
        dictId: activeDict,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (activeDict) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SYS_DICT_ITEM_LIST],
      });
    }
  }, [activeDict]);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },

    // enable row selection
    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
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
    mutationFn: fetchSysDictItemDelete,
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SYS_DICT_ITEM_LIST],
      });
    },
    onError: (error) => {
      toast({
        title: t("pages.common.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const onDelete = () => {
    mutateDelete({
      ids: Array.from(selectedIds),
    });
  };

  return (
    <DictItemEditContext.Provider
      value={{ id: editId, setId: setEditIdAction }}
    >
      <div className="space-y-4">
        <DataTableToolbar
          table={table}
          isDelete={selectedIds.size > 0}
          onDelete={onDelete}
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
      </div>
      <DataTableModelDrawer />
    </DictItemEditContext.Provider>
  );
}
