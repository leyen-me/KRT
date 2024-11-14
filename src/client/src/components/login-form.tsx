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
import { t } from "@common/i18n";
import { Link } from "react-router-dom";

export function LoginForm() {
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
              placeholder={t("pages.login.emailPlacehoder")}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t("pages.login.password")}</Label>
              <Link to={"#"} className="ml-auto inline-block text-sm underline">
                {t("pages.login.forgetPassword")}
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {t("pages.login.login")}
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
