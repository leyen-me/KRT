import { RoleCodeAlreadyExistsError } from "@/error/sys/role/RoleCodeAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import { SysRolePageSchemaType, SysRolePageResponseType, SysRoleUpdateResponseType, SysRoleUpdateSchemaType, SysRoleCreateResponseType, SysRoleCreateSchemaType } from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysRoleService extends BaseService {
  public page = async (ctx: Context) => {
    const { page, pageSize, name } = ctx.request.body as SysRolePageSchemaType;
    const where = {
      ...(name ? { name: { contains: name } } : {}),
    };
    const [result, total] = await Promise.all([
      prisma.sysRole.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.sysRole.count({
        where,
      }),
    ]);
    const res = {
      total,
      list: result,
    };
    return ctx.send(new I18nResult<SysRolePageResponseType>(200, res));
  };


  public create = async (ctx: Context) => {
    const { ...data } = ctx.request.body as SysRoleCreateSchemaType;
    const sysUser = await prisma.sysRole.findFirst({
      where: {
        code: data.code,
      },
    });
    if (sysUser) {
      throw new RoleCodeAlreadyExistsError();
    }
    const res = await prisma.sysRole.create({
      data,
    });
    return ctx.send(new I18nResult<SysRoleCreateResponseType>(200, res));
  };

  public update = async (ctx: Context) => {
    const { ...data } = ctx.request.body as SysRoleUpdateSchemaType;
    const sysRole = await prisma.sysRole.findFirst({
      where: {
        code: data.code,
      },
    });
    if (sysRole) {
      throw new RoleCodeAlreadyExistsError();
    }
    const res = await prisma.sysRole.update({
      where: {
        id: data.id,
      },
      data,
    });
    return ctx.send(new I18nResult<SysRoleUpdateResponseType>(200, res));
  };
}
