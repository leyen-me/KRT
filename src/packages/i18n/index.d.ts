import type { ILocalName } from './index.ts'

import Router = require('koa-router')

declare module "koa-router" {
  export interface IRouterParamContext<StateT = any, CustomT = {}> {
    i18n: ILocalName;
  }
}

