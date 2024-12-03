import { createContext, useContext, useState, useEffect } from "react";
import { LOCALS, DEFAULT_LOCAL_NAME, DEFAULT_PATH, ILocalName } from "./locals";

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

// dynamic add i18n local values
export const addI18nLocalValues = (
  list: { key: string; type: ILocalName; value: string }[]
) => {
  const localsMap = new Map(LOCALS.map((local) => [local.name, local]));
  list.forEach((item) => {
    const local = localsMap.get(item.type);
    if (local) {
      // @ts-ignore
      local.value = { ...local.value, [item.key]: item.value };
    }
  });
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
  let locals = ctx
    ? LOCALS.find((local) => local.name === ctx.i18n)
    : LOCALS.find((local) => local.name === clientName);
  let result = locals!.value[key];
  return result ? result : key;
};
