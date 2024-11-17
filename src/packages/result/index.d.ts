import { AbstractResult } from "./index";

declare module "koa-router" {
  export interface IRouterParamContext<StateT = any, CustomT = {}> {
    send: (response: AbstractResult) => void;
  }
}
