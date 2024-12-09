import { UserAlreadyExistsError } from "@/error/sys/auth/UserAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import {
  SysUserRolePageSchemaType,
  SysUserRolePageResponseType,
  SysUserRoleDetailResponseType,
  SysUserRoleCreateSchemaType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysUserRoleService extends BaseService {

  public createOrUpdateHook = async (
    body: SysUserRoleCreateSchemaType & { id?: string }
  ) => {
    const where = {
      roleId: body.roleId,
      userId: body.userId,
      ...(body.id
        ? {
            id: {
              not: body.id,
            },
          }
        : {}),
    };
    const sysUserRole = await prisma.sysUserRole.findFirst({
      where,
    });
    if (sysUserRole) {
      throw new UserAlreadyExistsError();
    }
  };
  
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
}
