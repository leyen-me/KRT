import type { ILocalName } from "./index.ts";

declare module "koa" {
  export interface Context {
    i18n: ILocalName;
  }
}

declare module "koa-router" {
  interface IRouterParamContext {
    i18n: ILocalName;
  }
}
