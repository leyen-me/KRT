import Router from "koa-router";

import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysTranslationCreateSchema, SysTranslationUpdateSchema, SysTranslationDetailSchema, SysTranslationPageSchema } from "@/model";
import { SysTranslationService } from "@/service/sys/translation";

export const sysTranslationRouter = new Router({ prefix: "/translation" });
export const sysTranslationService = new SysTranslationService()

sysTranslationRouter.post("/page", validate(SysTranslationPageSchema), sysTranslationService.page);
sysTranslationRouter.post("/list", sysTranslationService.list);
sysTranslationRouter.post("/all", sysTranslationService.all);
sysTranslationRouter.post("/create", validate(SysTranslationCreateSchema), sysTranslationService.create);
sysTranslationRouter.post("/update", validate(SysTranslationUpdateSchema), sysTranslationService.update);
sysTranslationRouter.post("/detail", validate(SysTranslationDetailSchema), sysTranslationService.detail);
sysTranslationRouter.post("/delete", validate(DeleteSchema), sysTranslationService.delete);
