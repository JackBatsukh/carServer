-- CreateTable
CREATE TABLE `Users` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `firstName` VARCHAR(25) NOT NULL,
    `lastName` VARCHAR(25) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `Phone` VARCHAR(15) NOT NULL,
    `address` VARCHAR(255) NULL,
    `identityImage` VARCHAR(255) NULL,
    `licenseImage` VARCHAR(255) NULL,
    `rentHistory` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_Email_key`(`Email`),
    UNIQUE INDEX `Users_Phone_key`(`Phone`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cars` (
    `carID` INTEGER NOT NULL AUTO_INCREMENT,
    `brandID` INTEGER NOT NULL,
    `modelID` INTEGER NOT NULL,
    `brandName` VARCHAR(50) NOT NULL,
    `modelName` VARCHAR(50) NOT NULL,
    `price` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `seats` INTEGER NOT NULL,
    `engine` VARCHAR(191) NOT NULL,
    `roadLimit` INTEGER NOT NULL,
    `fuelCapacity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`carID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `brandID` INTEGER NOT NULL AUTO_INCREMENT,
    `brandName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Brand_brandName_key`(`brandName`),
    PRIMARY KEY (`brandID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `modelID` INTEGER NOT NULL AUTO_INCREMENT,
    `modelName` VARCHAR(191) NOT NULL,
    `brandID` INTEGER NOT NULL,

    PRIMARY KEY (`modelID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rental` (
    `rentalID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `carID` INTEGER NOT NULL,
    `transactionID` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `paymentStatus` VARCHAR(191) NOT NULL,
    `totalCost` INTEGER NOT NULL,

    PRIMARY KEY (`rentalID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transactionID` INTEGER NOT NULL AUTO_INCREMENT,
    `rentalID` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Transaction_rentalID_key`(`rentalID`),
    PRIMARY KEY (`transactionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cars` ADD CONSTRAINT `Cars_brandID_fkey` FOREIGN KEY (`brandID`) REFERENCES `Brand`(`brandID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cars` ADD CONSTRAINT `Cars_modelID_fkey` FOREIGN KEY (`modelID`) REFERENCES `Model`(`modelID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_brandID_fkey` FOREIGN KEY (`brandID`) REFERENCES `Brand`(`brandID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_carID_fkey` FOREIGN KEY (`carID`) REFERENCES `Cars`(`carID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_rentalID_fkey` FOREIGN KEY (`rentalID`) REFERENCES `Rental`(`rentalID`) ON DELETE RESTRICT ON UPDATE CASCADE;
