import { prisma } from "@/libs/prisma";
import { SysUserPageSchemaType, SysUserPageResponseType } from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysUserService extends BaseService {
  // Mask mobile number by replacing middle digits with asterisks
  private maskMobileNumber(mobile: string | null): string | null {
    if (!mobile) return null;
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }

  public page = async (ctx: Context) => {
    const {
      page = 1,
      pageSize = 10,
      email,
      status,
    } = ctx.request.body as SysUserPageSchemaType;
    
    const where = {
      ...(email ? { email: { contains: email } } : {}),
      ...(status ? { status: { in: status } } : {}),
    };
    const [result, total] = await Promise.all([
      prisma.sysUser.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.sysUser.count({
        where,
      }),
    ]);
    const res = {
      total,
      list: result.map((item) => ({
        ...item,
        password: undefined,
        mobile: this.maskMobileNumber(item.mobile),
      })),
    };
    return ctx.send(new I18nResult<SysUserPageResponseType>(200, res));
  };
}
