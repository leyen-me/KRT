import { prisma } from "@/libs/prisma";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";
import {
  SysDictItemPageSchemaType,
  SysDictItemPageResponseType,
  SysDictItemListResponseType,
  SysDictItemListSchemaType,
  SysDictItemCreateSchemaType,
  SysDictItemCreateResponseType,
} from "@/model";
import { DictItemValueAlreadyExistsError } from "@/error/sys/dict/item/DictItemValueAlreadyExistsError";

export class SysDictItemService extends BaseService {
  public page = async (ctx: Context) => {
    const { page, pageSize } = ctx.request.body as SysDictItemPageSchemaType;
    const where = {};
    const [result, total] = await Promise.all([
      prisma.sysDictItem.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.sysDictItem.count({
        where,
      }),
    ]);
    const res = {
      total,
      list: result,
    };
    return ctx.send(new I18nResult<SysDictItemPageResponseType>(200, res));
  };

  public list = async (ctx: Context) => {
    const { dictId } = ctx.request.body as SysDictItemListSchemaType;
    const result = await prisma.sysDictItem.findMany({
      where: { dictId },
      orderBy: {
        sort: "asc",
      },
    });
    return ctx.send(new I18nResult<SysDictItemListResponseType>(200, result));
  };

  public create = async (ctx: Context) => {
    const { ...data } = ctx.request.body as SysDictItemCreateSchemaType;
    const sysDictItem = await prisma.sysDictItem.findFirst({
      where: {
        value: data.value,
      },
    });
    if (sysDictItem) {
      throw new DictItemValueAlreadyExistsError();
    }
    const res = await prisma.sysDictItem.create({
      data,
    });
    return ctx.send(
      new I18nResult<SysDictItemCreateResponseType>(200, { id: res.id })
    );
  };
}
