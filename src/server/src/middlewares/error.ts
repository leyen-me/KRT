import { BaseError } from "@/error/BaseError";
import { I18nResult } from "@app/result";
import { Context, Next } from "koa";

export const notFoundMiddleware = async (ctx: Context, next: Next) => {
  // Check if it's an API route
  if (ctx.path.startsWith("/api/")) {
    ctx.send(new I18nResult(404));
  } else {
    await next();
  }
};

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    console.error(err);
    if (err instanceof BaseError) {
      ctx.send(new I18nResult(err.code));
    } else {
      ctx.send(new I18nResult(500));
    }
  }
};
