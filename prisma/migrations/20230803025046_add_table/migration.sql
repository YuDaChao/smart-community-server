/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resident` ADD COLUMN `certification_status` ENUM('PROCESSING', 'SUCCESS', 'ERROR') NOT NULL DEFAULT 'PROCESSING',
    ADD COLUMN `house_status` ENUM('SELF_OCCUPIED', 'HIRE', 'IDLE') NOT NULL DEFAULT 'SELF_OCCUPIED';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `roleId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `repair_type_dict` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repairTypeName` VARCHAR(8) NOT NULL,
    `status` ENUM('ENABLE', 'DISABLE') NOT NULL DEFAULT 'ENABLE',
    `sort` SMALLINT UNSIGNED NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `repair_type_dict_id_key`(`id`),
    UNIQUE INDEX `repair_type_dict_repairTypeName_key`(`repairTypeName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repairDesc` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `repairTypeId` INTEGER NOT NULL,
    `residentId` INTEGER NOT NULL,

    UNIQUE INDEX `repair_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(20) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `role_id_key`(`id`),
    UNIQUE INDEX `role_role_name_key`(`role_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menuName` VARCHAR(10) NOT NULL,
    `icon` VARCHAR(20) NULL,
    `path` VARCHAR(100) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `parentId` INTEGER NOT NULL,

    UNIQUE INDEX `menu_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_menu` (
    `menuId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menuId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `repair_repairTypeId_fkey` FOREIGN KEY (`repairTypeId`) REFERENCES `repair_type_dict`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `repair_residentId_fkey` FOREIGN KEY (`residentId`) REFERENCES `resident`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_menu` ADD CONSTRAINT `user_menu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_menu` ADD CONSTRAINT `user_menu_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
