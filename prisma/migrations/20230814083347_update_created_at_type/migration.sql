/*
  Warnings:

  - You are about to drop the column `houseId` on the `resident` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `house` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `house` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house_id` to the `resident` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `resident` DROP FOREIGN KEY `resident_houseId_fkey`;

-- AlterTable
ALTER TABLE `building` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `community` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `house` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `menu` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `repair` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `repair_type_dict` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `resident` DROP COLUMN `houseId`,
    ADD COLUMN `house_id` INTEGER NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `role` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `role_menu` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_house_id_fkey` FOREIGN KEY (`house_id`) REFERENCES `house`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
