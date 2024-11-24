/*
  Warnings:

  - You are about to drop the column `created_by` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `sys_user` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `sys_user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `created_by` on the `sys_user_token` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `sys_user_token` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `sys_user_token` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expires` on the `sys_user_token` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `sys_user` DROP COLUMN `created_by`,
    DROP COLUMN `updated_by`,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `sys_user_token` DROP COLUMN `created_by`,
    DROP COLUMN `updated_by`,
    MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    MODIFY `expires` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `sys_role` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_role` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `role_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
