import Router from "koa-router";

import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysDictCreateSchema, SysDictDetailSchema, SysDictPageSchema, SysDictUpdateSchema } from "@/model";
import { SysDictService } from "@/service/sys/dict";
import { dictItemRouter } from "./item";

export const sysDictRouter = new Router({ prefix: "/dict" });
sysDictRouter.use(dictItemRouter.routes(), dictItemRouter.allowedMethods());

export const sysDictService = new SysDictService()
sysDictRouter.post("/page", validate(SysDictPageSchema), sysDictService.page);
sysDictRouter.post("/list", sysDictService.list);
sysDictRouter.post("/all", sysDictService.all);
sysDictRouter.post("/create", validate(SysDictCreateSchema), sysDictService.create);
sysDictRouter.post("/update", validate(SysDictUpdateSchema), sysDictService.update);
sysDictRouter.post("/detail", validate(SysDictDetailSchema), sysDictService.detail);
sysDictRouter.post("/delete", validate(DeleteSchema), sysDictService.delete);