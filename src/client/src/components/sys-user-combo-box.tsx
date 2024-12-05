import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

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
import { fetchSysUserList } from "@/api/sys/user";
import { QUERY_KEY } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import { t } from "@app/i18n";
import { SysUserListResponseType } from "@app/server/src/model";

type SysUserComboBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SysUserComboBox({ value, onChange }: SysUserComboBoxProps) {
  const [open, setOpen] = useState(false);
  const { data } = useQuery<SysUserListResponseType>({
    queryKey: [QUERY_KEY.SYS_USER_LIST],
    queryFn: async () => {
      const response = await fetchSysUserList();
      return response.data;
    },
  });

  const currentItem = data?.find((item) => item.id === value);

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
            ? currentItem.email
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
                  key={item.id}
                  value={`${item.id}/${item.email}/${item.nickname}`}
                  onSelect={(currentValue) => {
                    const [id] = currentValue.split("/");
                    onChange(id === value ? "" : id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "flex" : "hidden"
                    )}
                  />
                  <div className="flex gap-2">
                    {item.email}
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
