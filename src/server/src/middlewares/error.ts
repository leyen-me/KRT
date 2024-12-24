import { BaseError } from "@/error/BaseError";
import { I18nResult } from "@app/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2003") {
      return ctx.send(new I18nResult(200_2003));
    }
    if (err instanceof BaseError) {
      return ctx.send(new I18nResult(err.code));
    }
    return ctx.send(new I18nResult(500));
  }
};
