/*
  Warnings:

  - You are about to drop the column `translationKey` on the `SysDict` table. All the data in the column will be lost.
  - You are about to drop the column `translationKey` on the `SysDictItem` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `SysTranslation` table. All the data in the column will be lost.
  - The values [en,zh_CN] on the enum `SysTranslation_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `createdAt` on the `SysUser` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expires` on the `SysUserToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `SysUserToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `transKey` to the `SysDict` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transKey` to the `SysDictItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transKey` to the `SysTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SysDict` DROP COLUMN `translationKey`,
    ADD COLUMN `transKey` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SysDictItem` DROP COLUMN `translationKey`,
    ADD COLUMN `transKey` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SysTranslation` DROP COLUMN `key`,
    ADD COLUMN `transKey` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('EN', 'ZH_CN') NOT NULL;

-- AlterTable
ALTER TABLE `SysUser` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `SysUserToken` MODIFY `expires` DATETIME NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();
