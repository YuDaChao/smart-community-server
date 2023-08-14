-- AlterTable
ALTER TABLE `house` ADD COLUMN `houseStatus` ENUM('SELF_OCCUPIED', 'HIRE', 'IDLE') NOT NULL DEFAULT 'SELF_OCCUPIED';

-- AlterTable
ALTER TABLE `resident` ADD COLUMN `cerifyStatus` ENUM('DEFAULT', 'PROCESSING', 'SUCCESS', 'ERROR') NOT NULL DEFAULT 'DEFAULT';