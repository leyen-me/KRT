import { PrismaClient } from "@prisma/client";

export const SYS_USERS = [
  {
    id: "user_a",
    email: "a@example.com",
    password: "DpRhz9JwNaNc1RJLb2nkgA==",
    super_admin: true,
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
    user_id: "user_a",
    role_id: "developer",
  },
  {
    id: "2",
    user_id: "user_a",
    role_id: "developer",
  },
  {
    id: "3",
    user_id: "user_b",
    role_id: "designer",
  },
];

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
  await createOrUpdate("sys_user", SYS_USERS);
  await createOrUpdate("sys_role", SYS_ROLES);
  await createOrUpdate("sys_user_role", SYS_USER_ROLES);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
