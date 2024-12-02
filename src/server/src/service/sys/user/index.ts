import { UserAlreadyExistsError } from "@/error/sys/auth/UserAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import {
  SysUserPageSchemaType,
  SysUserPageResponseType,
  SysUserCreateSchemaType,
  SysUserCreateResponseType,
  SysUserDetailResponseType,
  SysUserUpdateSchemaType,
  SysUserUpdateResponseType,
} from "@/model";
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
        roleIds: [],
      })),
    };

    return ctx.send(new I18nResult<SysUserPageResponseType>(200, res));
  };

  public create = async (ctx: Context) => {
    const { roleIds, ...model } = ctx.request.body as SysUserCreateSchemaType;
    // 1. Check if the user already exists
    const sysUser = await prisma.sysUser.findFirst({
      where: {
        email: model.email,
      },
    });
    if (sysUser) {
      throw new UserAlreadyExistsError();
    }
    // 2. Create user
    const res = await prisma.sysUser.create({
      data: model,
    });

    // 3. Return success message
    return ctx.send(
      new I18nResult<SysUserCreateResponseType>(200, { id: res.id })
    );
  };

  public update = async (ctx: Context) => {
    const { roleIds, ...model } = ctx.request.body as SysUserUpdateSchemaType;
    const res = await prisma.sysUser.update({
      where: {
        id: model.id,
      },
      data: model,
    });
    return ctx.send(
      new I18nResult<SysUserUpdateResponseType>(200, { id: res.id })
    );
  };

  public detail = async (ctx: Context) => {
    const { id } = ctx.request.body as { id: string };
    const res = await prisma.sysUser.findUnique({
      where: {
        id,
      },
    });
    // todo: query roleIds
    const result = res
      ? { ...res, roleIds: [], password: undefined }
      : undefined;
    return ctx.send(new I18nResult<SysUserDetailResponseType>(200, result));
  };
}
