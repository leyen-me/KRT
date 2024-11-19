import Koa from "koa";
import koaStatic from "koa-static";
import koaConnect from "koa-connect";
import koaSend from "koa-send";
import { createServer } from "vite";

import { CLIENT_SERVER_PATH, IS_PRODUCTION } from "../constants";
import { apiRouter } from "../api";
import { notFoundMiddleware } from "./error";

export async function createViteServer(app: Koa) {
  // Register API routes
  app.use(apiRouter.routes());
  // Fix API router 404
  app.use(notFoundMiddleware);
  app.use(apiRouter.allowedMethods());

  if (IS_PRODUCTION) {
    // Routes other than API routes
    app.use(koaStatic(CLIENT_SERVER_PATH));
    if (IS_PRODUCTION) {
      // Fix react router or vue router history mode
      app.use(async (ctx) => {
        await koaSend(ctx, "index.html", { root: CLIENT_SERVER_PATH });
      });
    }
  } else {
    // Routes other than API routes
    const server = await createServer({
      server: {
        middlewareMode: true,
        hmr:{
          port: 9002,
          clientPort: 9002
        }
      },
      root: CLIENT_SERVER_PATH,
    });
    app.use(koaConnect(server.middlewares));
  }
}
