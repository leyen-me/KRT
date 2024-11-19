import { AbstractResult, IResult } from "./index";

declare module "koa" {
  export interface Context {
    send: <T>(response: AbstractResult<T>) => IResult<T>;
  }
}
declare module "koa-router" {
  interface IRouterParamContext {
    send: <T>(response: AbstractResult<T>) => IResult<T>;
  }
}