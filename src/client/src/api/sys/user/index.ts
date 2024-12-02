import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  SysUserCreateResponseType,
  SysUserCreateSchemaType,
  SysUserDetailResponseType,
  SysUserPageResponseType,
  SysUserPageSchemaType,
  SysUserUpdateResponseType,
  SysUserUpdateSchemaType,
} from "@app/server/src/model";

export const fetchSysUserPage = async (
  body: SysUserPageSchemaType
): Promise<IResult<SysUserPageResponseType>> => {
  return fetchRequest(`/sys/user/page`, { body });
};

export const fetchSysUserCreate = async (
  body: SysUserCreateSchemaType
): Promise<IResult<SysUserCreateResponseType>> => {
  return fetchRequest(`/sys/user/create`, { body });
};

export const fetchSysUserUpdate = async (
  body: SysUserUpdateSchemaType
): Promise<IResult<SysUserUpdateResponseType>> => {
  return fetchRequest(`/sys/user/update`, { body });
};

export const fetchSysUserDetail = async (
  id: string
): Promise<IResult<SysUserDetailResponseType>> => {
  return fetchRequest(`/sys/user/detail`, { body: { id } });
};
