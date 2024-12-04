import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { t } from "@app/i18n";
import { SysTranslationDetailResponseType } from "@app/server/src/model";

export const columns: ColumnDef<SysTranslationDetailResponseType>[] = [
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
    accessorKey: "key",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.translation.data_table.columns.key")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("key")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.translation.data_table.columns.type")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.translation.data_table.columns.value")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("value")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
