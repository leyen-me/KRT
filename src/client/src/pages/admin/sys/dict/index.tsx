import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { t } from "@app/i18n";
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { columns as dictColumns } from "./components/columns";
import { DataTable as DictDataTable } from "./components/data-table";

import { columns as dictItemColumns } from "./item/components/columns";
import { DataTable as DictItemDataTable } from "./item/components/data-table";

export type DictContextType = {
  activeDict: string;
  setActiveDict: Dispatch<SetStateAction<string>>;
};
export const DictContext = createContext<DictContextType | null>(null);

export default function SysDictPage() {
  const [activeDict, setActiveDict] = useState("");

  return (
    <DictContext.Provider value={{ activeDict, setActiveDict }}>
      <div className="h-full flex gap-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>{t("pages.admin.sys.dict.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DictDataTable columns={dictColumns} />
          </CardContent>
        </Card>
        <Card className="w-1/2 h-full">
          <CardHeader>
            <CardTitle>{t("pages.admin.sys.dict.item.title")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-56px)]">
            {!activeDict ? (
              <div className="h-full flex items-center justify-center">
                {t("pages.admin.sys.dict.item.no_select")}
              </div>
            ) : (
              <DictItemDataTable columns={dictItemColumns} />
            )}
          </CardContent>
        </Card>
      </div>
    </DictContext.Provider>
  );
}
