import { ZodError, ZodSchema } from "zod";
import { Context, Next } from "koa";
import { I18nResult } from "@app/result";

export const validate =
  (schema: ZodSchema) => async (ctx: Context, next: Next) => {
    try {
      // get, delete
      // convert string numbers to numbers in query
      const parseQueryParams = (query: any) => {
        return Object.fromEntries(
          Object.entries(query).map(([key, value]) => {
            if (typeof value === "string" && !isNaN(Number(value))) {
              return [key, Number(value)];
            }
            if (value === "true") return [key, true];
            if (value === "false") return [key, false];
            return [key, value];
          })
        );
      };
      // data
      let dataToValidate: any = {
        GET: parseQueryParams(ctx.query),
        POST: ctx.request.body,
        PUT: ctx.request.body,
        DELETE: parseQueryParams(ctx.query),
      }[ctx.method];
      // validate
      const validatedData = await schema.parseAsync(dataToValidate);
      // set to ctx
      switch (ctx.method) {
        case "GET":
          ctx.state.query = validatedData;
          break;
        case "POST":
          ctx.state.body = validatedData;
          break;
        case "PUT":
          ctx.state.body = validatedData;
          break;
        case "DELETE":
          ctx.state.query = validatedData;
          break;
        default:
          break;
      }
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
