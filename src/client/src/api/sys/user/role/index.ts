import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  DeleteSchemaType,
  DeleteResponseType,
  SysUserRoleUpdateResponseType,
  SysUserRolePageResponseType,
  SysUserRolePageSchemaType,
  SysUserRoleListResponseType,
  SysUserRoleCreateResponseType,
  SysUserRoleCreateSchemaType,
  SysUserRoleUpdateSchemaType,
  SysUserRoleDetailResponseType,
} from "@app/server/src/model";

export const fetchSysUserRolePage = async (
  body: SysUserRolePageSchemaType
): Promise<IResult<SysUserRolePageResponseType>> => {
  return fetchRequest(`/sys/user/role/page`, { body });
};

export const fetchSysUserRoleList = async (): Promise<
  IResult<SysUserRoleListResponseType>
> => {
  return fetchRequest(`/sys/user/role/list`);
};

export const fetchSysUserRoleCreate = async (
  body: SysUserRoleCreateSchemaType
): Promise<IResult<SysUserRoleCreateResponseType>> => {
  return fetchRequest(`/sys/user/role/create`, { body });
};

export const fetchSysUserRoleUpdate = async (
  body: SysUserRoleUpdateSchemaType
): Promise<IResult<SysUserRoleUpdateResponseType>> => {
  return fetchRequest(`/sys/user/role/update`, { body });
};

export const fetchSysUserRoleDetail = async (
  id: string
): Promise<IResult<SysUserRoleDetailResponseType>> => {
  return fetchRequest(`/sys/user/role/detail`, { body: { id } });
};

export const fetchSysUserRoleDelete = async (
  body: DeleteSchemaType
): Promise<IResult<DeleteResponseType>> => {
  return fetchRequest(`/sys/user/role/delete`, { body });
};
