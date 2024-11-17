import { sysAuthService } from "@/service/sys/auth";
import Router from "koa-router";
import { I18nResult, Result } from "@app/result";
import { UserNotFound } from "@/error/sys/auth/UserNoFound";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/register", (ctx) => {
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

authRouter.get("/login", async (ctx) => {
  throw new UserNotFound();

  // const { email, password } = ctx.body as LoginVo;
  // // todo: 参数校验
  // const result = await sysAuthService.login({ email, password });
  // ctx.body = result;
  // ctx.body = "login!";
  // ctx.send(new Result(200));
  ctx.send(new I18nResult(200));
});

authRouter.post("/logout", (ctx) => {
  ctx.body = "logout!";
});
