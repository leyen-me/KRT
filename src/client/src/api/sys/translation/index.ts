import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  SysTranslationPageResponseType,
  SysTranslationPageSchemaType,
  SysTranslationListResponseType,
  DeleteSchemaType,
  SysTranslationCreateSchemaType,
  SysTranslationCreateResponseType,
  SysTranslationUpdateSchemaType,
  SysTranslationUpdateResponseType,
  SysTranslationDetailResponseType,
  DeleteResponseType,
} from "@app/server/src/model";

export const fetchSysTranslationPage = async (
  body: SysTranslationPageSchemaType
): Promise<IResult<SysTranslationPageResponseType>> => {
  return fetchRequest(`/sys/translation/page`, { body });
};

export const fetchSysTranslationList = async (): Promise<
  IResult<SysTranslationListResponseType>
> => {
  return fetchRequest(`/sys/translation/list`);
};

export const fetchSysTranslationCreate = async (
  body: SysTranslationCreateSchemaType
): Promise<IResult<SysTranslationCreateResponseType>> => {
  return fetchRequest(`/sys/translation/create`, { body });
};

export const fetchSysTranslationUpdate = async (
  body: SysTranslationUpdateSchemaType
): Promise<IResult<SysTranslationUpdateResponseType>> => {
  return fetchRequest(`/sys/translation/update`, { body });
};

export const fetchSysTranslationDetail = async (
  id: string
): Promise<IResult<SysTranslationDetailResponseType>> => {
  return fetchRequest(`/sys/translation/detail`, { body: { id } });
};

export const fetchSysTranslationDelete = async (
  body: DeleteSchemaType
): Promise<IResult<DeleteResponseType>> => {
  return fetchRequest(`/sys/translation/delete`, { body });
};
