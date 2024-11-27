import { fetchSysAuthUserInfo } from "@/api/sys/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { SysUserDetailType } from "@app/server/src/service/sys/auth";
import { IResult } from "@app/result";
import { useEffect } from "react";

// Create a ProtectedRoute component to check if the user has permission to access the admin route.
export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const {
    data: userInfo,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery<IResult<SysUserDetailType>>({
    queryKey: ["userInfo"],
    queryFn: fetchSysAuthUserInfo,

    // refetch on mount
    refetchOnMount: true,
    staleTime: 0,
    retry: 2,
    retryDelay: 1000,
  });

  // control error and redirect
  useEffect(() => {
    if (!isUserLoading && (userError || !userInfo?.data)) {
      console.error("Error fetching user info:", userError);
      navigate("/login?redirect=/admin/sys/dashboard");
    }
  }, [userError, userInfo, isUserLoading, navigate]);

  // control loading and error
  if (isUserLoading) return <div>Loading user info...</div>;
  if (userError || !userInfo?.data) {
    return null;
  }
  return <>{children}</>;
};
