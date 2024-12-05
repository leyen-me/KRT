import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  DeleteSchemaType,
  DeleteResponseType,
  SysRoleCreateResponseType,
  SysRoleCreateSchemaType,
  SysRoleListResponseType,
  SysRolePageSchemaType,
  SysRolePageResponseType,
  SysRoleUpdateSchemaType,
  SysRoleUpdateResponseType,
  SysRoleDetailResponseType,
} from "@app/server/src/model";

export const fetchSysRolePage = async (
  body: SysRolePageSchemaType
): Promise<IResult<SysRolePageResponseType>> => {
  return fetchRequest(`/sys/role/page`, { body });
};

export const fetchSysRoleList = async (): Promise<
  IResult<SysRoleListResponseType>
> => {
  return fetchRequest(`/sys/role/list`);
};

export const fetchSysRoleCreate = async (
  body: SysRoleCreateSchemaType
): Promise<IResult<SysRoleCreateResponseType>> => {
  return fetchRequest(`/sys/role/create`, { body });
};

export const fetchSysRoleUpdate = async (
  body: SysRoleUpdateSchemaType
): Promise<IResult<SysRoleUpdateResponseType>> => {
  return fetchRequest(`/sys/role/update`, { body });
};

export const fetchSysRoleDetail = async (
  id: string
): Promise<IResult<SysRoleDetailResponseType>> => {
  return fetchRequest(`/sys/role/detail`, { body: { id } });
};

export const fetchSysRoleDelete = async (
  body: DeleteSchemaType
): Promise<IResult<DeleteResponseType>> => {
  return fetchRequest(`/sys/role/delete`, { body });
};
