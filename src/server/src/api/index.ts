import express from "express";
import { sysRouter } from "./sys";

export const apiRouter = express.Router();

apiRouter.use("/sys", sysRouter);

// 404
apiRouter.use((req, res, next) => {
  res.noFound();
});

// Exception interception
apiRouter.use((err, req, res, next) => {
  res.error(500, err.message);
});