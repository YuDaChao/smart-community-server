/*
  Warnings:

  - You are about to alter the column `floor_number` on the `resident` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `UnsignedSmallInt`.

*/
-- AlterTable
ALTER TABLE `resident` MODIFY `floor_number` SMALLINT UNSIGNED NOT NULL;
