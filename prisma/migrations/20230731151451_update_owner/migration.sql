/*
  Warnings:

  - You are about to alter the column `updated_at` on the `area` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `building` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `community` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to alter the column `updated_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `owner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `owner` DROP FOREIGN KEY `owner_building_id_fkey`;

-- AlterTable
ALTER TABLE `area` MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `building` MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `community` MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'RESIDENT', 'MANAGER') NOT NULL DEFAULT 'RESIDENT',
    MODIFY `updated_at` DATETIME NOT NULL;

-- DropTable
DROP TABLE `owner`;

-- CreateTable
CREATE TABLE `resident` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resident_name` VARCHAR(50) NOT NULL,
    `resident_phone` CHAR(11) NOT NULL,
    `floor_number` VARCHAR(10) NOT NULL,
    `floor_no` VARCHAR(10) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `community_id` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,

    UNIQUE INDEX `resident_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
