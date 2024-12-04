import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchSysTranslationAll } from "@/api/sys/translation";
import { QUERY_KEY } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import { LOCALS } from "@app/i18n/locals";
import { Badge } from "./ui/badge";
import { SysTranslationAllResponseType } from "@app/server/src/model";
import { t } from "@app/i18n";

type I18nComboBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function I18nComboBox({ value, onChange }: I18nComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery<SysTranslationAllResponseType>({
    queryKey: [QUERY_KEY.SYS_TRANSLATION_ALL],
    queryFn: async () => {
      const response = await fetchSysTranslationAll();
      return response.data;
    },
  });

  const currentItem = data?.find((item) => item.key === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex min-w-[240px] w-auto justify-between"
        >
          {currentItem
            ? currentItem.key
            : t("components.i18n_combo_box.select")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder={t("components.i18n_combo_box.select")} />
          <CommandList>
            <CommandEmpty>
              {t("components.i18n_combo_box.no_transkey_found")}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.key}
                  value={
                    item.key +
                    "/" +
                    LOCALS.map((local) => {
                      return item[local.name];
                    }).join("/")
                  }
                  onSelect={(currentValue) => {
                    const [key] = currentValue.split("/");
                    onChange(key === value ? "" : key);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.key ? "flex" : "hidden"
                    )}
                  />
                  <div className="flex gap-2">
                    {LOCALS.map((local) => {
                      return (
                        <Badge key={local.name} variant="outline">
                          {item[local.name]}
                        </Badge>
                      );
                    })}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
