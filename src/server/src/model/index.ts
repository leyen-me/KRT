import { SYS_USER_GENDER, SYS_USER_STATUS, SysUser } from "@prisma/client";
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
export { SYS_USER_STATUS, SYS_USER_GENDER } from "@prisma/client";
export type { SysUser } from "@prisma/client";

// sys user detail
export const SysUserDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysUserDetailSchemaType = z.infer<typeof SysUserDetailSchema>;
export type SysUserDetailResponseType = Omit<SysUser, "password"> & {
  roleIds: string[];
};

// sys user page
export const SysUserPageSchema = PageSchema.extend({
  email: z.string().optional(),
  status: z.array(z.nativeEnum(SYS_USER_STATUS)).optional(),
});
export type SysUserPageSchemaType = z.infer<typeof SysUserPageSchema>;
export type SysUserPageResponseType =
  PageResponseType<SysUserDetailResponseType>;

// sys user create
export const SysUserCreateSchema = z.object({
  email: z
    .string()
    .min(1, "common.validate.required")
    .email("common.validate.email"),
  password: z.string().min(6, "common.validate.register.password_min_error"),
  status: z.nativeEnum(SYS_USER_STATUS),
  superAdmin: z.boolean(),
  nickname: z.string().optional(),
  gender: z.nativeEnum(SYS_USER_GENDER).optional(),
  mobile: z.string().optional(),
  avatar: z.string().optional(),
  roleIds: z.array(z.string()).optional(),
});
export type SysUserCreateSchemaType = z.infer<typeof SysUserCreateSchema>;
export type SysUserCreateResponseType = {
  id: string;
};

// sys user update
export const SysUserUpdateSchema = SysUserCreateSchema.extend({
  id: z.string().min(1, "common.validate.required"),
  email: z
    .string()
    .min(1, "common.validate.required")
    .email("common.validate.email")
    .optional(),
  password: z
    .string()
    .min(6, "common.validate.register.password_min_error")
    .optional(),
  status: z.nativeEnum(SYS_USER_STATUS).optional(),
  superAdmin: z.boolean().optional(),
});
export type SysUserUpdateSchemaType = z.infer<typeof SysUserUpdateSchema>;
export type SysUserUpdateResponseType = {
  id: string;
};

// sys role
export type { SysRole } from "@prisma/client";
export type { SysUserRole } from "@prisma/client";

// sys user token
export type { SysUserToken } from "@prisma/client";
