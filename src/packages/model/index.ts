import { t } from "@app/i18n";
import { z } from "zod";

// login
export const LoginSchema = z.object({
  email: z.string().email(t("pages.login.email_error")),
  password: z.string().min(6, t("pages.login.password_error")),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type LoginResponseType = {
  token: string;
};

// login with google
export const LoginWithGoogleSchema = z.object({
  clientId: z.string(),
  credential: z.string(),
});
export type LoginWithGoogleSchemaType = z.infer<typeof LoginWithGoogleSchema>;
export type LoginWithGoogleResponseType = {
  token: string;
};

// register
export const RegisterSchema = z.object({
  email: z.string().email(t("pages.register.email_error")),
  password: z.string().min(6, t("pages.register.password_error")),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type RegisterResponseType = null;
