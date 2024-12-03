import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { t, useI18nContext } from "@app/i18n";
import { Link } from "react-router-dom";
import { Spinner } from "./ui/spinner";
import { zodResolver } from "@/utils/zodUtils";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "@app/server/src/model";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";

export interface LoginFormProp {
  loginLoading: boolean;
  onLogin: (values: LoginSchemaType) => void;

  onGoogleLogin: (credentialResponse: CredentialResponse) => void;
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function LoginForm({
  loginLoading,
  onLogin,
  onGoogleLogin,
}: LoginFormProp) {
  const { name } = useI18nContext();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="mx-auto max-w-sm min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">{t("pages.login.title")}</CardTitle>
        <CardDescription>{t("pages.login.desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("pages.login.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("pages.login.email_placeholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{t("pages.login.password")}</FormLabel>
                    <Link to="#" className="ml-auto text-sm underline">
                      {t("pages.login.forget_password")}
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loginLoading}
              onClick={form.handleSubmit(onLogin)}
              className="w-full !mt-4"
            >
              {loginLoading ? <Spinner /> : null} {t("pages.login.login")}
            </Button>

            {GOOGLE_CLIENT_ID && (
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <div className="w-full">
                  <GoogleLogin
                    locale={name}
                    onSuccess={(credentialResponse) =>
                      onGoogleLogin(credentialResponse)
                    }
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </GoogleOAuthProvider>
            )}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t("pages.login.register_desc")}{" "}
          <Link to="/register" className="underline">
            {t("pages.login.register")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
