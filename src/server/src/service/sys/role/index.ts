import { RoleCodeAlreadyExistsError } from "@/error/sys/role/RoleCodeAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import {
  SysRolePageSchemaType,
  SysRolePageResponseType,
  SysRoleUpdateResponseType,
  SysRoleUpdateSchemaType,
  SysRoleCreateResponseType,
  SysRoleCreateSchemaType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { I18nResult } from "@app/result";
import { Context } from "koa";

export class SysRoleService extends BaseService {

  public createOrUpdateHook = async (
    body: SysRoleCreateSchemaType & { id?: string }
  ) => {
    const where = {
      code: body.code,
      ...(body.id
        ? {
            id: {
              not: body.id,
            },
          }
        : {}),
    };
    const sysRole = await prisma.sysRole.findFirst({
      where,
    });
    if (sysRole) {
      throw new RoleCodeAlreadyExistsError();
    }
  };

  public page = async (ctx: Context) => {
    const { page, pageSize, name, code } = ctx.request.body as SysRolePageSchemaType;
    const where = {
      ...(name ? { name: { contains: name } } : {}),
      ...(code ? { code: { contains: code } } : {}),
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
}
