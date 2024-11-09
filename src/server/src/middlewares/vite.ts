import express, { Express } from "express";
import { createServer as createViteServer } from "vite";

import { CLIENT_SERVER_PATH, IS_PRODUCTION } from "../constants";
import { route } from "./route";

export function vite(app: Express) {
  if (IS_PRODUCTION) {
    app.use(express.static(CLIENT_SERVER_PATH));
    app.use(route(app));
  } else {
    createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      root: CLIENT_SERVER_PATH,
    }).then((vite) => {
      app.use(vite.middlewares);
      app.use(route(app, vite));
    });
  }

  return (req, res, next) => {
    next();
  };
}
