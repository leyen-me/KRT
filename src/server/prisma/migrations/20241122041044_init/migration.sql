/*
  Warnings:

  - Added the required column `updated_at` to the `sys_user` table without a default value. This is not possible if the table is not empty.
  - Made the column `nickname` on table `sys_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sys_user` ADD COLUMN `created_by` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NULL,
    MODIFY `nickname` VARCHAR(191) NOT NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NULL DEFAULT 'UNKNOWN';
