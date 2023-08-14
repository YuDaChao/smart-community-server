/*
  Warnings:

  - You are about to drop the column `certification_status` on the `resident` table. All the data in the column will be lost.
  - You are about to drop the column `floor_no` on the `resident` table. All the data in the column will be lost.
  - You are about to drop the column `floor_number` on the `resident` table. All the data in the column will be lost.
  - You are about to drop the column `house_status` on the `resident` table. All the data in the column will be lost.
  - Added the required column `houseId` to the `resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permission` MODIFY `permission_code` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `resident` DROP COLUMN `certification_status`,
    DROP COLUMN `floor_no`,
    DROP COLUMN `floor_number`,
    DROP COLUMN `house_status`,
    ADD COLUMN `houseId` INTEGER NOT NULL,
    ADD COLUMN `resident_type` ENUM('OWNER', 'TENANT') NOT NULL DEFAULT 'OWNER';

-- CreateTable
CREATE TABLE `house` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `floor_number` SMALLINT UNSIGNED NOT NULL,
    `floor_no` VARCHAR(10) NOT NULL,
    `building_id` INTEGER NOT NULL,

    UNIQUE INDEX `house_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `house` ADD CONSTRAINT `house_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `house`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
