/*
  Warnings:

  - Added the required column `community_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(100) NULL,
    ADD COLUMN `community_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
