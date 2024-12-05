import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { t } from "@app/i18n";
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { columns as roleColumns } from "./components/columns";
import { DataTable as RoleDataTable } from "./components/data-table";

import { columns as userRoleColumns } from "./item/components/columns";
import { DataTable as UserRoleDataTable } from "./item/components/data-table";

export type RoleContextType = {
  activeRole: string;
  setActiveRole: Dispatch<SetStateAction<string>>;
};
export const RoleContext = createContext<RoleContextType | null>(null);

export default function SysRolePage() {
  const [activeRole, setActiveRole] = useState("");

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole }}>
      <div className="h-full flex gap-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>{t("pages.admin.sys.role.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <RoleDataTable columns={roleColumns} />
          </CardContent>
        </Card>
        <Card className="w-1/2 h-full">
          <CardHeader>
            <CardTitle>{t("pages.admin.sys.role.item.title")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-56px)]">
            {!activeRole ? (
              <div className="h-full flex items-center justify-center">
                {t("pages.admin.sys.role.item.no_select")}
              </div>
            ) : (
              <UserRoleDataTable columns={userRoleColumns} />
            )}
          </CardContent>
        </Card>
      </div>
    </RoleContext.Provider>
  );
}
