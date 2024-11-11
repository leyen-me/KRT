export const LOCALS_STORAGE_KEY = "lang";

export const locals = [
  {
    name: "en",
    value: import("./locals/en"),
  },
  {
    name: "zh-CN",
    value: import("./locals/zh-CN"),
  },
];

export type LocalInfo = {
  baseName: string;
  lang: string;
};

/**
 * all routes should not start with en or zh-CN
 * @returns
 */
export const getLocalInfo = (): LocalInfo => {
  const regex = new RegExp(
    "^/(" + locals.map((local) => `${local.name}`).join("|") + ")"
  );
  const info = location.pathname.match(regex);
  if (info === null) {
    return {
      lang: locals[0].name,
      baseName: "/",
    };
  }
  return {
    lang: info[1],
    baseName: info[0],
  };
};
