import { t } from "@app/i18n";
import {
  LoginResponseType,
  LoginSchemaType,
  LoginWithGoogleSchemaType,
  LoginWithGoogleResponseType,
} from "@app/server/src/model";
import { IResult } from "@app/result";
import { fetchSysAuthLogin, fetchSysAuthLoginWithGoogle } from "@/api/sys/auth";
import { LoginForm } from "@/components/login-form";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { CredentialResponse } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Page() {
  const { setToken } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const decodedRedirectUrl = redirectUrl
    ? decodeURIComponent(redirectUrl)
    : "/";

  const { mutate, isPending: loginPending } = useMutation<
    IResult<LoginResponseType>,
    Error,
    LoginSchemaType
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
      navigate(decodedRedirectUrl);
    },
    onError: (error) => {
      toast({
        title: t("pages.login.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const { mutate: mutateGoogleLogin } = useMutation<
    IResult<LoginWithGoogleResponseType>,
    Error,
    LoginWithGoogleSchemaType
  >({
    mutationFn: fetchSysAuthLoginWithGoogle,
    onSuccess: (res) => {
      const { message, data } = res;
      const { token } = data;
      setToken(token);
      toast({
        title: t("pages.login.toast.success.description"),
        variant: "success",
        description: message,
      });
      navigate(decodedRedirectUrl);
    },
    onError: (error) => {
      toast({
        title: t("pages.login.toast.error.description"),
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const handleLogin = (values: LoginSchemaType) => {
    mutate(values);
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    mutateGoogleLogin(credentialResponse as LoginWithGoogleSchemaType);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm
        loginLoading={loginPending}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}
