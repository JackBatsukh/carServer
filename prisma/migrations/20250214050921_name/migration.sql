/*
  Warnings:

  - You are about to drop the column `brandID` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `modelID` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `brandID` on the `model` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modelName]` on the table `Model` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandName` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `Cars_brandID_fkey`;

-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `Cars_modelID_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `Model_brandID_fkey`;

-- DropIndex
DROP INDEX `Cars_brandID_fkey` ON `cars`;

-- DropIndex
DROP INDEX `Cars_modelID_fkey` ON `cars`;

-- DropIndex
DROP INDEX `Model_brandID_fkey` ON `model`;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `brandID`,
    DROP COLUMN `modelID`,
    MODIFY `brandName` VARCHAR(191) NOT NULL,
    MODIFY `modelName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `model` DROP COLUMN `brandID`,
    ADD COLUMN `brandName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Model_modelName_key` ON `Model`(`modelName`);

-- AddForeignKey
ALTER TABLE `Cars` ADD CONSTRAINT `Cars_brandName_fkey` FOREIGN KEY (`brandName`) REFERENCES `Brand`(`brandName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cars` ADD CONSTRAINT `Cars_modelName_fkey` FOREIGN KEY (`modelName`) REFERENCES `Model`(`modelName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_brandName_fkey` FOREIGN KEY (`brandName`) REFERENCES `Brand`(`brandName`) ON DELETE RESTRICT ON UPDATE CASCADE;
