/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ManagePostInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `ManagePostInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ManagePostInfo_token_key" ON "ManagePostInfo"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ManagePostInfo_uuid_key" ON "ManagePostInfo"("uuid");
