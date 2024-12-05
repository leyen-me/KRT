import { SysRoleDetailResponseType } from "@app/server/src/model";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { t } from "@app/i18n";
import { Input } from "@/components/ui/input";

type DataTableToolbarFilterProps<TData extends SysRoleDetailResponseType> = {
  table: Table<TData>;

  isColumnFiltered: boolean;
  onResetColumnFilters: () => void;
};

export function DataTableToolbarFilter<
  TData extends SysRoleDetailResponseType
>({
  table,
  isColumnFiltered,
  onResetColumnFilters,
}: DataTableToolbarFilterProps<TData>) {
  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder={t("pages.admin.sys.role.data_table.columns.code")}
        value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("code")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {isColumnFiltered && (
        <Button
          variant="ghost"
          onClick={onResetColumnFilters}
          className="h-8 px-2 lg:px-3"
        >
          {t("pages.common.data_table.toolbar.reset")}
          <X />
        </Button>
      )}
    </div>
  );
}
