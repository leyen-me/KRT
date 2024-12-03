import Router from "koa-router";

import { SysUserService } from "@/service/sys/user";
import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysUserCreateSchema, SysUserDetailSchema, SysUserPageSchema, SysUserUpdateSchema } from "@/model";

export const userRouter = new Router({ prefix: "/user" });
export const sysUserService = new SysUserService({ tableName: "SysUser" })

userRouter.post("/page", validate(SysUserPageSchema), sysUserService.page);
userRouter.post("/create", validate(SysUserCreateSchema), sysUserService.create);
userRouter.post("/update", validate(SysUserUpdateSchema), sysUserService.update);
userRouter.post("/detail", validate(SysUserDetailSchema), sysUserService.detail);
userRouter.post("/delete", validate(DeleteSchema), sysUserService.delete);
