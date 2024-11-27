import Router from "koa-router";

import { SysUserService } from "@/service/sys/user";

export const userRouter = new Router({ prefix: "/user" });
export const sysUserService = new SysUserService({ tableName: "SysUser" })

userRouter.get("/page", sysUserService.page);