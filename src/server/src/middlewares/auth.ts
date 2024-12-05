import { AUTH_WHITE_LIST, AUTHORIZATION_KEY } from "@/constants";
import { redisClient } from "@/libs/redis";
import { SYS_USER_STATUS, SysUserDetailResponseType } from "@/model";
import { Context, Next } from "koa";
import { isPathInWhiteList } from "@app/helper/path";
import { UserAuthenticationError } from "@/error/sys/auth/UserAuthenticationError";

export const authMiddleware = async (ctx: Context, next: Next) => {
  if (isPathInWhiteList(ctx.path, AUTH_WHITE_LIST)) {
    return await next();
  }
  const token = ctx.get(AUTHORIZATION_KEY);
  try {
    if (!token) {
      throw new Error("Unauthorized, please login first");
    }
    if (typeof token === "string") {
      // 获取用户信息
      const userDetailString = await redisClient.getSysUserToken(token);
      // 解析用户信息
      const userDetail: SysUserDetailResponseType = userDetailString
        ? JSON.parse(userDetailString)
        : null;
      if (!userDetail) {
        throw new Error("Token has expired");
      }
      if (userDetail.status === SYS_USER_STATUS.DISABLED) {
        throw new Error("User has been disabled");
      }
      ctx.state.user = userDetail;
      await next();
    } else {
      throw new Error("Invalid token format");
    }
  } catch (error) {
    throw new UserAuthenticationError();
  }
};
