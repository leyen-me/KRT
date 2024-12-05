/*
  Warnings:

  - You are about to alter the column `createdAt` on the `SysUser` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expires` on the `SysUserToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `SysUserToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `code` to the `SysRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SysRole` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SysUser` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `SysUserToken` MODIFY `expires` DATETIME NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();
