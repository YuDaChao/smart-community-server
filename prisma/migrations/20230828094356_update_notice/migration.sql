/*
  Warnings:

  - You are about to drop the `Notice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notice` DROP FOREIGN KEY `Notice_community_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notice` DROP FOREIGN KEY `Notice_user_id_fkey`;

-- DropTable
DROP TABLE `Notice`;

-- CreateTable
CREATE TABLE `notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notice_title` VARCHAR(100) NOT NULL,
    `notice_type` TINYINT NOT NULL,
    `notice_content` VARCHAR(2000) NOT NULL,
    `notice_status` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `view_count` INTEGER NOT NULL,
    `community_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `notice_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notice` ADD CONSTRAINT `notice_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notice` ADD CONSTRAINT `notice_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
