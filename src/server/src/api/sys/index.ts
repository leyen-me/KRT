import express from "express";
import { userRouter } from "./user";

export const sysRouter = express.Router();

sysRouter.use("/user", userRouter);
