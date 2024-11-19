import { AbstractResult } from "./index";

declare module "koa" {
  export interface Context {
    send: (response: AbstractResult) => void;
  }
}
declare module "koa-router" {
  interface IRouterParamContext {
    send: (response: AbstractResult) => void;
  }
}