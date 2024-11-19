import en from "./en";
import zhCn from "./zh-CN";
import { flattenObject } from "@app/helper/tree";

export const LOCALS = [
  {
    name: "en",
    value: en,
    flat: flattenObject(en),
    i18nName: "pages.common.i18n.en",
  },
  {
    name: "zh-CN",
    value: zhCn,
    flat: flattenObject(zhCn),
    i18nName: "pages.common.i18n.zhCn",
  },
] as const;

export type ILocalName = (typeof LOCALS)[number]["name"];
export const DEFAULT_PATH = "/";
export const DEFAULT_LOCAL_NAME: ILocalName = "en";