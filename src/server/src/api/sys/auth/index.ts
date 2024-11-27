import Router from "koa-router";

import { SysAuthService } from "@/service/sys/auth";

export const authRouter = new Router({ prefix: "/auth" });
export const sysAuthService = new SysAuthService()

authRouter.post("/register", sysAuthService.register);
authRouter.post("/login", sysAuthService.login);
authRouter.post("/login-with-google", sysAuthService.loginWithGoogle);
authRouter.post("/logout", sysAuthService.logout);

authRouter.get("/user-info", sysAuthService.userInfo);