import Router from "koa-router";

import { SysAuthService } from "@/service/sys/auth";
import { LoginSchema, LoginWithGoogleSchema, RegisterSchema } from "@/model";
import { validate } from "@/middlewares/validate";

export const authRouter = new Router({ prefix: "/auth" });
export const sysAuthService = new SysAuthService()

authRouter.post("/register", validate(RegisterSchema), sysAuthService.register);
authRouter.post("/login", validate(LoginSchema), sysAuthService.login);
authRouter.post("/login-with-google", validate(LoginWithGoogleSchema), sysAuthService.loginWithGoogle);
authRouter.post("/logout", sysAuthService.logout);

authRouter.get("/user-info", sysAuthService.userInfo);