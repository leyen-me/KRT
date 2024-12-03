import en from "./en";
import zh_CN from "./zh_CN";

export const LOCALS = [
  {
    name: "en",
    value: en,
    i18nName: "pages.common.i18n.en",
  },
  {
    name: "zh_CN",
    value: zh_CN,
    i18nName: "pages.common.i18n.zhCn",
  },
] as const;

export type ILocalName = (typeof LOCALS)[number]["name"];
export const DEFAULT_PATH = "/";
export const DEFAULT_LOCAL_NAME: ILocalName = "en";
