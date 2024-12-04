import { useEffect } from "react";

import { fetchSysAuthUserInfo } from "@/api/sys/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "@/constants/query-key";
import { fetchSysTranslationList } from "@/api/sys/translation";
import { addI18nLocalValues } from "@app/i18n";
import { fetchSysDictAll } from "@/api/sys/dict";
import { useDictStore } from "@/stores/useDictStore";

// Create a ProtectedRoute component to check if the user has permission to access the admin route.
export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const { setDictList } = useDictStore();

  const {
    data: _,
    error,
    isLoading,
  } = useQuery<null>({
    queryKey: [QUERY_KEY.SYS_INFO],
    queryFn: async () => {
      const [sysUserInfoRes, sysTranslationListRes, sysDictAllListRes] = await Promise.all([
        fetchSysAuthUserInfo(),
        fetchSysTranslationList(),
        fetchSysDictAll()
      ]);
      addI18nLocalValues(sysTranslationListRes.data as any);
      setDictList(sysDictAllListRes.data)
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
