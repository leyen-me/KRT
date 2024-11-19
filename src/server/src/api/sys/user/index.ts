import Router from "koa-router";

export const userRouter = new Router({
  prefix: "/user",
});

userRouter.get("/", (ctx) => {
  ctx.body = "Hello, World!";
});
