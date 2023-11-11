/*
  Warnings:

  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "environment" "Environment" NOT NULL;
