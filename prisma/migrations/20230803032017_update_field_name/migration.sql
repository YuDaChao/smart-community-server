/*
  Warnings:

  - You are about to drop the column `menuName` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `repairDesc` on the `repair` table. All the data in the column will be lost.
  - You are about to drop the column `repairTypeId` on the `repair` table. All the data in the column will be lost.
  - You are about to drop the column `residentId` on the `repair` table. All the data in the column will be lost.
  - You are about to drop the column `repairTypeName` on the `repair_type_dict` table. All the data in the column will be lost.
  - The primary key for the `user_menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `menuId` on the `user_menu` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_menu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[repair_type_name]` on the table `repair_type_dict` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menu_name` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_id` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repair_desc` to the `repair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repair_type_id` to the `repair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resident_id` to the `repair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repair_type_name` to the `repair_type_dict` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `user_menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `repair` DROP FOREIGN KEY `repair_repairTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `repair` DROP FOREIGN KEY `repair_residentId_fkey`;

-- DropForeignKey
ALTER TABLE `user_menu` DROP FOREIGN KEY `user_menu_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `user_menu` DROP FOREIGN KEY `user_menu_userId_fkey`;

-- DropIndex
DROP INDEX `repair_type_dict_repairTypeName_key` ON `repair_type_dict`;

-- AlterTable
ALTER TABLE `menu` DROP COLUMN `menuName`,
    DROP COLUMN `parentId`,
    ADD COLUMN `menu_name` VARCHAR(10) NOT NULL,
    ADD COLUMN `parent_id` INTEGER NOT NULL,
    MODIFY `path` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `repair` DROP COLUMN `repairDesc`,
    DROP COLUMN `repairTypeId`,
    DROP COLUMN `residentId`,
    ADD COLUMN `repair_desc` VARCHAR(255) NOT NULL,
    ADD COLUMN `repair_type_id` INTEGER NOT NULL,
    ADD COLUMN `resident_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `repair_type_dict` DROP COLUMN `repairTypeName`,
    ADD COLUMN `repair_type_name` VARCHAR(8) NOT NULL;

-- AlterTable
ALTER TABLE `user_menu` DROP PRIMARY KEY,
    DROP COLUMN `menuId`,
    DROP COLUMN `userId`,
    ADD COLUMN `menu_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`menu_id`, `user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `repair_type_dict_repair_type_name_key` ON `repair_type_dict`(`repair_type_name`);

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `repair_repair_type_id_fkey` FOREIGN KEY (`repair_type_id`) REFERENCES `repair_type_dict`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `repair_resident_id_fkey` FOREIGN KEY (`resident_id`) REFERENCES `resident`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_menu` ADD CONSTRAINT `user_menu_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_menu` ADD CONSTRAINT `user_menu_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
