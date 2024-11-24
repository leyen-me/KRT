import { fetchSysAuthUserInfo } from "@/api/sys/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { UserDetailType } from "@app/server/src/service/sys/auth";
import { IResult } from "@app/result";
import { useEffect } from "react";

// Create a ProtectedRoute component to check if the user has permission to access the admin route.
export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = false;

  const {
    data: userInfo,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery<IResult<UserDetailType>>({
    queryKey: ["userInfo"],
    queryFn: fetchSysAuthUserInfo,
    staleTime: 0,
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
