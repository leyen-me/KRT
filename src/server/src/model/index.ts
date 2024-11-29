import { SysUser } from "@prisma/client";
import { z } from "zod";

export { z } from "zod";
export type { ZodSchema } from "zod";

// page
export const PageSchema = z.object({
  page: z.number().min(1, "common.validate.required"),
  pageSize: z.number().min(1, "common.validate.required"),
});
export type PageSchemaType = z.infer<typeof PageSchema>;
export type PageResponseType<T> = {
  total: number;
  list: T[];
};

// login
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "common.validate.required")
    .email("common.validate.email"),
  password: z.string().min(6, "common.validate.login.password_min_error"),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type LoginResponseType = {
  token: string;
};

// login with google
export const LoginWithGoogleSchema = z.object({
  clientId: z.string().min(1, "common.validate.required"),
  credential: z.string().min(1, "common.validate.required"),
});
export type LoginWithGoogleSchemaType = z.infer<typeof LoginWithGoogleSchema>;
export type LoginWithGoogleResponseType = {
  token: string;
};

// register
export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, "common.validate.required")
    .email("common.validate.email"),
  password: z.string().min(6, "common.validate.register.password_min_error"),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type RegisterResponseType = null;

// sys user
export type { SysUser } from "@prisma/client";
export type SysUserDetailType = Omit<SysUser, "password">;
export const SysUserPageSchema = PageSchema.extend({
  email: z.string().optional(),
});
export type SysUserPageSchemaType = z.infer<typeof SysUserPageSchema>;
export type SysUserPageResponseType = PageResponseType<SysUserDetailType>;

// sys role
export type { SysRole } from "@prisma/client";
export type { SysUserRole } from "@prisma/client";

// sys user token
export type { SysUserToken } from "@prisma/client";
