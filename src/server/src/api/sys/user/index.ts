import Router from "koa-router";

import { SysUserService } from "@/service/sys/user";
import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysUserCreateSchema, SysUserDetailSchema, SysUserPageSchema, SysUserUpdateSchema } from "@/model";
import { sysUserRoleRouter } from "./role";

export const sysUserRouter = new Router({ prefix: "/user" });
sysUserRouter.use(sysUserRoleRouter.routes(), sysUserRoleRouter.allowedMethods());

export const sysUserService = new SysUserService()
sysUserRouter.post("/page", validate(SysUserPageSchema), sysUserService.page);
sysUserRouter.post("/list", sysUserService.list);
sysUserRouter.post("/create", validate(SysUserCreateSchema), sysUserService.create);
sysUserRouter.post("/update", validate(SysUserUpdateSchema), sysUserService.update);
sysUserRouter.post("/detail", validate(SysUserDetailSchema), sysUserService.detail);
sysUserRouter.post("/delete", validate(DeleteSchema), sysUserService.delete);
