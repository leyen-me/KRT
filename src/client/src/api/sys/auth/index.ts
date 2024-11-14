import { fetchRequest } from "@/utils/apiUtils";

import { Result } from "@app/server/src/types"
import { LoginResponseVo, LoginVo } from "@app/server/src/api/sys/auth";

export const fetchUserInfo = async () => {
    return fetchRequest(`/api/user-info`);
};

export const fetchMenuTree = async () => {
    return fetchRequest(`/api/user-info`);
};

export const fetchSysAuthLogin = async (body: LoginVo): Promise<Result<LoginResponseVo>> => {
    return fetchRequest(`/api/sys/auth/login`, {
        method: "POST",
        body
    })
};