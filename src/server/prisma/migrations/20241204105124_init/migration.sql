-- CreateTable
CREATE TABLE `SysUser` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('NORMAL', 'DISABLED') NOT NULL DEFAULT 'NORMAL',
    `superAdmin` BOOLEAN NOT NULL DEFAULT false,
    `nickname` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NULL DEFAULT 'UNKNOWN',
    `mobile` VARCHAR(191) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysUserToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysRole` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysUserRole` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysTranslation` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `type` ENUM('en', 'zh_CN') NOT NULL DEFAULT 'en',
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysDict` (
    `id` VARCHAR(191) NOT NULL,
    `transKey` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysDictItem` (
    `id` VARCHAR(191) NOT NULL,
    `dictId` VARCHAR(191) NOT NULL,
    `transKey` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL DEFAULT 1,
    `variant` ENUM('default', 'secondary', 'destructive', 'outline') NOT NULL DEFAULT 'default',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SysDictItem` ADD CONSTRAINT `SysDictItem_dictId_fkey` FOREIGN KEY (`dictId`) REFERENCES `SysDict`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
