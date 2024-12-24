import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { SysUserDetailResponseType } from "@app/server/src/model";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constants";
import { SysUserPageResponseType } from "@app/server/src/model";
import { fetchSysUserPage } from "@/api/sys/user";
import { QUERY_KEY } from "@/constants/query-key";
import { t } from "@app/i18n";

interface DataTableProps {
  columns: ColumnDef<SysUserDetailResponseType, any>[];
  data: any[];
}

export function DataTable({ columns, data }: DataTableProps) {
  // 展开状态管理
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // 基础分页参数
  const [pagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  // 查询数据
  // const { data } = useQuery<SysUserPageResponseType>({
  //   queryKey: [
  //     QUERY_KEY.SYS_USER_PAGE,
  //     pagination.pageIndex,
  //     pagination.pageSize,
  //   ],
  //   queryFn: async () => {
  //     const response = await fetchSysUserPage({
  //       page: pagination.pageIndex + 1,
  //       pageSize: pagination.pageSize,
  //     });
  //     return response.data;
  //   },
  // });

  // 处理展开/关闭
  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow 
                key={row.id}
                onClick={() => toggleRow(row.original.id)}
                className="cursor-pointer"
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
  );
}