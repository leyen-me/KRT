import { userRouter } from "./user";
import { authRouter } from "./auth";
import Router from "koa-router";

export const sysRouter = new Router({
  prefix: "/sys",
});

sysRouter.use(authRouter.routes(), authRouter.allowedMethods());
sysRouter.use(userRouter.routes(), userRouter.allowedMethods());

// sysRouter.use("/auth", authRouter);
// sysRouter.use("/user", userRouter);
