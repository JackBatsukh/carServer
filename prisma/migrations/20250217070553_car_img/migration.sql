/*
  Warnings:

  - You are about to drop the column `image` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `rental` MODIFY `transactionID` INTEGER NULL;

-- CreateTable
CREATE TABLE `CarImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carID` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarImages` ADD CONSTRAINT `CarImages_carID_fkey` FOREIGN KEY (`carID`) REFERENCES `Cars`(`carID`) ON DELETE CASCADE ON UPDATE CASCADE;
