/*
  Warnings:

  - You are about to alter the column `area_code` on the `area` table. The data in that column could be lost. The data in that column will be cast from `UnsignedSmallInt` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `area` MODIFY `area_code` VARCHAR(10) NOT NULL;
