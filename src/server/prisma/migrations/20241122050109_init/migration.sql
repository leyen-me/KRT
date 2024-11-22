/*
  Warnings:

  - Added the required column `expires` to the `sys_user_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sys_user_token` ADD COLUMN `expires` DATETIME(3) NOT NULL;
