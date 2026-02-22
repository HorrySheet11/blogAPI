-- CreateTable
CREATE TABLE "ManagePostInfo" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "ManagePostInfo_pkey" PRIMARY KEY ("id")
);
