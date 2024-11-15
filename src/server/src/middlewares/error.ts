import { RESPONSE_NO_FOUND_CODE } from "@/constants";
import { Context, Next } from "koa";

export const notFoundMiddleware = async (ctx: Context, next: Next) => {
  // Check if it's an API route
  if (ctx.path.startsWith("/api/")) {
    // ctx.success()
    ctx.status = RESPONSE_NO_FOUND_CODE;
    ctx.body = {
      error: "API Not Found",
      status: RESPONSE_NO_FOUND_CODE,
    };
  } else {
    await next();
  }
};

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      code: err.status || 500,
      message: err.message || "服务器内部错误",
    };
  }
};
