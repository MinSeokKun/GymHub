-- 사용자(User) 테이블 (admin, trainer 포함)
CREATE TABLE IF NOT EXISTS `User` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NOT NULL,
  `role` ENUM('admin', 'trainer') NOT NULL DEFAULT 'trainer',
  `schedule` TEXT NULL,
  `trainerNote` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  UNIQUE INDEX `User_username_key`(`username`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 회원(Member) 테이블
CREATE TABLE IF NOT EXISTS `Member` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NULL,
  `birth` DATETIME(3) NULL,
  `memo` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `Member_email_key`(`email`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 상품(Product) 테이블
CREATE TABLE IF NOT EXISTS `Product` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `ptCount` INTEGER NOT NULL,
  `durationMonths` INTEGER NOT NULL,
  `price` INTEGER NOT NULL,
  `type` ENUM('pt', 'gym', 'combo') NOT NULL,
  `description` TEXT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 결제(Payment) 테이블
CREATE TABLE IF NOT EXISTS `Payment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `memberId` INTEGER NOT NULL,
  `productId` INTEGER NOT NULL,
  `startDate` DATETIME(3) NOT NULL,
  `endDate` DATETIME(3) NOT NULL,
  `ptCount` INTEGER NOT NULL,
  `price` INTEGER NOT NULL,
  `paidAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `memo` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PT 세션(PTSession) 테이블
CREATE TABLE IF NOT EXISTS `PTSession` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `memberId` INTEGER NOT NULL,
  `trainerId` INTEGER NOT NULL,
  `scheduledAt` DATETIME(3) NOT NULL,
  `status` ENUM('reserved', 'done', 'canceled') NOT NULL DEFAULT 'reserved',
  `note` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 출석(Attendance) 테이블
CREATE TABLE IF NOT EXISTS `Attendance` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `memberId` INTEGER NOT NULL,
  `attendedAt` DATETIME(3) NOT NULL,
  `type` ENUM('general', 'pt') NOT NULL,
  `memo` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 외래 키 제약 조건 추가
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `PTSession` ADD CONSTRAINT `PTSession_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `PTSession` ADD CONSTRAINT `PTSession_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
