/*
  Warnings:

  - You are about to drop the `SysUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `SysUser`;

-- CreateTable
CREATE TABLE `sys_user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    `mobile` VARCHAR(191) NULL,
    `status` ENUM('NORMAL', 'DISABLED') NOT NULL DEFAULT 'NORMAL',
    `super_admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sys_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
