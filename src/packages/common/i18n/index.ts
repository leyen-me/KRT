import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import en from "./locals/en";
import zhCn from "./locals/zh-CN";

// 支持的语言列表
const DEFAULT_PATH = "/";
export const LOCALS = [
  {
    default: true,
    name: "en",
    value: en,
    i18nName: "pages.common.i18n.en",
  },
  {
    name: "zh-CN",
    value: zhCn,
    i18nName: "pages.common.i18n.zhCn",
  },
];

// I18n 状态接口
export type I18nInfo = {
  name: string;
  path: string;
};

// 创建一个空的 I18nContext 上下文
export const I18nContext = createContext<I18nInfo | undefined>(undefined);

// 获取当前语言和路径信息的 Hook
export const useI18n = () => {
  const [i18nInfo, setI18nInfo] = useState<I18nInfo>({
    name: LOCALS.find((local) => local.default)!.name, // 默认语言
    path: DEFAULT_PATH,
  });

  useEffect(() => {
    // 从 URL 获取语言信息
    const info = location.pathname.match(
      new RegExp("^/(" + LOCALS.map((local) => local.name).join("|") + ")")
    );

    if (info) {
      setI18nInfo({
        name: info[1],
        path: info[0],
      });
    } else {
      // 如果 URL 中没有语言部分，使用默认语言
      const defaultLocal = LOCALS.find((local) => local.default);
      if (defaultLocal) {
        setI18nInfo({
          name: defaultLocal.name,
          path: DEFAULT_PATH,
        });
      }
    }
  }, []); // 只在组件挂载时运行一次

  return { i18nInfo };
};

// I18nContext 提供的 Hook
export const useI18nContext = (): I18nInfo => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("I18nContext is not initialized");
  }
  return context;
};

// 用于切换语言的函数
export const setI18n = (name: string, rLocation: any) => {
  // 判断是否是系统语言
  const isSystem = LOCALS.find((local) => local.name === name)?.default;
  let path = rLocation.pathname + rLocation.search;
  if (!isSystem) {
    path = "/" + name + path;
  }
  window.location.href = path;
};

// t 函数用于获取翻译
export const t = (key: string): string => {
  const { name } = useI18nContext();
  const local = LOCALS.find((local) => local.name === name)?.value;

  if (!local) {
    return key; // 如果没有找到对应语言，返回原始 key
  }

  // 使用 useRef 缓存翻译结果
  const cacheRef = useRef<Map<string, string>>(new Map());

  if (cacheRef.current.has(key)) {
    return cacheRef.current.get(key) as string;
  }

  // 根据 key 从语言包中递归查找
  const keys = key.split(".");
  let result: any = local;

  for (let k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k]; // 深度查找
    } else {
      return key; // 找不到时返回原始 key
    }
  }

  if (typeof result === "string") {
    cacheRef.current.set(key, result); // 缓存翻译结果
    return result;
  }

  return key; // 如果结果不是字符串，返回原始 key
};
