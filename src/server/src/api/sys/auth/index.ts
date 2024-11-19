import { sysAuthService } from "@/service/sys/auth";
import Router from "koa-router";

export const authRouter = new Router({ prefix: "/auth" });
authRouter.post("/register", sysAuthService.register);
authRouter.post("/login", sysAuthService.login);
authRouter.post("/logout", sysAuthService.logout);