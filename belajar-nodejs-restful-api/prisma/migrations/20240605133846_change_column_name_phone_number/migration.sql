/*
  Warnings:

  - You are about to drop the column `phone` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `phone`,
    ADD COLUMN `phoneNumber` VARCHAR(20) NULL;
