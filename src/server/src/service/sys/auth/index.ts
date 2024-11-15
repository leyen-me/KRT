import { LoginVo } from "@/api/sys/auth";
import { prisma } from "@/libs/prisma";

export const sysAuthService = {
  login: async (loginVo: LoginVo) => {
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
};
