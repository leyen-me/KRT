import Router from "koa-router";
import { sysRouter } from "./sys";
import { errorMiddleware } from "../middlewares/error";
import { authMiddleware } from "@/middlewares/auth";

export const apiRouter = new Router({ prefix: "/api" });
apiRouter.use(authMiddleware);
apiRouter.use(errorMiddleware);
apiRouter.use(sysRouter.routes(), sysRouter.allowedMethods());
