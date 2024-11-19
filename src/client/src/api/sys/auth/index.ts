import { fetchRequest } from "@/utils/apiUtils";

import { IResult } from "@app/result";
import { LoginResponseVo, LoginVo } from "@app/server/src/service/sys/auth";

export const fetchUserInfo = async () => {
    return fetchRequest(`/api/user-info`);
};

export const fetchMenuTree = async () => {
    return fetchRequest(`/api/user-info`);
};

export const fetchSysAuthLogin = async (body: LoginVo): Promise<IResult<LoginResponseVo>> => {
    return fetchRequest(`/api/sys/auth/login`, {
        method: "POST",
        body
    })
};