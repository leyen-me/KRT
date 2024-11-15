import { useState } from "react";

import { LoginForm } from "@/components/login-form";

import {
  LoginResponseVo,
  LoginVo,
  LoginVoKeys,
} from "@app/server/src/api/sys/auth";
import { Result } from "@app/server/src/types";
import { fetchSysAuthLogin } from "@/api/sys/auth";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { t } from "@common/i18n";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Page() {
  const { isAuthenticated, setToken } = useAuthStore();

  console.log(isAuthenticated);

  const [loginData, setLoginData] = useState<LoginVo>({
    email: "",
    password: "",
  });

  // 使用 useMutation 来执行登录操作
  const { mutate, isPending: loginPending } = useMutation<
    Result<LoginResponseVo>,
    Error,
    LoginVo
  >({
    mutationFn: fetchSysAuthLogin,
    onSuccess: (res) => {
      const { message, data } = res;
      const { token } = data;
      setToken(token);
      toast(t("pages.common.sonner.success.title"), {
        description: message,
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
    },
    onError: (error) => {
      // 处理登录失败时的错误信息
      console.error("Login failed:", error.message);
    },
  });

  const handleChange = (key: LoginVoKeys, value: string) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleLogin = () => {
    // 1.Call the login interface
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
