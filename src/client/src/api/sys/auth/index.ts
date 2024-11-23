import { fetchRequest } from "@/utils/apiUtils";

import { IResult } from "@app/result";
import {
  LoginSchemaType,
  LoginResponseType,
  LoginWithGoogleResponseType,
  LoginWithGoogleSchemaType,
} from "@app/model";
import { RegisterSchemaType, RegisterResponseType } from "@app/model";

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
    method: "POST",
    body,
  });
};

export const fetchSysAuthLoginWithGoogle = async (
  body: LoginWithGoogleSchemaType
): Promise<IResult<LoginWithGoogleResponseType>> => {
  return fetchRequest(`/sys/auth/login-with-google`, {
    method: "POST",
    body,
  });
};

export const fetchSysAuthRegister = async (
  body: RegisterSchemaType
): Promise<IResult<RegisterResponseType>> => {
  return fetchRequest(`/sys/auth/register`, {
    method: "POST",
    body,
  });
};
