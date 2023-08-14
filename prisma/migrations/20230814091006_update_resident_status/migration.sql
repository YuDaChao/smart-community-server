/*
  Warnings:

  - You are about to drop the column `cerifyStatus` on the `resident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `resident` DROP COLUMN `cerifyStatus`,
    ADD COLUMN `verify_status` ENUM('DEFAULT', 'PROCESSING', 'SUCCESS', 'ERROR') NOT NULL DEFAULT 'DEFAULT';
