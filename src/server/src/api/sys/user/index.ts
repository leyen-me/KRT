import Router from "koa-router";

export const userRouter = new Router({
  prefix: "/user",
});

userRouter.get("/", (ctx, next) => {
  ctx.body = "Hello, World!";
});
