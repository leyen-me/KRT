import { useState } from "react";

import { LoginForm } from "@/components/login-form";

import {
  LoginResponseVo,
  LoginVo,
  LoginVoKeys,
} from "@app/server/src/service/sys/auth";
import { fetchSysAuthLogin } from "@/api/sys/auth";
import { useToast } from "@/hooks/use-toast";

import { useMutation } from "@tanstack/react-query";
import { t } from "@app/i18n";
import { useAuthStore } from "@/stores/useAuthStore";
import { IResult } from "@app/result";
import { ToastAction } from "@/components/ui/toast";

export default function Page() {
  const { isAuthenticated, setToken } = useAuthStore();

  const { toast } = useToast();
  const [loginData, setLoginData] = useState<LoginVo>({
    email: "",
    password: "",
  });

  // 使用 useMutation 来执行登录操作
  const { mutate, isPending: loginPending } = useMutation<
    IResult<LoginResponseVo>,
    Error,
    LoginVo
  >({
    mutationFn: fetchSysAuthLogin,
    onSuccess: (res) => {
      const { message, data } = res;
      const { token } = data;
      setToken(token);
      toast({
        title: t("pages.login.toast.success.description"),
        variant: "success",
        description: message,
      });
    },
    onError: (error) => {
      toast({
        title: t("pages.login.toast.error.description"),
        variant: "destructive",
        description: error.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              mutate(loginData);
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    },
  });

  const handleChange = (key: LoginVoKeys, value: string) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleLogin = () => {
    mutate(loginData);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm
        loginLoading={loginPending}
        loginData={loginData}
        onChange={handleChange}
        onLogin={handleLogin}
      />
    </div>
  );
}
