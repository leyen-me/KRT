import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { SysUserDetailResponseType } from "@app/server/src/model";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { t } from "@app/i18n";

export const columns: ColumnDef<SysUserDetailResponseType>[] = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.user.data_table.columns.email")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.user.data_table.columns.nickname")}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("nickname")}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.user.data_table.columns.mobile")}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.user.data_table.columns.status")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("status")}</div>,
  },

  {
    accessorKey: "superAdmin",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.user.data_table.columns.super_admin")}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{String(row.getValue("superAdmin"))}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("pages.admin.sys.user.data_table.columns.gender")}
      />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("gender")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
