import fs from "fs";
import path from "path";

import { Express } from "express";
import { CLIENT_SERVER_PATH, IS_PRODUCTION } from "../constants";
import { ViteDevServer } from "vite";

import { apiRouter } from "../api";

export function route(app: Express, vite?: ViteDevServer) {
  app.use("/api", apiRouter);

  app.use("/*", async (req, res, next) => {
    const url = req.originalUrl;
    console.log("url", url);
    try {
      let template = fs.readFileSync(
        path.resolve(CLIENT_SERVER_PATH, "index.html"),
        "utf-8"
      );
      if (!IS_PRODUCTION && vite) {
        template = await vite.transformIndexHtml(url, template);
      }
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e: any) {
      if (!IS_PRODUCTION && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  return (req, res, next) => {
    next();
  };
}
