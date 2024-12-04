import { authRouter } from "./auth";
import { dictRouter } from "./dict";
import { translationRouter } from "./translation";
import { userRouter } from "./user";
import Router from "koa-router";

export const sysRouter = new Router({
  prefix: "/sys",
});

sysRouter.use(translationRouter.routes(), translationRouter.allowedMethods());
sysRouter.use(authRouter.routes(), authRouter.allowedMethods());
sysRouter.use(userRouter.routes(), userRouter.allowedMethods());
sysRouter.use(dictRouter.routes(), dictRouter.allowedMethods());
