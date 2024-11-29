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
import { t } from "@app/i18n";
import { Link } from "react-router-dom";
import { Spinner } from "./ui/spinner";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "@app/server/src/model";
import { zodResolver } from "@/utils/zodUtils";

export interface RegisterFormProp {
  registerLoading: boolean;
  onRegister: (values: RegisterSchemaType) => void;
}

export function RegisterForm({
  registerLoading,
  onRegister,
}: RegisterFormProp) {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="mx-auto max-w-sm min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">{t("pages.register.title")}</CardTitle>
        <CardDescription>{t("pages.register.desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegister)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("pages.register.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("pages.register.email_placeholder")}
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
                  <FormLabel>{t("pages.register.password")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={registerLoading}
              onClick={form.handleSubmit(onRegister)}
              className="w-full !mt-4"
            >
              {registerLoading ? <Spinner /> : null}{" "}
              {t("pages.register.register")}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t("pages.register.login_desc")}{" "}
          <Link to="/login" className="underline">
            {t("pages.register.login")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
