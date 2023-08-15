/*
  Warnings:

  - Added the required column `service_at` to the `repair` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `repair` ADD COLUMN `service_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `RepairFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_url` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `repairId` INTEGER NOT NULL,

    UNIQUE INDEX `RepairFile_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RepairFile` ADD CONSTRAINT `RepairFile_repairId_fkey` FOREIGN KEY (`repairId`) REFERENCES `repair`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
