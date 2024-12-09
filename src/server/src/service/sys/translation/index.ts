import { TranslationTypeAlreadyExistsError } from "@/error/sys/translation/TranslationTypeAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import {
  SysTranslationPageSchemaType,
  SysTranslationPageResponseType,
  SysTranslationAllResponseType,
  SysTranslationCreateSchemaType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { LOCALS } from "@app/i18n/locals";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysTranslationService extends BaseService {
  
  public createOrUpdateHook = async (
    body: SysTranslationCreateSchemaType & { id?: string }
  ) => {
    const where = {
      key: body.key,
      type: body.type,
      ...(body.id
        ? {
            id: {
              not: body.id,
            },
          }
        : {}),
    };
    const sysTranslation = await prisma.sysTranslation.findFirst({
      where,
    });
    if (sysTranslation) {
      throw new TranslationTypeAlreadyExistsError();
    }
  };

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

  public all = async (ctx: Context) => {
    const result = await prisma.sysTranslation.findMany();
    const translations: Record<string, any> = {};
    result.forEach((item) => {
      if (!translations[item.key]) {
        translations[item.key] = {
          ...LOCALS.reduce(
            (acc, local) => ({
              ...acc,
              [local.name]: "",
            }),
            {}
          ),
        };
      }

      translations[item.key][item.type] = item.value;
    });
    const translationArray = Object.entries(translations).map(
      ([key, value]) => ({
        key,
        ...value,
      })
    );
    return ctx.send(
      new I18nResult<SysTranslationAllResponseType>(200, translationArray)
    );
  };
}
