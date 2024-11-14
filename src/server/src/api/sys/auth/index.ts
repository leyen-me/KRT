// Authentication

import express from "express";
import { decrypt, encrypt } from "@/utils/pwUtils";

export const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  res.success("Hello, World!");
});


export type LoginVo = {
  username: string
  password: string
}
export type LoginVoKeys = keyof LoginVo

export type LoginResponseVo = {
  token: string
}

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body as LoginVo;

  //   res.success("Hello, World!");
  // 示例使用
  const detailUserId = "435432542";

  // 加密
  const { encryptedData, iv } = encrypt(
    detailUserId,
    import.meta.env.VITE_AUTH_SECURITY
  );

  // 解密
  // const decrypted = decrypt(encryptedData, process.env.AUTH_SECURITY, iv);

  // res.success({
  //   token: encryptedData,
  //   iv: iv,
  // });

  setTimeout(() => {
    res.success({
      token: encryptedData,
      iv: iv,
    });
  }, 3000)
});

authRouter.post("/logout", (req, res) => {
  res.success("Hello, World!");
});
