/*
  Warnings:

  - You are about to drop the column `createdAt` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `community` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `community` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `community` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `area` DROP FOREIGN KEY `area_parentId_fkey`;

-- AlterTable
ALTER TABLE `area` DROP COLUMN `createdAt`,
    DROP COLUMN `parentId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `parent_id` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `community` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `area_parentId_fkey` ON `area`(`parent_id`);

-- AddForeignKey
ALTER TABLE `area` ADD CONSTRAINT `area_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
