import { Context } from "koa";
import { prisma } from "@/libs/prisma";

import { redisClient } from "@/libs/redis";
import { BaseService } from "@/service/BaseService";
import { I18nResult, IResult } from "@app/result";
import { decrypt, encrypt } from "@app/helper/password";
import { UserNoFoundError } from "@/error/sys/auth/UserNoFoundError";
import { PasswordNotIncorrectError } from "@/error/sys/auth/PasswordNotIncorrectError";
import { PasswordDecryptError } from "@/error/sys/auth/PasswordDecryptError";
import { sys_user, SYS_USER_STATUS } from "@prisma/client";
import { UserDisabledError } from "@/error/sys/auth/UserDisabledError";
import { v4 as uuidv4 } from "uuid";
import {
  RegisterSchemaType,
  RegisterResponseType,
  LoginWithGoogleSchemaType,
  LoginWithGoogleResponseType,
} from "@app/model";
import { LoginSchemaType, LoginResponseType } from "@app/model";
import { UserAlreadyExistsError } from "@/error/sys/auth/UserAlreadyExistsError";
import { AUTHORIZATION_KEY } from "@/constants";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export class SysAuthService extends BaseService {
  public constructor({ tableName }) {
    super({ tableName });
  }

  private issueToken = async (sysUser: sys_user) => {
    // 1. todo: Query user other related information, menu list, permission list, remove password information, and combine it into UserDetail
    const userDetail = {
      ...sysUser,
      password: undefined,
    };

    // 2. Issue a token to the user
    const token = uuidv4();

    // 3. set token to redis, set token to database
    // 3.1 Store the token in redis and set the expiration time
    const expires = Number(import.meta.env.VITE_AUTH_EXPIRES);
    await redisClient.setSysUserToken(
      token,
      JSON.stringify(userDetail),
      expires
    );
    // 3.2 set token to database
    await prisma.sys_user_token.create({
      data: {
        token,
        user_id: sysUser.id,
        expires: new Date(Date.now() + expires * 1000),
      },
    });

    return { token };
  };

  public register = async (ctx: Context) => {
    const { email, password } = ctx.request.body as RegisterSchemaType;
    // 1. Check if the user already exists
    const sysUser = await prisma.sys_user.findFirst({
      where: {
        email,
      },
    });
    if (sysUser) {
      throw new UserAlreadyExistsError();
    }
    // 2. Create user
    await prisma.sys_user.create({
      data: {
        email,
        password: encrypt(password, import.meta.env.VITE_AUTH_SECURITY).data,
      },
    });
    // 3. Return success message
    return ctx.send(new I18nResult<RegisterResponseType>(200));
  };

  public login = async (ctx: Context): Promise<IResult<LoginResponseType>> => {
    const { email, password } = ctx.request.body as LoginSchemaType;
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

    // 5. Return the token to the user
    const res = await this.issueToken(sysUser);
    return ctx.send(new I18nResult<LoginResponseType>(200, res));
  };

  public loginWithGoogle = async (ctx: Context) => {
    // 1. Verify the token
    const { credential } = ctx.request.body as LoginWithGoogleSchemaType;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email = "", name = "", picture = "" } = payload as TokenPayload;

    // 2. Query user from database by email
    let sysUser = await prisma.sys_user.findFirst({
      where: {
        email,
      },
    });

    // 3. If user not found, auto register
    if (!sysUser) {
      sysUser = await prisma.sys_user.create({
        data: {
          email,
          // random password
          password: encrypt(uuidv4(), import.meta.env.VITE_AUTH_SECURITY).data,
        },
      });
    }

    // 4. Check if the user is disabled
    if (sysUser.status === SYS_USER_STATUS.DISABLED) {
      throw new UserDisabledError();
    }

    // 5. Return the token to the user
    const res = await this.issueToken(sysUser);
    return ctx.send(new I18nResult<LoginWithGoogleResponseType>(200, res));
  };

  public userInfo = async (ctx: Context) => {
    const token = ctx.get(AUTHORIZATION_KEY);
    const userDetailString = await redisClient.getSysUserToken(token);
    const userDetail = userDetailString ? JSON.parse(userDetailString) : null;
    return ctx.send(new I18nResult<LoginResponseType>(200, userDetail));
  };

  public logout = async (ctx: Context) => {
    // 1. Get token from header
    const token = ctx.get(AUTHORIZATION_KEY);
    // 2. Delete token from redis
    // await redisClient.deleteSysUserToken(token);

    // 3. Return success message
    return ctx.send(new I18nResult(200));
  };
}
