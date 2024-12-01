import { fetchRequest } from "@/utils/apiUtils";
import { IResult } from "@app/result";
import {
  SysUserPageResponseType,
  SysUserPageSchemaType,
} from "@app/server/src/model";

export const fetchSysUserPage = async (
  body: SysUserPageSchemaType
): Promise<IResult<SysUserPageResponseType>> => {
  return fetchRequest(`/sys/user/page`, {
    body,
  });
};
