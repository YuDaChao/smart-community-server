/*
  Warnings:

  - You are about to drop the column `icon` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `icon`,
    DROP COLUMN `path`,
    ADD COLUMN `menu_icon` VARCHAR(20) NULL,
    ADD COLUMN `menu_path` VARCHAR(100) NULL;
