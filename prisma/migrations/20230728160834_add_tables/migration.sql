-- CreateTable
CREATE TABLE `building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `building_name` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `community_id` INTEGER NOT NULL,

    UNIQUE INDEX `building_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_name` VARCHAR(50) NOT NULL,
    `owner_phone` CHAR(11) NOT NULL,
    `floor_number` VARCHAR(10) NOT NULL,
    `floor_no` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `building_id` INTEGER NOT NULL,

    UNIQUE INDEX `Owner_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'OWNER', 'MANAGER') NOT NULL DEFAULT 'OWNER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_user_name_key`(`user_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `building_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `building_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Owner` ADD CONSTRAINT `Owner_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
