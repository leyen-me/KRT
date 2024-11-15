import { Context } from "koa";
import { Result } from "@/utils/result-utils";
import { Next } from "koa";

/**
 * Enhance context with response methods
 */
export const responseMiddleware = async (ctx: Context, next: Next) => {
  // Add response helper methods to context
  ctx.success = (data?: any, message?: string) => {
    ctx.status = 200;
    ctx.body = Result.success(data, message);
  };

  ctx.error = (message?: string, code: number = 500) => {
    ctx.status = code;
    ctx.body = Result.error(message, code);
  };

  ctx.send = (code: number, data?: any, message?: string) => {
    ctx.status = code;
    ctx.body = Result.custom(code, data, message);
  };

  await next();
};
