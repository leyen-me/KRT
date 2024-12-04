import { useEffect } from "react";

import { fetchSysAuthUserInfo } from "@/api/sys/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "@/constants/query-key";
import { fetchSysTranslationList } from "@/api/sys/translation";
import { addI18nLocalValues } from "@app/i18n";
import { ILocalName } from "@app/i18n/locals";

// Create a ProtectedRoute component to check if the user has permission to access the admin route.
export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const {
    data: _,
    error,
    isLoading,
  } = useQuery<null>({
    queryKey: [QUERY_KEY.SYS_INFO],
    queryFn: async () => {
      const [userInfo, translationList] = await Promise.all([
        fetchSysAuthUserInfo(),
        fetchSysTranslationList(),
      ]);
      addI18nLocalValues(translationList.data as any);
      return null;
    },
    // refetch on mount
    refetchOnMount: true,
    staleTime: 0,
    retry: 2,
    retryDelay: 1000,
  });

  // control error and redirect
  useEffect(() => {
    if (!isLoading && error) {
      navigate("/login?redirect=/admin/sys/dashboard");
    }
  }, [error, isLoading, navigate]);

  // control loading and error
  if (isLoading) return <div>Loading user info...</div>;
  if (error) {
    return null;
  }

  return <>{children}</>;
};
