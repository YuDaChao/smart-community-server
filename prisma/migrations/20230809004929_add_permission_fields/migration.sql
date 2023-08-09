/*
  Warnings:

  - A unique constraint covering the columns `[permission_code]` on the table `permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permission_code` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permission` ADD COLUMN `permission_code` VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `permission_permission_code_key` ON `permission`(`permission_code`);
