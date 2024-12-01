/*
  Warnings:

  - You are about to drop the column `images` on the `cocktail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cocktail` DROP COLUMN `images`,
    ADD COLUMN `image` VARCHAR(191) NULL;
