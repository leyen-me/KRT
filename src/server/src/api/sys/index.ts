import express from "express";
import { userRouter } from "./user";
import { authRouter } from "./auth";

export const sysRouter = express.Router();

sysRouter.use("/auth", authRouter);
sysRouter.use("/user", userRouter);
