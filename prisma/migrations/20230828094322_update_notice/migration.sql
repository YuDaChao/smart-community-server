/*
  Warnings:

  - You are about to drop the column `communityId` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `noticeStatus` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `noticeType` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `notice_status` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notice_type` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `view_count` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Notice` DROP FOREIGN KEY `Notice_communityId_fkey`;

-- DropForeignKey
ALTER TABLE `Notice` DROP FOREIGN KEY `Notice_userId_fkey`;

-- AlterTable
ALTER TABLE `Notice` DROP COLUMN `communityId`,
    DROP COLUMN `noticeStatus`,
    DROP COLUMN `noticeType`,
    DROP COLUMN `userId`,
    DROP COLUMN `viewCount`,
    ADD COLUMN `community_id` INTEGER NULL,
    ADD COLUMN `notice_status` BOOLEAN NOT NULL,
    ADD COLUMN `notice_type` TINYINT NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD COLUMN `view_count` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
