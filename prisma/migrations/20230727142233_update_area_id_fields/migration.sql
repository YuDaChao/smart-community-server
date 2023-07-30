/*
  Warnings:

  - You are about to drop the column `areaId` on the `community` table. All the data in the column will be lost.
  - Added the required column `area_id` to the `community` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `community` DROP FOREIGN KEY `community_areaId_fkey`;

-- AlterTable
ALTER TABLE `community` DROP COLUMN `areaId`,
    ADD COLUMN `area_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `community_areaId_fkey` ON `community`(`area_id`);

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
