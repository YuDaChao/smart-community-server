/*
  Warnings:

  - You are about to drop the `workflow_dict` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `repair_progress` DROP FOREIGN KEY `repair_progress_workflow_id_fkey`;

-- AlterTable
ALTER TABLE `repair_progress` MODIFY `remark` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `workflow_dict`;

-- CreateTable
CREATE TABLE `workflow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workflow_name` VARCHAR(50) NOT NULL,
    `workflow_sort` INTEGER NOT NULL,
    `model_type` INTEGER NOT NULL,
    `is_final` TINYINT NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `workflow_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workflow_action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workflow_id` INTEGER NOT NULL,
    `next_workflow_id` INTEGER NULL,

    UNIQUE INDEX `workflow_action_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `repair_progress` ADD CONSTRAINT `repair_progress_workflow_id_fkey` FOREIGN KEY (`workflow_id`) REFERENCES `workflow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workflow_action` ADD CONSTRAINT `action_workflow_id` FOREIGN KEY (`workflow_id`) REFERENCES `workflow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workflow_action` ADD CONSTRAINT `next_action_workflow_id` FOREIGN KEY (`workflow_id`) REFERENCES `workflow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
