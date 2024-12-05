import Router from "koa-router";

import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysRoleCreateSchema, SysRoleDetailSchema, SysRolePageSchema, SysRoleUpdateSchema } from "@/model";
import { SysRoleService } from "@/service/sys/role";

export const sysRoleRouter = new Router({ prefix: "/role" });
export const sysRoleService = new SysRoleService()

sysRoleRouter.post("/page", validate(SysRolePageSchema), sysRoleService.page);
sysRoleRouter.post("/list", sysRoleService.list);
sysRoleRouter.post("/create", validate(SysRoleCreateSchema), sysRoleService.create);
sysRoleRouter.post("/update", validate(SysRoleUpdateSchema), sysRoleService.update);
sysRoleRouter.post("/detail", validate(SysRoleDetailSchema), sysRoleService.detail);
sysRoleRouter.post("/delete", validate(DeleteSchema), sysRoleService.delete);
