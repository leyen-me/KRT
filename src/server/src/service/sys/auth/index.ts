import { Context } from "koa";
import { prisma } from "@/libs/prisma";

import { redisClient } from "@/libs/redis";
import { BaseService } from "@/service/BaseService";
import { I18nResult, IResult } from "@app/result";
import { decrypt, encrypt } from "@app/helper/password";
import { UserNoFoundError } from "@/error/sys/auth/UserNoFoundError";
import { PasswordNotIncorrectError } from "@/error/sys/auth/PasswordNotIncorrectError";
import { PasswordDecryptError } from "@/error/sys/auth/PasswordDecryptError";
import { SYS_USER_STATUS } from "@prisma/client";
import { UserDisabledError } from "@/error/sys/auth/UserDisabledError";
import { nanoid } from "nanoid";

// =========================================register=========================================

// =========================================register=========================================

// =========================================login=========================================
export type LoginVo = {
  email: string;
  password: string;
};
export type LoginVoKeys = keyof LoginVo;
export type LoginResponseVo = {
  token: string;
};
// =========================================login=========================================

// =========================================logout=========================================
export type LogoutResponseVo = {
  success: boolean;
};
// =========================================logout=========================================

export class SysAuthService extends BaseService {
  public constructor({ tableName }) {
    super({ tableName });
  }

  public async register(ctx: Context) {
    ctx.send(new I18nResult(200));
  }

  public async login(ctx: Context): Promise<IResult<LoginResponseVo>> {
    const { email, password } = ctx.request.body as LoginVo;
    // 1. Query user from database by email
    const sysUser = await prisma.sys_user.findFirst({
      where: {
        email,
      },
    });
    // 2. If user not found, return error message
    if (!sysUser) {
      throw new UserNoFoundError();
    }
    // 3. Compare passwords

    // todo: no need to encrypt password
    // const { data } = encrypt("123456", import.meta.env.VITE_AUTH_SECURITY);
    // console.log(data);
    let dbPassword = "";
    try {
      const { data } = decrypt(
        sysUser.password,
        import.meta.env.VITE_AUTH_SECURITY
      );
      dbPassword = data;
    } catch (error) {
      // password format error
      throw new PasswordDecryptError();
    }
    if (password !== dbPassword) {
      throw new PasswordNotIncorrectError();
    }
    // 4. Check if the user is disabled
    if (sysUser.status === SYS_USER_STATUS.DISABLED) {
      throw new UserDisabledError();
    }
    // 5. todo: Query user other related information, menu list, permission list, remove password information, and combine it into UserDetail
    const userDetail = {
      ...sysUser,
      password: undefined,
    };

    // 6. Issue a token to the user
    const token = nanoid(24);

    // 7. set token to redis, set token to database
    // 7.1 Store the token in redis and set the expiration time
    const expires = Number(import.meta.env.VITE_AUTH_EXPIRES);
    await redisClient.setSysUserToken(
      token,
      JSON.stringify(userDetail),
      expires
    );
    // 7.2 set token to database
    await prisma.sys_user_token.create({
      data: {
        token,
        user_id: sysUser.id,
        expires: new Date(Date.now() + expires * 1000),
      },
    });

    // 8. Return the token to the user
    const res = { token };
    return ctx.send(new I18nResult<LoginResponseVo>(200, res));
  }

  public async logout(ctx: Context) {
    // ctx.send(new Result(200));
  }
}
