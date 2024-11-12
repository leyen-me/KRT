import { fetchMenuTree, fetchUserInfo } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



// Create a ProtectedRoute component to check if the user has permission to access the admin route.
export const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const isAuthenticated = false;

    // 获取用户信息
    const { data: userInfo, error: userError, isLoading: isUserLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo,
    });

    // 获取菜单树，只有当用户信息获取成功时才执行
    const { data: menuTree, error: menuError, isLoading: isMenuLoading } = useQuery({
        queryKey: ['menuTree', userInfo?.id],  // 当 userInfo.id 发生变化时重新请求
        queryFn: () => fetchMenuTree(userInfo?.id),
        enabled: !!userInfo,  // 只有当 userInfo 存在时才触发请求
    });

    if (isUserLoading) return <div>Loading user info...</div>;
    // 如果获取用户信息时出错，跳转到登录页
    if (userError) {
        console.error('Error fetching user info:', userError);
        navigate('/login'); // 跳转到登录页面
        return null;  // 跳转后不渲染任何内容
    }


    if (isMenuLoading) return <div>Loading menu tree...</div>;
    // 如果获取菜单树时出错，跳转到登录页
    if (menuError) {
        console.error('Error fetching menu tree:', menuError);
        navigate('/login'); // 跳转到登录页面
        return null;  // 跳转后不渲染任何内容
    }

    return <>{children}</>;
};