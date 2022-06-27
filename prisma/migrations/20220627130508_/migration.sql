-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credits" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" REAL NOT NULL,
    "dateOfbirth" TEXT NOT NULL,
    "message" TEXT
);
