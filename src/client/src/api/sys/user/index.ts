import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  DeleteResponseType,
  DeleteSchemaType,
  SysUserCreateResponseType,
  SysUserCreateSchemaType,
  SysUserDetailResponseType,
  SysUserListResponseType,
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

export const fetchSysUserList = async (): Promise<
  IResult<SysUserListResponseType>
> => {
  return fetchRequest(`/sys/user/list`);
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

export const fetchSysUserDelete = async (
  body: DeleteSchemaType
): Promise<IResult<DeleteResponseType>> => {
  return fetchRequest(`/sys/user/delete`, { body });
};
