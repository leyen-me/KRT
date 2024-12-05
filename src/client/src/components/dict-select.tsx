import { useDictStore } from "@/stores/useDictStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SysDictItem } from "@app/server/src/model";
import { t } from "@app/i18n";

type DictSelectProps = {
    code: string
    value: any
    onChange: (value: string | boolean) => void;
}

export function DictSelect({ code, value, onChange }: DictSelectProps) {
    const { dictList } = useDictStore()
    let items: SysDictItem[] = []
    const dict = dictList.find((dict) => dict.code === code)
    if (dict) {
        items = dict.items
    }
    const isBoolean = typeof value === "boolean"
    return (
        <Select
            onValueChange={(e) => {
                onChange(isBoolean ? e === 'true' : e)
            }}
            defaultValue={isBoolean ? String(value) : value}
            value={isBoolean ? String(value) : value}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    items.map((item) => {
                        return <SelectItem key={item.value} value={item.value}>
                            {t(item.name)}
                        </SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    );
}
