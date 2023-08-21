-- CreateTable
CREATE TABLE `area` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area_name` VARCHAR(50) NOT NULL,
    `area_code` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `parent_id` INTEGER NULL,

    UNIQUE INDEX `area_id_key`(`id`),
    UNIQUE INDEX `area_area_code_key`(`area_code`),
    INDEX `area_parentId_fkey`(`parent_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `community_name` VARCHAR(50) NOT NULL,
    `community_address` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `area_id` INTEGER NOT NULL,

    UNIQUE INDEX `community_id_key`(`id`),
    INDEX `community_areaId_fkey`(`area_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `building_name` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `community_id` INTEGER NOT NULL,

    UNIQUE INDEX `building_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `floor_number` SMALLINT UNSIGNED NOT NULL,
    `floor_no` VARCHAR(10) NOT NULL,
    `houseStatus` ENUM('SELF_OCCUPIED', 'HIRE', 'IDLE') NOT NULL DEFAULT 'SELF_OCCUPIED',
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `building_id` INTEGER NOT NULL,

    UNIQUE INDEX `house_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resident` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resident_name` VARCHAR(50) NOT NULL,
    `resident_phone` CHAR(11) NOT NULL,
    `resident_type` ENUM('OWNER', 'TENANT') NOT NULL DEFAULT 'OWNER',
    `verify_status` ENUM('DEFAULT', 'PROCESSING', 'SUCCESS', 'ERROR') NOT NULL DEFAULT 'DEFAULT',
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `community_id` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,
    `house_id` INTEGER NOT NULL,

    UNIQUE INDEX `resident_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_type_dict` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repair_type_name` VARCHAR(8) NOT NULL,
    `status` ENUM('ENABLE', 'DISABLE') NOT NULL DEFAULT 'ENABLE',
    `sort` SMALLINT UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `repair_type_dict_id_key`(`id`),
    UNIQUE INDEX `repair_type_dict_repair_type_name_key`(`repair_type_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repair_desc` VARCHAR(255) NOT NULL,
    `service_at` DATETIME(3) NOT NULL,
    `repairStatus` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `repair_type_id` INTEGER NOT NULL,
    `resident_id` INTEGER NOT NULL,

    UNIQUE INDEX `repair_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_url` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `repair_id` INTEGER NOT NULL,

    UNIQUE INDEX `repair_file_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `role_id_key`(`id`),
    UNIQUE INDEX `role_role_name_key`(`role_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission_name` VARCHAR(10) NOT NULL,
    `permission_code` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permission_id_key`(`id`),
    UNIQUE INDEX `permission_permission_name_key`(`permission_name`),
    UNIQUE INDEX `permission_permission_code_key`(`permission_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permission` (
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    PRIMARY KEY (`permission_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `community_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_user_name_key`(`user_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(10) NOT NULL,
    `menu_icon` VARCHAR(20) NULL,
    `menu_path` VARCHAR(100) NULL,
    `menu_status` ENUM('ENABLE', 'DISABLE') NOT NULL DEFAULT 'ENABLE',
    `menu_priority` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `parent_id` INTEGER NULL,

    UNIQUE INDEX `menu_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_menu` (
    `menu_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menu_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `user_id` INTEGER NULL,

    UNIQUE INDEX `logger_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workflow_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `remark` VARCHAR(100) NULL,
    `repair_id` INTEGER NOT NULL,

    UNIQUE INDEX `repair_progress_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_progress_file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_url` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `repair_progress_id` INTEGER NOT NULL,

    UNIQUE INDEX `repair_progress_file_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `workflow_action_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `area` ADD CONSTRAINT `area_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `building_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `building_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house` ADD CONSTRAINT `house_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resident` ADD CONSTRAINT `resident_house_id_fkey` FOREIGN KEY (`house_id`) REFERENCES `house`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `repair_repair_type_id_fkey` FOREIGN KEY (`repair_type_id`) REFERENCES `repair_type_dict`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `repair_resident_id_fkey` FOREIGN KEY (`resident_id`) REFERENCES `resident`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair_file` ADD CONSTRAINT `repair_file_repair_id_fkey` FOREIGN KEY (`repair_id`) REFERENCES `repair`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_community_id_fkey` FOREIGN KEY (`community_id`) REFERENCES `community`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_menu` ADD CONSTRAINT `role_menu_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_menu` ADD CONSTRAINT `role_menu_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logger` ADD CONSTRAINT `logger_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair_progress` ADD CONSTRAINT `repair_progress_workflow_id_fkey` FOREIGN KEY (`workflow_id`) REFERENCES `workflow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair_progress` ADD CONSTRAINT `repair_progress_repair_id_fkey` FOREIGN KEY (`repair_id`) REFERENCES `repair`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair_progress_file` ADD CONSTRAINT `repair_progress_file_repair_progress_id_fkey` FOREIGN KEY (`repair_progress_id`) REFERENCES `repair_progress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workflow_action` ADD CONSTRAINT `action_workflow_id` FOREIGN KEY (`workflow_id`) REFERENCES `workflow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workflow_action` ADD CONSTRAINT `next_action_workflow_id` FOREIGN KEY (`next_workflow_id`) REFERENCES `workflow`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
