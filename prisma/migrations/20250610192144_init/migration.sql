-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
