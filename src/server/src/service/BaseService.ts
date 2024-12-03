import { prisma } from "@/libs/prisma";
import { SysUserDetailResponseType } from "@/model";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class BaseService {
  public tableName: string = "";

  public constructor({ tableName }) {
    this.tableName = tableName;
  }

  public list = async (ctx: Context) => {
    const res = await prisma[this.tableName].findMany();
    return ctx.send(new I18nResult<any>(200, res));
  };

  public create = async (ctx: Context) => {
    const { ...data } = ctx.request.body as any;
    const res = await prisma[this.tableName].create({
      data,
    });
    return ctx.send(new I18nResult<any>(200, { id: res.id }));
  };

  public update = async (ctx: Context) => {
    const { id, ...data } = ctx.request.body as any;
    const res = await prisma[this.tableName].update({
      where: { id },
      data,
    });
    return ctx.send(new I18nResult<any>(200, { id: res.id }));
  };

  public detail = async (ctx: Context) => {
    const { id } = ctx.request.body as any;
    const res = await prisma[this.tableName].findUnique({
      where: {
        id,
      },
    });
    return ctx.send(new I18nResult<any>(200, res));
  };

  public delete = async (ctx: Context) => {
    const { ids } = ctx.request.body as any;
    await prisma.sysUser.deleteMany({
      where: { id: { in: ids } },
    });
    return ctx.send(new I18nResult<any>(200));
  };
}
