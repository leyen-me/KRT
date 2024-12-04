import { prisma } from "@/libs/prisma";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";
import {
  SysDictPageSchemaType,
  SysDictPageResponseType,
  SysDictCreateSchemaType,
  SysDictCreateResponseType,
  SysDictAllResponseType,
} from "@/model";
import { DictCodeAlreadyExistsError } from "@/error/sys/dict/DictCodeAlreadyExistsError";

export class SysDictService extends BaseService {
  public page = async (ctx: Context) => {
    const { page, pageSize } = ctx.request.body as SysDictPageSchemaType;
    const where = {};
    const [result, total] = await Promise.all([
      prisma.sysDict.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.sysDict.count({
        where,
      }),
    ]);
    const res = {
      total,
      list: result,
    };
    return ctx.send(new I18nResult<SysDictPageResponseType>(200, res));
  };

  public all = async (ctx: Context) => {
    const res = await prisma.sysDict.findMany({
      include: {
        items: true
      }
    });
    return ctx.send(new I18nResult<SysDictAllResponseType>(200, res));
  };

  public create = async (ctx: Context) => {
    const { ...data } = ctx.request.body as SysDictCreateSchemaType;
    const sysDict = await prisma.sysDict.findFirst({
      where: {
        code: data.code,
      },
    });
    if (sysDict) {
      throw new DictCodeAlreadyExistsError();
    }
    // code
    const res = await prisma.sysDict.create({
      data,
    });
    return ctx.send(
      new I18nResult<SysDictCreateResponseType>(200, { id: res.id })
    );
  };
}
