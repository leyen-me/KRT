/*
  Warnings:

  - You are about to alter the column `created_at` on the `sys_user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `created_at` on the `sys_user_token` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `expires` on the `sys_user_token` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `sys_user` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `sys_user_token` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    MODIFY `expires` DATETIME NOT NULL;
