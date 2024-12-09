import { fetchRequest } from "@/utils/apiUtils";

import { IResult } from "@app/result";
import {
  LoginSchemaType,
  LoginResponseType,
  LoginWithGoogleResponseType,
  LoginWithGoogleSchemaType,
  LogoutResponseType,
} from "@app/server/src/model";
import {
  RegisterSchemaType,
  RegisterResponseType,
} from "@app/server/src/model";

export const fetchSysAuthUserInfo = async () => {
  return fetchRequest(`/sys/auth/user-info`);
};

export const fetchSysAuthMenuTree = async () => {
  return fetchRequest(`/sys/auth/menu-tree`);
};

export const fetchSysAuthLogin = async (
  body: LoginSchemaType
): Promise<IResult<LoginResponseType>> => {
  return fetchRequest(`/sys/auth/login`, {
    body,
  });
};

export const fetchSysAuthLogout = async (): Promise<
  IResult<LogoutResponseType>
> => {
  return fetchRequest(`/sys/auth/logout`);
};

export const fetchSysAuthLoginWithGoogle = async (
  body: LoginWithGoogleSchemaType
): Promise<IResult<LoginWithGoogleResponseType>> => {
  return fetchRequest(`/sys/auth/login-with-google`, {
    body,
  });
};

export const fetchSysAuthRegister = async (
  body: RegisterSchemaType
): Promise<IResult<RegisterResponseType>> => {
  return fetchRequest(`/sys/auth/register`, {
    body,
  });
};
