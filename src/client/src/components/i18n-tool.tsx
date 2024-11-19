import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setI18n, t, useI18nContext } from "@app/i18n";
import { LOCALS, DEFAULT_LOCAL_NAME } from "@app/i18n/locals";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function I18nTool() {
  const [currentName, setCurrentName] = useState("");
  const { name } = useI18nContext();
  const rLocation = useLocation()
  
  useEffect(() => {
    setCurrentName(LOCALS.find((local) => local.name === name)!.i18nName);
  }, [name]);

  const handleToggleLocal = (name: string) => {
    setI18n(name, rLocation);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t(currentName)}
          <span className="sr-only">Toggle lang</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALS.map((local) => {
          return (
            <DropdownMenuItem
              key={local.name}
              onClick={() => handleToggleLocal(local.name)}
            >
              {t(local.i18nName)}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          onClick={() => {
            handleToggleLocal(DEFAULT_LOCAL_NAME);
          }}
        >
          {t("pages.common.i18n.system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
