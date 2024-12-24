import {
  SysDict,
  SysDictItem,
  SysRole,
  SysTranslation,
  SysUser,
  SysUserRole,
} from "@prisma/client";
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

export const DeleteSchema = z.object({
  ids: z.array(z.string()),
});
export type DeleteSchemaType = z.infer<typeof DeleteSchema>;
export type DeleteResponseType = null;

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

// logout
export type LogoutResponseType = null;

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

// sys translation
export const SYS_TRANSLATION_TYPE = {
  en: "en",
  zh_CN: "zh_CN",
} as const;
export type { SysTranslation } from "@prisma/client";

// sys translation page
export const SysTranslationPageSchema = PageSchema.extend({
  key: z.string().optional(),
});
export type SysTranslationPageSchemaType = z.infer<
  typeof SysTranslationPageSchema
>;
export type SysTranslationPageResponseType = PageResponseType<SysTranslation>;

// sys translation list
export type SysTranslationListResponseType = SysTranslation[];

// sys translation all
export type SysTranslationAllSchemaType = {
  key: string;
  [key: string]: string;
};
export type SysTranslationAllResponseType = SysTranslationAllSchemaType[];

// sys translation create
export const SysTranslationCreateSchema = z.object({
  key: z.string().min(1, "common.validate.required"),
  type: z.nativeEnum(SYS_TRANSLATION_TYPE),
  value: z.string().min(1, "common.validate.required"),
});
export type SysTranslationCreateSchemaType = z.infer<
  typeof SysTranslationCreateSchema
>;
export type SysTranslationCreateResponseType = {
  id: string;
};

// sys translation update
export const SysTranslationUpdateSchema = SysTranslationCreateSchema.extend({
  id: z.string().min(1, "common.validate.required"),
});
export type SysTranslationUpdateSchemaType = z.infer<
  typeof SysTranslationUpdateSchema
>;
export type SysTranslationUpdateResponseType = {
  id: string;
};

// sys translation detail
export const SysTranslationDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysTranslationDetailSchemaType = z.infer<
  typeof SysTranslationDetailSchema
>;
export type SysTranslationDetailResponseType = SysTranslation;

// sys user
export const SYS_USER_STATUS = {
  NORMAL: "NORMAL",
  DISABLED: "DISABLED",
} as const;
export const SYS_USER_GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  UNKNOWN: "UNKNOWN",
} as const;
export type { SysUser } from "@prisma/client";

// sys user detail
export const SysUserDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysUserDetailSchemaType = z.infer<typeof SysUserDetailSchema>;
export const SysRoleOptionSchema = z.object({ label: z.string(), value: z.string() });
export type SysRoleOptionSchemaType = z.infer<typeof SysRoleOptionSchema>;
export type SysUserDetailResponseType = Omit<SysUser, "password"> & {
  roleList: SysRoleOptionSchemaType[];
};

// sys user page
export const SysUserPageSchema = PageSchema.extend({
  email: z.string().optional(),
  status: z.array(z.nativeEnum(SYS_USER_STATUS)).optional(),
  gender: z.array(z.nativeEnum(SYS_USER_GENDER)).optional(),
});
export type SysUserPageSchemaType = z.infer<typeof SysUserPageSchema>;
export type SysUserPageResponseType =
  PageResponseType<SysUserDetailResponseType>;

// sys user list
export type SysUserListResponseType = SysUserDetailResponseType[];

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
  roleList: z.array(SysRoleOptionSchema),
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

// sys dict
export type { SysDict } from "@prisma/client";

// sys dict page
export const SysDictPageSchema = PageSchema.extend({
  name: z.string().optional(),
  code: z.string().optional(),
});
export type SysDictPageSchemaType = z.infer<typeof SysDictPageSchema>;
export type SysDictPageResponseType = PageResponseType<SysDict>;

// sys dict list
export type SysDictWithItems = SysDict & {
  items: SysDictItem[];
};
export type SysDictListResponseType = SysDict[];
export type SysDictAllResponseType = SysDictWithItems[];

// sys dict create
export const SysDictCreateSchema = z.object({
  name: z.string().min(1, "common.validate.required"),
  code: z.string().min(1, "common.validate.required"),
});
export type SysDictCreateSchemaType = z.infer<typeof SysDictCreateSchema>;
export type SysDictCreateResponseType = {
  id: string;
};

// sys dict update
export const SysDictUpdateSchema = SysDictCreateSchema.extend({
  id: z.string().min(1, "common.validate.required"),
});
export type SysDictUpdateSchemaType = z.infer<typeof SysDictUpdateSchema>;
export type SysDictUpdateResponseType = {
  id: string;
};

// sys dict detail
export const SysDictDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysDictDetailSchemaType = z.infer<typeof SysDictDetailSchema>;
export type SysDictDetailResponseType = SysDict;

