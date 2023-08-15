-- CreateTable
CREATE TABLE `logger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `method` VARCHAR(10) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `query` VARCHAR(191) NOT NULL,
    `param` VARCHAR(191) NOT NULL,
    `body` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `logger_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logger` ADD CONSTRAINT `logger_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
