// Authentication

import { decrypt, encrypt } from "@/utils/pwUtils";
import { sysAuthService } from "@/service/sys/auth";
import Router from "koa-router";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/register", (ctx, next) => {
  ctx.body = "register!";
});

export type LoginVo = {
  email: string;
  password: string;
};
export type LoginVoKeys = keyof LoginVo;

export type LoginResponseVo = {
  token: string;
};

authRouter.get("/login", async (ctx, next) => {
  throw new Error("test error");
  // const { email, password } = ctx.body as LoginVo;
  // // todo: 参数校验
  // const result = await sysAuthService.login({ email, password });
  // ctx.body = result;
  ctx.body = "login!";
});

authRouter.post("/logout", (ctx, next) => {
  ctx.body = "logout!";
});
