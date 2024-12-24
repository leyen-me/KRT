import { UserAlreadyExistsError } from "@/error/sys/auth/UserAlreadyExistsError";
import { prisma } from "@/libs/prisma";
import { redisClient } from "@/libs/redis";
import {
  SysUserPageSchemaType,
  SysUserPageResponseType,
  SysUserCreateSchemaType,
  SysUserCreateResponseType,
  SysUserDetailResponseType,
  SysUserUpdateSchemaType,
  SysUserUpdateResponseType,
  SysRoleOptionSchemaType,
} from "@/model";
import { BaseService } from "@/service/BaseService";
import { encrypt } from "@app/helper/password";
import { I18nResult } from "@app/result";
import { Context } from "koa";
import { SysAuthService } from "../auth";
import { SysUserRoleService } from "./role";
import { randomUUID } from "crypto";

export class SysUserService extends BaseService {
  private sysUserRoleService = new SysUserRoleService();

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
      gender,
    } = ctx.request.body as SysUserPageSchemaType;

    const where = {
      ...(email ? { email: { contains: email } } : {}),
      ...(status ? { status: { in: status } } : {}),
      ...(gender ? { gender: { in: gender } } : {}),
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
        roleList: [],
      })),
    };

    return ctx.send(new I18nResult<SysUserPageResponseType>(200, res));
  };

  public create = async (ctx: Context) => {
    const { roleList, password, ...data } = ctx.request
      .body as SysUserCreateSchemaType;
    // 1. Check if the user already exists
    const sysUser = await prisma.sysUser.findFirst({
      where: {
        email: data.email,
      },
    });
    if (sysUser) {
      throw new UserAlreadyExistsError();
    }
    // 2. Create user
    const res = await prisma.$transaction(async (tx) => {
      // Generate a shorter and friendlier default nickname
      const defaultNickname = `用户${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`;

      const sysUser = await prisma.sysUser.create({
        data: {
          ...data,
          nickname: data.nickname || defaultNickname,
          password: encrypt(password, import.meta.env.VITE_AUTH_SECURITY).data,
        },
      });
      // Update user roles
      await this.sysUserRoleService.createOrUpdate({
        tx,
        userId: sysUser.id,
        roleList,
      });
      return sysUser;
    });

    // 3. Create user roles
    await this.sysUserRoleService.createOrUpdate({
      userId: res.id,
      roleList,
    });

    // 3. Return success message
    return ctx.send(
      new I18nResult<SysUserCreateResponseType>(200, { id: res.id })
    );
  };

  public update = async (ctx: Context) => {
    const { id, roleList, ...data } = ctx.request
      .body as SysUserUpdateSchemaType;

    const res = await prisma.$transaction(async (tx) => {
      const sysUser = await tx.sysUser.update({
        where: {
          id,
        },
        data,
      });
      // Update user roles
      await this.sysUserRoleService.createOrUpdate({
        tx,
        userId: sysUser.id,
        roleList,
      });
      return sysUser;
    });

    // update user from redis
    const tokens = await prisma.sysUserToken.findMany({
      where: {
        userId: id,
        expires: {
          gt: new Date(),
        },
      },
    });
    const sysAuthService = new SysAuthService();
    const userDetail = await sysAuthService.getUserDetail({
      userId: id,
    });
    for (const token of tokens) {
      const expires = Math.floor((token.expires.getTime() - Date.now()) / 1000);
      await redisClient.updateSysUserToken(
        token.token,
        JSON.stringify(userDetail),
        expires
      );
    }

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
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    const roleList = res?.roles.map((role) => ({
      label: role.role.name,
      value: role.role.id,
    })) as SysRoleOptionSchemaType[];
    const result = res ? { ...res, password: undefined, roleList } : undefined;
    return ctx.send(new I18nResult<SysUserDetailResponseType>(200, result));
  };

  public delete = async (ctx: Context) => {
    const { ids } = ctx.request.body as any;
    await prisma.$transaction(async (tx) => {
      // 1. Delete user roles for all users
      await tx.sysUserRole.deleteMany({
        where: {
          userId: {
            in: ids,
          },
        },
      });
      // 2. Delete users
      await tx.sysUser.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    });
    return ctx.send(new I18nResult<any>(200));
  };
}