// sys dict item
export const SYS_DICT_ITEM_VARIANT = {
  default: "default",
  secondary: "secondary",
  destructive: "destructive",
  outline: "outline",
} as const;
export type { SysDictItem } from "@prisma/client";

// sys dict item page
export const SysDictItemPageSchema = PageSchema.extend({
  dictId: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
});
export type SysDictItemPageSchemaType = z.infer<typeof SysDictItemPageSchema>;
export type SysDictItemPageResponseType = PageResponseType<SysDictItem>;

// sys dict item list
export const SysDictItemListSchema = z.object({
  dictId: z.string().min(1, "common.validate.required"),
});
export type SysDictItemListSchemaType = z.infer<typeof SysDictItemListSchema>;
export type SysDictItemListResponseType = SysDictItem[];

// sys dict item create
export const SysDictItemCreateSchema = z.object({
  dictId: z.string().min(1, "common.validate.required"),
  name: z.string().min(1, "common.validate.required"),
  value: z.string().min(1, "common.validate.required"),
  sort: z.number().min(1, "common.validate.required"),
  variant: z.nativeEnum(SYS_DICT_ITEM_VARIANT),
});
export type SysDictItemCreateSchemaType = z.infer<
  typeof SysDictItemCreateSchema
>;
export type SysDictItemCreateResponseType = {
  id: string;
};

// sys dict item update
export const SysDictItemUpdateSchema = SysDictItemCreateSchema.extend({
  id: z.string().min(1, "common.validate.required"),
});
export type SysDictItemUpdateSchemaType = z.infer<
  typeof SysDictItemUpdateSchema
>;
export type SysDictItemUpdateResponseType = {
  id: string;
};

// sys dict item detail
export const SysDictItemDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysDictItemDetailSchemaType = z.infer<
  typeof SysDictItemDetailSchema
>;
export type SysDictItemDetailResponseType = SysDictItem;

// sys role
export type { SysRole } from "@prisma/client";

// sys role page
export const SysRolePageSchema = PageSchema.extend({
  name: z.string().optional(),
  code: z.string().optional(),
});
export type SysRolePageSchemaType = z.infer<typeof SysRolePageSchema>;
export type SysRolePageResponseType = PageResponseType<SysRole>;

// sys role list
export type SysRoleListResponseType = SysRole[];

// sys role create
export const SysRoleCreateSchema = z.object({
  code: z.string().min(1, "common.validate.required"),
  name: z.string().min(1, "common.validate.required"),
});
export type SysRoleCreateSchemaType = z.infer<typeof SysRoleCreateSchema>;
export type SysRoleCreateResponseType = {
  id: string;
};

// sys role update
export const SysRoleUpdateSchema = SysRoleCreateSchema.extend({
  id: z.string().min(1, "common.validate.required"),
});
export type SysRoleUpdateSchemaType = z.infer<typeof SysRoleUpdateSchema>;
export type SysRoleUpdateResponseType = {
  id: string;
};

// sys role detail
export const SysRoleDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysRoleDetailSchemaType = z.infer<typeof SysRoleDetailSchema>;
export type SysRoleDetailResponseType = SysRole;

// sys user role
export type { SysUserRole } from "@prisma/client";

// sys user role page
export const SysUserRolePageSchema = PageSchema.extend({
  name: z.string().optional(),
  roleId: z.string(),
  email: z.string().optional(),
});
export type SysUserRolePageSchemaType = z.infer<typeof SysUserRolePageSchema>;
export type SysUserRolePageResponseType =
  PageResponseType<SysUserRoleDetailResponseType>;

// sys user role list
export type SysUserRoleListResponseType = SysUserRoleDetailResponseType[];

// sys user role create
export const SysUserRoleCreateSchema = z.object({
  roleId: z.string().min(1, "common.validate.required"),
  userId: z.string().min(1, "common.validate.required"),
});
export type SysUserRoleCreateSchemaType = z.infer<
  typeof SysUserRoleCreateSchema
>;
export type SysUserRoleCreateResponseType = {
  id: string;
};

// sys user role update
export const SysUserRoleUpdateSchema = SysUserRoleCreateSchema.extend({
  id: z.string().min(1, "common.validate.required"),
});
export type SysUserRoleUpdateSchemaType = z.infer<
  typeof SysUserRoleUpdateSchema
>;
export type SysUserRoleUpdateResponseType = {
  id: string;
};

// sys user role detail
export const SysUserRoleDetailSchema = z.object({
  id: z.string().min(1, "common.validate.required"),
});
export type SysUserRoleDetailSchemaType = z.infer<
  typeof SysUserRoleDetailSchema
>;
export type SysUserRoleDetailResponseType = SysUserRole & {
  user: {
    nickname: string;
    email: string;
  };
};

// sys user token
export type { SysUserToken } from "@prisma/client";
