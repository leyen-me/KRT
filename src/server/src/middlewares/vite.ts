import express, { Express } from "express";
import { createServer } from "vite";

import { CLIENT_SERVER_PATH, IS_PRODUCTION } from "../constants";
import { route } from "./route";

export function vite(app: Express) {
  if (IS_PRODUCTION) {
    app.use(express.static(CLIENT_SERVER_PATH));
  } else {
    createServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: Number(import.meta.env.VITE_PORT) + 1
        }
      },
      root: CLIENT_SERVER_PATH,
    }).then(async (server) => {
      app.use(server.middlewares);
    });
  }

  app.use(route(app));
  return (req, res, next) => {
    next();
  };
}
