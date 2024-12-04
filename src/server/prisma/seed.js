import { PrismaClient } from "@prisma/client";

export const SYS_USERS = [
  {
    id: "user_a",
    email: "a@example.com",
    password: "DpRhz9JwNaNc1RJLb2nkgA==",
    superAdmin: true,
  },
  {
    id: "user_b",
    email: "b@example.com",
    password: "DpRhz9JwNaNc1RJLb2nkgA==",
  },
];

export const SYS_ROLES = [
  {
    id: "developer",
    name: "developer",
  },
  {
    id: "designer",
    name: "designer",
  },
];

export const SYS_USER_ROLES = [
  {
    id: "1",
    userId: "user_a",
    roleId: "developer",
  },
  {
    id: "2",
    userId: "user_a",
    roleId: "developer",
  },
  {
    id: "3",
    userId: "user_b",
    roleId: "designer",
  },
];

export const SYS_TRANSLATIONS = [
  {
    id: "pages.common.yes_no",
    key: "pages.common.yes_no",
    type: "en",
    value: "YesOrNo",
  },
  {
    id: "pages.common.yes_no.zh_CN",
    key: "pages.common.yes_no",
    type: "zh_CN",
    value: "是否",
  },
  {
    id: "pages.common.yes",
    key: "pages.common.yes",
    type: "en",
    value: "Yes",
  },
  {
    id: "pages.common.yes.zh_CN",
    key: "pages.common.yes",
    type: "zh_CN",
    value: "是",
  },
  {
    id: "pages.common.no",
    key: "pages.common.no",
    type: "en",
    value: "No",
  },
  {
    id: "pages.common.no.zh_CN",
    key: "pages.common.no",
    type: "zh_CN",
    value: "否",
  },
  {
    id: "pages.admin.sys.user.status.normal.zh_CN",
    key: "pages.admin.sys.user.status.normal",
    type: "zh_CN",
    value: "默认",
  },
  {
    id: "pages.admin.sys.user.status.normal.en",
    key: "pages.admin.sys.user.status.normal",
    type: "en",
    value: "Normal",
  },
  {
    id: "pages.admin.sys.user.status.normal.zh_CN",
    key: "pages.admin.sys.user.status.normal",
    type: "zh_CN",
    value: "默认",
  },
  {
    id: "pages.admin.sys.user.status.disabled.en",
    key: "pages.admin.sys.user.status.disabled",
    type: "en",
    value: "Disabled",
  },
  {
    id: "pages.admin.sys.user.status.disabled.zh_CN",
    key: "pages.admin.sys.user.status.disabled",
    type: "zh_CN",
    value: "禁用",
  },
  {
    id: "pages.admin.sys.user.gender.male.en",
    key: "pages.admin.sys.user.gender.male",
    type: "en",
    value: "Male",
  },
  {
    id: "pages.admin.sys.user.gender.male.zh_CN",
    key: "pages.admin.sys.user.gender.male",
    type: "zh_CN",
    value: "男",
  },
  {
    id: "pages.admin.sys.user.gender.female.en",
    key: "pages.admin.sys.user.gender.female",
    type: "en",
    value: "Female",
  },
  {
    id: "pages.admin.sys.user.gender.female.zh_CN",
    key: "pages.admin.sys.user.gender.female",
    type: "zh_CN",
    value: "女",
  },
  {
    id: "pages.admin.sys.user.gender.unknown.en",
    key: "pages.admin.sys.user.gender.unknown",
    type: "en",
    value: "Unknown",
  },
  {
    id: "pages.admin.sys.user.gender.unknown.zh_CN",
    key: "pages.admin.sys.user.gender.unknown",
    type: "zh_CN",
    value: "未知",
  },
];

export const SYS_DICTS = [
  {
    id: "sys_yes_no",
    transKey: "pages.common.yes_no",
    code: "sys_yes_no"
  },
  {
    id: "sys_user_gender",
    transKey: "pages.admin.sys.user.data_table.columns.gender",
    code: "sys_user_gender"
  },
  {
    id: "sys_user_status",
    transKey: "pages.admin.sys.user.data_table.columns.status",
    code: "sys_user_status"
  },
];

export const SYS_DICT_ITENS = [
  {
    id: "1",
    dictId: "sys_yes_no",
    transKey: "pages.common.yes",
    value: "true",
    sort: 1,
    variant: "default",
  },
  {
    id: "2",
    dictId: "sys_yes_no",
    transKey: "pages.common.no",
    value: "false",
    sort: 2,
    variant: "outline",
  },
  {
    id: "3",
    dictId: "sys_user_gender",
    transKey: "pages.admin.sys.user.gender.male",
    value: "MALE",
    sort: 1,
    variant: "default",
  },
  {
    id: "4",
    dictId: "sys_user_gender",
    transKey: "pages.admin.sys.user.gender.female",
    value: "FEMALE",
    sort: 2,
    variant: "default",
  },
  {
    id: "5",
    dictId: "sys_user_gender",
    transKey: "pages.admin.sys.user.gender.unknown",
    value: "UNKNOWN",
    sort: 3,
    variant: "outline",
  },
  {
    id: "6",
    dictId: "sys_user_status",
    transKey: "pages.admin.sys.user.status.normal",
    value: "NORMAL",
    sort: 1,
    variant: "default",
  },
  {
    id: "7",
    dictId: "sys_user_status",
    transKey: "pages.admin.sys.user.status.disabled",
    value: "DISABLED",
    sort: 2,
    variant: "destructive",
  },
]

const prisma = new PrismaClient();

const createOrUpdate = async (model, data) => {
  data.forEach(async (item) => {
    await prisma[model].upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  });
};

async function main() {
  for (let i = 0; i < 100; i++) {
    SYS_USERS.push({
      id: `user_${i}`,
      email: `user_${i}@example.com`,
      password: "DpRhz9JwNaNc1RJLb2nkgA==",
    });
  }
  await createOrUpdate("SysUser", SYS_USERS);
  await createOrUpdate("SysRole", SYS_ROLES);
  await createOrUpdate("SysUserRole", SYS_USER_ROLES);
  await createOrUpdate("SysTranslation", SYS_TRANSLATIONS);
  await createOrUpdate("SysDict", SYS_DICTS);
  await createOrUpdate("SysDictItem", SYS_DICT_ITENS);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
