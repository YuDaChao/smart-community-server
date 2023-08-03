-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_parent_id_fkey`;

-- AlterTable
ALTER TABLE `menu` MODIFY `parent_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
