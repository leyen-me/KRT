import Router from "koa-router";

import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysDictCreateSchema, SysDictDetailSchema, SysDictPageSchema, SysDictUpdateSchema } from "@/model";
import { SysDictService } from "@/service/sys/dict";
import { dictItemRouter } from "./item";

export const dictRouter = new Router({ prefix: "/dict" });
dictRouter.use(dictItemRouter.routes(), dictItemRouter.allowedMethods());

export const sysDictService = new SysDictService()
dictRouter.post("/page", validate(SysDictPageSchema), sysDictService.page);
dictRouter.post("/list", sysDictService.list);
dictRouter.post("/all", sysDictService.all);
dictRouter.post("/create", validate(SysDictCreateSchema), sysDictService.create);
dictRouter.post("/update", validate(SysDictUpdateSchema), sysDictService.update);
dictRouter.post("/detail", validate(SysDictDetailSchema), sysDictService.detail);
dictRouter.post("/delete", validate(DeleteSchema), sysDictService.delete);