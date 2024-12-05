import { UserAlreadyExistsError } from "@/error/sys/auth/UserAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import {
  SysUserRolePageSchemaType,
  SysUserRolePageResponseType,
  SysUserRoleDetailResponseType,
  SysUserRoleCreateSchemaType,
  SysUserRoleCreateResponseType,
  SysUserRoleUpdateSchemaType,
  SysUserRoleUpdateResponseType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysUserRoleService extends BaseService {
  public page = async (ctx: Context) => {
    const { page, pageSize, roleId, email } = ctx.request
      .body as SysUserRolePageSchemaType;
    const where = {
      ...(roleId ? { roleId } : {}),
      ...(email ? { user: { email: { contains: email } } } : {}),
    };
    const [result, total] = await Promise.all([
      prisma.sysUserRole.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          user: {
            select: {
              email: true,
              nickname: true,
            },
          },
        },
      }),
      prisma.sysUserRole.count({
        where,
      }),
    ]);

    const res = {
      total,
      list: result as SysUserRoleDetailResponseType[],
    };
    return ctx.send(new I18nResult<SysUserRolePageResponseType>(200, res));
  };

  public create = async (ctx: Context) => {
    const { ...data } = ctx.request.body as SysUserRoleCreateSchemaType;
    const sysUser = await prisma.sysUserRole.findFirst({
      where: {
        userId: data.userId,
      },
    });
    if (sysUser) {
      throw new UserAlreadyExistsError();
    }
    const res = await prisma.sysUserRole.create({
      data,
    });
    return ctx.send(new I18nResult<SysUserRoleCreateResponseType>(200, res));
  };

  public update = async (ctx: Context) => {
    const { ...data } = ctx.request.body as SysUserRoleUpdateSchemaType;
    const sysUser = await prisma.sysUserRole.findFirst({
      where: {
        userId: data.userId,
      },
    });
    if (sysUser) {
      throw new UserAlreadyExistsError();
    }
    const res = await prisma.sysUserRole.update({
      where: {
        id: data.id,
      },
      data,
    });
    return ctx.send(new I18nResult<SysUserRoleUpdateResponseType>(200, res));
  };
}
