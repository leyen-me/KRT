// Authentication

import express from "express";
import { decrypt, encrypt } from "@/utils/pwUtils";

export const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  res.success("Hello, World!");
});

authRouter.get("/login", (req, res) => {
  const { username, password } = req.body;

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

  res.success({
    token: encryptedData,
    iv: iv,
  });
});

authRouter.post("/logout", (req, res) => {
  res.success("Hello, World!");
});
