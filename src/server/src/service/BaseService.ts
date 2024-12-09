import { prisma } from "@/libs/prisma";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class BaseService {
  private tableName: string = "";

  public constructor() {
    this.tableName = this.constructor.name.replace("Service", "");
    this.tableName =
      this.tableName.charAt(0).toLowerCase() + this.tableName.slice(1);
  }

  /**
   * create or update hook
   * @param body request body
   */
  public createOrUpdateHook = async (body: any): Promise<void> => {};

  public list = async (ctx: Context) => {
    const res = await prisma[this.tableName].findMany();
    return ctx.send(new I18nResult<any>(200, res));
  };

  public create = async (ctx: Context) => {
    const body = ctx.request.body as any;
    await this.createOrUpdateHook(body);
    const res = await prisma[this.tableName].create({
      data: body,
    });
    return ctx.send(new I18nResult<any>(200, { id: res.id }));
  };

  public update = async (ctx: Context) => {
    const body = ctx.request.body as any;
    await this.createOrUpdateHook(body);
    const res = await prisma[this.tableName].update({
      where: { id: body.id },
      data: body,
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
    await prisma[this.tableName].deleteMany({
      where: { id: { in: ids } },
    });
    return ctx.send(new I18nResult<any>(200));
  };
}
