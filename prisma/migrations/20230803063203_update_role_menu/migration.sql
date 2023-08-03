/*
  Warnings:

  - You are about to drop the `user_menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_menu` DROP FOREIGN KEY `user_menu_menu_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_menu` DROP FOREIGN KEY `user_menu_user_id_fkey`;

-- DropTable
DROP TABLE `user_menu`;

-- CreateTable
CREATE TABLE `role_menu` (
    `menu_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menu_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `role_menu` ADD CONSTRAINT `role_menu_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_menu` ADD CONSTRAINT `role_menu_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
