import Router from "koa-router";

import { sysAuthRouter } from "./auth";
import { sysTranslationRouter } from "./translation";
import { sysDictRouter } from "./dict";
import { sysUserRouter } from "./user";
import { sysRoleRouter } from "./role";

export const sysRouter = new Router({
  prefix: "/sys",
});

sysRouter.use(sysAuthRouter.routes(), sysAuthRouter.allowedMethods());
sysRouter.use(sysTranslationRouter.routes(), sysTranslationRouter.allowedMethods());
sysRouter.use(sysDictRouter.routes(), sysDictRouter.allowedMethods());
sysRouter.use(sysUserRouter.routes(), sysUserRouter.allowedMethods());
sysRouter.use(sysRoleRouter.routes(), sysRoleRouter.allowedMethods());
