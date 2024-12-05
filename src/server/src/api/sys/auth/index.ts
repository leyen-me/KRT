import Router from "koa-router";

import { SysAuthService } from "@/service/sys/auth";
import { LoginSchema, LoginWithGoogleSchema, RegisterSchema } from "@/model";
import { validate } from "@/middlewares/validate";

export const sysAuthRouter = new Router({ prefix: "/auth" });
export const sysAuthService = new SysAuthService()

sysAuthRouter.post("/register", validate(RegisterSchema), sysAuthService.register);
sysAuthRouter.post("/login", validate(LoginSchema), sysAuthService.login);
sysAuthRouter.post("/login-with-google", validate(LoginWithGoogleSchema), sysAuthService.loginWithGoogle);
sysAuthRouter.post("/logout", sysAuthService.logout);
sysAuthRouter.post("/user-info", sysAuthService.userInfo);