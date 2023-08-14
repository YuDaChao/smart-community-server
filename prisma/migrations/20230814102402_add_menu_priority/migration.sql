/*
  Warnings:

  - Added the required column `menu_priority` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` ADD COLUMN `menu_priority` INTEGER NOT NULL;
