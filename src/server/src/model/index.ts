import { t } from "@app/i18n";
import { SysUser } from "@prisma/client";
import { z } from "zod";

export const PageSchema = z.object({
  page: z.number().min(1, t("pages.page_error")),
  pageSize: z.number().min(1, t("pages.page_size_error")),
});
export type PageSchemaType = z.infer<typeof PageSchema>;
export type PageResponseType<T> = {
  total: number;
  list: T[];
};

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

export type { SysUser } from "@prisma/client";
export type SysUserDetailType = Omit<SysUser, "password">;
export type SysUserPageSchemaType = PageSchemaType & {
  email?: string;
};
export type SysUserPageResponseType = PageResponseType<SysUserDetailType>;

export type { SysRole } from "@prisma/client";
export type { SysUserRole } from "@prisma/client";
export type { SysUserToken } from "@prisma/client";
