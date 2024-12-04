import Router from "koa-router";

import { validate } from "@/middlewares/validate";
import { DeleteSchema, SysTranslationCreateSchema, SysTranslationUpdateSchema, SysTranslationDetailSchema, SysTranslationPageSchema } from "@/model";
import { SysTranslationService } from "@/service/sys/translation";

export const translationRouter = new Router({ prefix: "/translation" });
export const sysTranslationService = new SysTranslationService()

translationRouter.post("/page", validate(SysTranslationPageSchema), sysTranslationService.page);
translationRouter.post("/list", sysTranslationService.list);
translationRouter.post("/create", validate(SysTranslationCreateSchema), sysTranslationService.create);
translationRouter.post("/update", validate(SysTranslationUpdateSchema), sysTranslationService.update);
translationRouter.post("/detail", validate(SysTranslationDetailSchema), sysTranslationService.detail);
translationRouter.post("/delete", validate(DeleteSchema), sysTranslationService.delete);
