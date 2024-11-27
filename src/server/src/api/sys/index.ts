import { authRouter } from "./auth";
import { userRouter } from "./user";
import Router from "koa-router";

export const sysRouter = new Router({
  prefix: "/sys",
});

sysRouter.use(authRouter.routes(), authRouter.allowedMethods());
sysRouter.use(userRouter.routes(), userRouter.allowedMethods());
