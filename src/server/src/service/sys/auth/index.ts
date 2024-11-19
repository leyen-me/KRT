import { Context } from "koa";
import { prisma } from "@/libs/prisma";

import { BaseService } from "@/service/BaseService";
import { I18nResult, IResult } from "@app/result";
import { decrypt, encrypt } from "@app/helper/password";
import { UserNoFoundError } from "@/error/sys/auth/UserNoFoundError";
import { PasswordNotIncorrectError } from "@/error/sys/auth/PasswordNotIncorrectError";
import { PasswordDecryptError } from "@/error/sys/auth/PasswordDecryptError";

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
    super({ tableName })
  }

  public async register(ctx: Context) {
    ctx.send(new I18nResult(200));
  }

  public async login(ctx: Context): Promise<IResult<LoginResponseVo>> {
    const { email, password } = ctx.request.body as LoginVo
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
    // const { data } = encrypt("123456", import.meta.env.VITE_AUTH_SECURITY)
    let dbPassword = ""
    try {
      const { data } = decrypt(sysUser.password, import.meta.env.VITE_AUTH_SECURITY)
      dbPassword = data
    } catch (error) {
      // 密码解析异常
      throw new PasswordDecryptError()
    }
    if (password !== dbPassword) {
      throw new PasswordNotIncorrectError()
    }
    // 判断用户是否被禁用

    // 查询用户其他相关信息，菜单列表，权限列表，去除密码信息，组合成UserDetail

    // 为用户颁发token，

    // 将token存储到redis，并设置过期时间

    // 返回token给用户
    const res = { token: '123' }
    return ctx.send(new I18nResult<LoginResponseVo>(200, res))
  }


  public async logout(ctx: Context) {
    // ctx.send(new Result(200));
  }
}
