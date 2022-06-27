/*
  Warnings:

  - You are about to alter the column `dateOfbirth` on the `UserForm` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credits" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" REAL NOT NULL,
    "dateOfbirth" DATETIME NOT NULL,
    "message" TEXT
);
INSERT INTO "new_UserForm" ("credits", "dateOfbirth", "email", "id", "message", "number") SELECT "credits", "dateOfbirth", "email", "id", "message", "number" FROM "UserForm";
DROP TABLE "UserForm";
ALTER TABLE "new_UserForm" RENAME TO "UserForm";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
