/*
  Warnings:

  - You are about to drop the column `repairStatus` on the `repair` table. All the data in the column will be lost.
  - Added the required column `repair_status` to the `repair` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `repair` DROP COLUMN `repairStatus`,
    ADD COLUMN `repair_status` BOOLEAN NOT NULL;
