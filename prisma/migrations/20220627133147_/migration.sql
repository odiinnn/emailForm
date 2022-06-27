/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credits" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" REAL NOT NULL,
    "dateOfbirth" TEXT NOT NULL,
    "message" TEXT
);