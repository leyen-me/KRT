import { fetchRequest } from "@/utils/apiUtils";

// 第一步：获取用户信息
export const fetchUserInfo = async () => {
    return fetchRequest(`/api/user-info`);
};

// 第二步：获取菜单树（依赖于用户信息）
export const fetchMenuTree = async (userId: string) => {
    return fetchRequest(`/api/menu-tree?userId=${userId}`)
};