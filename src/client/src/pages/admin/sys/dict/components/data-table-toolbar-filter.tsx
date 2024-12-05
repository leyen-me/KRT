import { SysDictDetailResponseType } from "@app/server/src/model";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { t } from "@app/i18n";

type DataTableToolbarFilterProps<TData extends SysDictDetailResponseType> = {
  table: Table<TData>;

  isColumnFiltered: boolean;
  onResetColumnFilters: () => void;
};

export function DataTableToolbarFilter<
  TData extends SysDictDetailResponseType
>({
  table,
  isColumnFiltered,
  onResetColumnFilters,
}: DataTableToolbarFilterProps<TData>) {
  return (
    <div className="flex flex-1 items-center space-x-2">
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
