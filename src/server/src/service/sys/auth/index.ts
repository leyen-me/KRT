import { prisma } from "@/libs/prisma";
import { I18nResult, Result } from "@app/result";
import { Context } from "koa";

// register

// login
export type LoginVo = {
  email: string;
  password: string;
};
export type LoginVoKeys = keyof LoginVo;

export type LoginResponseVo = {
  token: string;
};

// logout

export type LogoutResponseVo = {
  success: boolean;
};

export const sysAuthService = {
  register: async (ctx: Context) => {
    ctx.send(new Result(200));
  },
  login: async (ctx: Context) => {
    const res = {
      token: "1234",
    };
    return ctx.send(new I18nResult(200, res));

    const loginVo = ctx.request.body as LoginVo;
    // 1. Query user from database by email
    const sysUser = await prisma.sys_user.findFirst({
      where: {
        email: loginVo.email,
      },
    });
    // 2. If user not found, return error message
    if (!sysUser) {
      throw new Error("User not found");
    }

    // 3. 校验密码

    // 3. 生成token

    //   const detailUserId = "435432542";

    //   // 加密
    //   const { encryptedData, iv } = encrypt(
    //     detailUserId,
    //     import.meta.env.VITE_AUTH_SECURITY
    //   );

    //   // 解密
    //   // const decrypted = decrypt(encryptedData, process.env.AUTH_SECURITY, iv);

    //   // res.success({
    //   //   token: encryptedData,
    //   //   iv: iv,
    //   // });
  },
  logout: async (ctx: Context) => {
    // 1. 删除token
  },
};
