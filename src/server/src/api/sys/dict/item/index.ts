import Router from "koa-router";

import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysDictItemCreateSchema, SysDictItemDetailSchema, SysDictItemPageSchema, SysDictItemUpdateSchema, } from "@/model";
import { SysDictItemService } from "@/service/sys/dict/item";

export const dictItemRouter = new Router({ prefix: "/item" });

export const sysDictItemService = new SysDictItemService()
dictItemRouter.post("/page", validate(SysDictItemPageSchema), sysDictItemService.page);
dictItemRouter.post("/list", sysDictItemService.list);
dictItemRouter.post("/create", validate(SysDictItemCreateSchema), sysDictItemService.create);
dictItemRouter.post("/update", validate(SysDictItemUpdateSchema), sysDictItemService.update);
dictItemRouter.post("/detail", validate(SysDictItemDetailSchema), sysDictItemService.detail);
dictItemRouter.post("/delete", validate(DeleteSchema), sysDictItemService.delete);