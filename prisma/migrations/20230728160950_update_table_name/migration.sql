/*
  Warnings:

  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Owner` DROP FOREIGN KEY `Owner_building_id_fkey`;

-- DropTable
DROP TABLE `Owner`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_name` VARCHAR(50) NOT NULL,
    `owner_phone` CHAR(11) NOT NULL,
    `floor_number` VARCHAR(10) NOT NULL,
    `floor_no` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `building_id` INTEGER NOT NULL,

    UNIQUE INDEX `owner_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'OWNER', 'MANAGER') NOT NULL DEFAULT 'OWNER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_user_name_key`(`user_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `owner` ADD CONSTRAINT `owner_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
