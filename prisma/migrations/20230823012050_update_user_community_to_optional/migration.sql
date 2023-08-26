-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_community_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `community_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
