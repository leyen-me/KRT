import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  DeleteSchemaType,
  DeleteResponseType,
  SysDictItemPageResponseType,
  SysDictItemPageSchemaType,
  SysDictItemListResponseType,
  SysDictItemCreateSchemaType,
  SysDictItemCreateResponseType,
  SysDictItemUpdateSchemaType,
  SysDictItemUpdateResponseType,
  SysDictItemDetailResponseType,
  SysDictItemListSchemaType,
} from "@app/server/src/model";

export const fetchSysDictItemPage = async (
  body: SysDictItemPageSchemaType
): Promise<IResult<SysDictItemPageResponseType>> => {
  return fetchRequest(`/sys/dict/item/page`, { body });
};

export const fetchSysDictItemList = async (
  body: SysDictItemListSchemaType
): Promise<IResult<SysDictItemListResponseType>> => {
  return fetchRequest(`/sys/dict/item/list`, { body });
};

export const fetchSysDictItemCreate = async (
  body: SysDictItemCreateSchemaType
): Promise<IResult<SysDictItemCreateResponseType>> => {
  return fetchRequest(`/sys/dict/item/create`, { body });
};

export const fetchSysDictItemUpdate = async (
  body: SysDictItemUpdateSchemaType
): Promise<IResult<SysDictItemUpdateResponseType>> => {
  return fetchRequest(`/sys/dict/item/update`, { body });
};

export const fetchSysDictItemDetail = async (
  id: string
): Promise<IResult<SysDictItemDetailResponseType>> => {
  return fetchRequest(`/sys/dict/item/detail`, { body: { id } });
};

export const fetchSysDictItemDelete = async (
  body: DeleteSchemaType
): Promise<IResult<DeleteResponseType>> => {
  return fetchRequest(`/sys/dict/item/delete`, { body });
};
