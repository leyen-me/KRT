import { createContext, useContext, useState, useEffect } from "react";
import en from "./locals/en";
import zhCn from "./locals/zh-CN";
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

export const checkLocaByName = (name: string) => {
  return (
    LOCALS.find((local) => local.name === name) ||
    LOCALS.find((local) => local.name === DEFAULT_LOCAL_NAME)
  );
};
export const checkLocaByPathname = (pathname: string) => {
  return pathname.match(
    new RegExp("^/(" + LOCALS.map((local) => local.name).join("|") + ")")
  );
};

// react context
export type I18nInfo = { name: string; path: string };
export const I18nContext = createContext<I18nInfo | undefined>(undefined);
export const useI18nContext = (): I18nInfo => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("I18nContext is not initialized");
  }
  return context;
};

// react hook
export const useI18n = () => {
  const [i18nInfo, setI18nInfo] = useState<I18nInfo>({
    name: DEFAULT_LOCAL_NAME,
    path: DEFAULT_PATH,
  });

  useEffect(() => {
    const info = checkLocaByPathname(location.pathname);
    if (info) {
      setI18nInfo({
        name: info[1],
        path: info[0],
      });
    }
  }, []);
  return { i18nInfo };
};

// no hook
export const getI18n = (): I18nInfo => {
  let i18nInfo: I18nInfo = {
    name: DEFAULT_LOCAL_NAME,
    path: DEFAULT_PATH,
  };
  const info = checkLocaByPathname(location.pathname);
  if (info) {
    i18nInfo = {
      name: info[1],
      path: info[0],
    };
  }
  return i18nInfo;
};

// set i18n
export const setI18n = (name: string, rLocation: any) => {
  const isSystem = name === DEFAULT_LOCAL_NAME;
  let path = rLocation.pathname + rLocation.search;
  if (!isSystem) {
    path = "/" + name + path;
  }
  window.location.href = path;
};

// translate
// no ctx is client, has ctx is server
export const t = (key: string, ctx?: any): string => {
  let clientName: string | null = null;
  if (!ctx) {
    const { name } = getI18n();
    clientName = name;
  }
  let local = ctx
    ? LOCALS.find((local) => local.name === ctx.i18n)
    : LOCALS.find((local) => local.name === clientName);
  let result = local!.flat[key];
  return result ? result : key;
};

export const koaI18n = () => {
  return async (ctx: any, next: any) => {
    ctx.i18n = checkLocaByName(ctx.header["x-i18n"])?.name;
    await next();
  };
};
