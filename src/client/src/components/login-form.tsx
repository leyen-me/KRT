import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginVo, LoginVoKeys } from "@app/server/src/api/sys/auth";
import { t } from "@common/i18n";
import { Link } from "react-router-dom";
import { Spinner } from "./ui/spinner";

export interface LoginFormProp {
  loginLoading: boolean
  loginData: LoginVo

  onChange: (key: LoginVoKeys, value: string) => void
  onLogin: () => void
}

export function LoginForm({ loginData, loginLoading, onChange, onLogin }: LoginFormProp) {
  return (
    <Card className="mx-auto max-w-sm min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">{t("pages.login.title")}</CardTitle>
        <CardDescription>{t("pages.login.desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t("pages.login.email")}</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder={t("pages.login.emailPlacehoder")}
              value={loginData.username}
              onChange={(e) => {
                onChange("username", e.target.value)
              }}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t("pages.login.password")}</Label>
              <Link to={"#"} className="ml-auto inline-block text-sm underline">
                {t("pages.login.forgetPassword")}
              </Link>
            </div>
            <Input id="password" type="password" required
              onChange={(e) => {
                onChange("password", e.target.value)
              }}
            />
          </div>
          <Button disabled={loginLoading} onClick={onLogin} className="w-full">
            {loginLoading ? <Spinner /> : null} {t("pages.login.login")}
          </Button>
          <Button variant="outline" className="w-full">
            {t("pages.login.loginWithGoogle")}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t("pages.login.registerDesc")}{" "}
          <Link to={"#"} className="underline">
            {t("pages.login.register")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
