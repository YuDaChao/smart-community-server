-- CreateTable
CREATE TABLE `area` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area_name` VARCHAR(20) NOT NULL,
    `area_code` SMALLINT UNSIGNED NOT NULL,
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `area_id_key`(`id`),
    UNIQUE INDEX `area_area_code_key`(`area_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `community_name` VARCHAR(50) NOT NULL,
    `community_address` VARCHAR(100) NOT NULL,
    `areaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `community_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `area` ADD CONSTRAINT `area_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
