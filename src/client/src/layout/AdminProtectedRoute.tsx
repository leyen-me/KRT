import { fetchSysAuthUserInfo } from "@/api/sys/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Create a ProtectedRoute component to check if the user has permission to access the admin route.
export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = false;

  // 获取用户信息
  const {
    data: userInfo,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchSysAuthUserInfo,
  });

  // const {
  //   data: menuTree,
  //   error: menuError,
  //   isLoading: isMenuLoading,
  // } = useQuery({
  //   queryKey: ["menuTree", userInfo?.id],
  //   queryFn: () => fetchMenuTree(userInfo?.id),
  //   enabled: !!userInfo,
  // });

  if (isUserLoading) return <div>Loading user info...</div>;
  if (userError) {
    console.error("Error fetching user info:", userError);
    navigate("/login?redirect=/admin/sys/dashboard");
    return null;
  }

  // if (isMenuLoading) return <div>Loading menu tree...</div>;
  // if (menuError) {
  //   console.error("Error fetching menu tree:", menuError);
  //   navigate("/login?redirect=/admin/dashboard");
  //   return null;
  // }

  return <>{children}</>;
};
