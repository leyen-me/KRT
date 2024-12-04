import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  DeleteSchemaType,
  DeleteResponseType,
  SysDictPageSchemaType,
  SysDictPageResponseType,
  SysDictCreateSchemaType,
  SysDictUpdateResponseType,
  SysDictDetailResponseType,
  SysDictCreateResponseType,
  SysDictListResponseType,
  SysDictUpdateSchemaType,
} from "@app/server/src/model";

export const fetchSysDictPage = async (
  body: SysDictPageSchemaType
): Promise<IResult<SysDictPageResponseType>> => {
  return fetchRequest(`/sys/dict/page`, { body });
};

export const fetchSysDictList = async (): Promise<
  IResult<SysDictListResponseType>
> => {
  return fetchRequest(`/sys/dict/list`);
};

export const fetchSysDictCreate = async (
  body: SysDictCreateSchemaType
): Promise<IResult<SysDictCreateResponseType>> => {
  return fetchRequest(`/sys/dict/create`, { body });
};

export const fetchSysDictUpdate = async (
  body: SysDictUpdateSchemaType
): Promise<IResult<SysDictUpdateResponseType>> => {
  return fetchRequest(`/sys/dict/update`, { body });
};

export const fetchSysDictDetail = async (
  id: string
): Promise<IResult<SysDictDetailResponseType>> => {
  return fetchRequest(`/sys/dict/detail`, { body: { id } });
};

export const fetchSysDictDelete = async (
  body: DeleteSchemaType
): Promise<IResult<DeleteResponseType>> => {
  return fetchRequest(`/sys/dict/delete`, { body });
};
