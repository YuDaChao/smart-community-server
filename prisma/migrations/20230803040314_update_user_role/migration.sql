/*
  Warnings:

  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_roleId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`,
    ADD COLUMN `role_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
