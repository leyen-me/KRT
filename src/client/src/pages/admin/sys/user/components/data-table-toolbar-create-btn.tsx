import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { UserEditContext, UserEditContextType } from "./data-table";
import { MODEL_CREATE_FLAG_ID } from "@/constants";
import { t } from "@app/i18n";

export function DataTableToolbarCreateBtn() {
  const { setId } = useContext(UserEditContext) as UserEditContextType;
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto flex"
      onClick={() => setId({ id: MODEL_CREATE_FLAG_ID })}
    >
      <Plus />
      {t("pages.common.data_table.toolbar.create")}
    </Button>
  );
}
