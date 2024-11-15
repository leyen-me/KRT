import path from "path";
import { Express } from "express";

import Router from "koa-router";

import { apiRouter } from "../api";
import { CLIENT_SERVER_PATH, IS_PRODUCTION } from "../constants";

export function route(app: Express) {
  
  // router.use("/api", apiRouter);

  // if (IS_PRODUCTION) {
  //   app.get("*", (req, res) => {
  //     res.sendFile(path.resolve(CLIENT_SERVER_PATH, "index.html"));
  //   });
  // }
  // return (req, res, next) => {
  //   next();
  // };
}
