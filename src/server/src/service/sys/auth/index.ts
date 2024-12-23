import { Context } from "koa";
import { prisma } from "@/libs/prisma";

import { redisClient } from "@/libs/redis";
import { I18nResult, IResult } from "@app/result";
import { decrypt, encrypt } from "@app/helper/password";
import { UserNoFoundError } from "@/error/sys/auth/UserNoFoundError";
import { PasswordNotIncorrectError } from "@/error/sys/auth/PasswordNotIncorrectError";
import { PasswordDecryptError } from "@/error/sys/auth/PasswordDecryptError";
import { SysUser, SYS_USER_STATUS, Prisma } from "@prisma/client";
import { UserDisabledError } from "@/error/sys/auth/UserDisabledError";
import { v4 as uuidv4 } from "uuid";
import {
  RegisterSchemaType,
  RegisterResponseType,
  LoginWithGoogleSchemaType,
  LoginWithGoogleResponseType,
  SysUserDetailResponseType,
  LogoutResponseType,
} from "@/model";
import { LoginSchemaType, LoginResponseType } from "@/model";
import { UserAlreadyExistsError } from "@/error/sys/auth/UserAlreadyExistsError";
import { AUTHORIZATION_KEY } from "@/constants";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export class SysAuthService {
  private issueToken = async (sysUser: SysUser) => {
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
    await prisma.sysUserToken.create({
      data: {
        token,
        userId: sysUser.id,
        expires: new Date(Date.now() + expires * 1000),
      },
    });

    return { token };
  };

  public getUserDetail = async ({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }) => {
    let where: Prisma.SysUserWhereInput = {};
    if (email) {
      where.email = email;
    }
    if (userId) {
      where.id = userId;
    }
    let sysUser = await prisma.sysUser.findFirst({
      where,
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    return sysUser;
  };

  public register = async (ctx: Context) => {
    const { email, password } = ctx.request.body as RegisterSchemaType;
    // 1. Check if the user already exists
    const sysUser = await prisma.sysUser.findFirst({
      where: {
        email,
      },
    });
    if (sysUser) {
      throw new UserAlreadyExistsError();
    }
    // 2. Create user
    await prisma.sysUser.create({
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
    const sysUser = await this.getUserDetail({ email });
    // 2. If user not found, return error message
    if (!sysUser) {
      throw new UserNoFoundError();
    }
    // 3. Compare passwords
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
    let sysUser = await this.getUserDetail({ email });

    // 3. If user not found, auto register
    if (!sysUser) {
      const sysCreateUser = await prisma.sysUser.create({
        data: {
          email,
          // random password
          password: encrypt(uuidv4(), import.meta.env.VITE_AUTH_SECURITY).data,
        },
      });

      sysUser = {
        ...sysCreateUser,
        roles: [],
      };
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
    return ctx.send(
      new I18nResult<SysUserDetailResponseType>(200, ctx.state.user)
    );
  };

  public logout = async (ctx: Context) => {
    // 1. Get token from header
    const token = ctx.get(AUTHORIZATION_KEY);
    // 2. Delete token from redis
    await redisClient.removeSysUserToken(token);
    // 3. Delete token from database
    await prisma.sysUserToken.deleteMany({
      where: {
        token,
      },
    });
    // 4. Return success message
    return ctx.send(new I18nResult<LogoutResponseType>(200));
  };
}
