import Router from "koa-router";

import { SysUserService } from "@/service/sys/user";
import { validate } from "@/middlewares/validate";
import { SysUserPageSchema } from "@/model";

export const userRouter = new Router({ prefix: "/user" });
export const sysUserService = new SysUserService({ tableName: "SysUser" })

userRouter.get("/page", validate(SysUserPageSchema), sysUserService.page);