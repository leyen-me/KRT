import Router from "koa-router";

import { SysUserRoleService } from "@/service/sys/user/role";
import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysUserRoleCreateSchema, SysUserRoleDetailSchema, SysUserRolePageSchema, SysUserRoleUpdateSchema } from "@/model";

export const sysUserRoleRouter = new Router({ prefix: "/role" });
export const sysUserRoleService = new SysUserRoleService()

sysUserRoleRouter.post("/page", validate(SysUserRolePageSchema), sysUserRoleService.page);
sysUserRoleRouter.post("/list", sysUserRoleService.list);
sysUserRoleRouter.post("/create", validate(SysUserRoleCreateSchema), sysUserRoleService.create);
sysUserRoleRouter.post("/update", validate(SysUserRoleUpdateSchema), sysUserRoleService.update);
sysUserRoleRouter.post("/detail", validate(SysUserRoleDetailSchema), sysUserRoleService.detail);
sysUserRoleRouter.post("/delete", validate(DeleteSchema), sysUserRoleService.delete);
