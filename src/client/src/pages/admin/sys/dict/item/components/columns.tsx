import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { t } from "@app/i18n";
import { SysDictItemDetailResponseType } from "@app/server/src/model";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<SysDictItemDetailResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.common.data_table.column.id")}
      />
    ),
    cell: ({ row }) => (
      <div className="max-w-[80px] truncate">{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.dict.item.data_table.columns.name")}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{t(row.getValue("name"))}</div>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.dict.item.data_table.columns.value")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("value")}</div>,
  },
  {
    accessorKey: "sort",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.dict.item.data_table.columns.sort")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("sort")}</div>,
  },
  {
    accessorKey: "variant",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.dict.item.data_table.columns.variant")}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {
          <Badge variant={row.getValue("variant")}>
            {row.getValue("variant")}
          </Badge>
        }
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
