import Router from "koa-router";

import { SysAuthService } from "@/service/sys/auth";

export const authRouter = new Router({ prefix: "/auth" });
export const sysAuthService = new SysAuthService({ tableName: "sys_auth" })

authRouter.post("/register", sysAuthService.register);
authRouter.post("/login", sysAuthService.login);
authRouter.post("/logout", sysAuthService.logout);