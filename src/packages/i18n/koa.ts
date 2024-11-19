import { LOCALS, DEFAULT_LOCAL_NAME } from "./locals";

export const checkLocaByName = (name: string) => {
  return (
    LOCALS.find((local) => local.name === name) ||
    LOCALS.find((local) => local.name === DEFAULT_LOCAL_NAME)
  );
};

export const koaI18n = () => {
  return async (ctx: any, next: any) => {
    ctx.i18n = checkLocaByName(ctx.header["x-i18n"])?.name;
    await next();
  };
};
