import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { MODEL_CREATE_FLAG_ID } from "@/constants";
import { t } from "@app/i18n";
import { UserRoleEditContext, UserRoleEditContextType } from "./data-table";

export function DataTableToolbarCreateBtn() {
  const { setId } = useContext(UserRoleEditContext) as UserRoleEditContextType;

  return (
    <Button
      variant="default"
      size="sm"
      className="ml-auto flex"
      onClick={() => setId({ id: MODEL_CREATE_FLAG_ID })}
    >
      <Plus />
      {t("pages.common.data_table.toolbar.create")}
    </Button>
  );
}
