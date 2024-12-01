import { ZodError, ZodSchema } from "zod";
import { Context, Next } from "koa";
import { I18nResult } from "@app/result";

export const validate =
  (schema: ZodSchema) => async (ctx: Context, next: Next) => {
    try {
      ctx.state.body = await schema.parseAsync(ctx.request.body);
      await next();
    } catch (error: any) {
      // send error
      if (error instanceof ZodError) {
        ctx.send(new I18nResult(501, error.errors));
        return;
      }
      // throw error
      throw error;
    }
  };
