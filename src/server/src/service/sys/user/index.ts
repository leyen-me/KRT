import { prisma } from "@/libs/prisma";
import {
  SysUserPageSchemaType,
  SysUser,
  SysUserPageResponseType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysUserService extends BaseService {
  public page = async (ctx: Context) => {
    const {
      page = 1,
      pageSize = 10,
      email,
    } = ctx.query as unknown as SysUserPageSchemaType;

    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const result = await prisma.sysUser.findMany({
      where: {
        ...(email ? { email: { contains: email } } : {}),
      },
      skip: (pageNumber - 1) * pageSizeNumber,
      take: pageSizeNumber,
    });

    const res = {
      total: result.length,
      list: result.map((item) => ({
        ...item,
        password: undefined,
      })),
    };
    return ctx.send(new I18nResult<SysUserPageResponseType>(200, res));
  };
}
