import Router from "koa-router";
import { sysRouter } from "./sys";
import { errorMiddleware } from "../middlewares/error";

export const apiRouter = new Router({ prefix: "/api" });
apiRouter.use(errorMiddleware);
apiRouter.use(sysRouter.routes(), sysRouter.allowedMethods());