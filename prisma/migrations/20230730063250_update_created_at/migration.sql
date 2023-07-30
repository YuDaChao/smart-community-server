/*
  Warnings:

  - You are about to alter the column `updated_at` on the `area` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `building` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `community` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `owner` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `area` MODIFY `created_at` DATE NOT NULL,
    MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `building` MODIFY `created_at` DATE NOT NULL,
    MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `community` MODIFY `created_at` DATE NOT NULL,
    MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `owner` MODIFY `created_at` DATE NOT NULL,
    MODIFY `updated_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` DATE NOT NULL,
    MODIFY `updated_at` DATETIME NOT NULL;
