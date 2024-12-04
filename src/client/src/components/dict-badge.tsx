import { useDictStore } from "@/stores/useDictStore";
import { Badge } from "./ui/badge";
import { SysDictItem } from "@app/server/src/model";
import { t } from "@app/i18n";

type DictBadgeProps = {
    code: string;
    value: string | boolean;
};

export function DictBadge({ code, value }: DictBadgeProps) {
    const { dictList } = useDictStore();
    const dict = dictList.find((dict) => dict.code === code);
    const items: SysDictItem[] = dict?.items || [];
    const item = items.find(item => String(item.value) === String(value));

    return (
        <Badge variant={item?.variant}>
            {item ? t(item.transKey) : t('unknown')}
        </Badge>
    );
}