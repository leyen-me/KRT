import { prisma } from "@/libs/prisma";
import {
  SysTranslationPageSchemaType,
  SysTranslationPageResponseType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysTranslationService extends BaseService {
  public page = async (ctx: Context) => {
    const { page, pageSize, key } = ctx.request
      .body as SysTranslationPageSchemaType;
    const where = {
      ...(key ? { key: { contains: key } } : {}),
    };
    const [result, total] = await Promise.all([
      prisma.sysTranslation.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.sysTranslation.count({
        where,
      }),
    ]);
    const res = {
      total,
      list: result,
    };
    return ctx.send(new I18nResult<SysTranslationPageResponseType>(200, res));
  };
}
