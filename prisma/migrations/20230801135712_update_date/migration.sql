-- AlterTable
ALTER TABLE `building` MODIFY `created_at` DATE NOT NULL;

-- AlterTable
ALTER TABLE `community` MODIFY `created_at` DATE NOT NULL;

-- AlterTable
ALTER TABLE `resident` MODIFY `created_at` DATE NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` DATE NOT NULL;
