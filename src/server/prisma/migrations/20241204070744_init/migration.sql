/*
  Warnings:

  - You are about to alter the column `variant` on the `SysDictItem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(3))`.
  - You are about to alter the column `type` on the `SysTranslation` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.
  - You are about to alter the column `createdAt` on the `SysUser` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expires` on the `SysUserToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `SysUserToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `SysDictItem` MODIFY `variant` ENUM('DEFAULT', 'SECONDARY', 'DESTRUCTIVE', 'OUTLINE') NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE `SysTranslation` MODIFY `type` ENUM('en', 'zh_CN') NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE `SysUser` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `SysUserToken` MODIFY `expires` DATETIME NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();
