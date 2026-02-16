-- CreateTable
CREATE TABLE "JwtBlacklist" (
    "id" SERIAL NOT NULL,
    "jti" TEXT NOT NULL,
    "revokedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JwtBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JwtBlacklist_jti_key" ON "JwtBlacklist"("jti");

-- CreateIndex
CREATE INDEX "JwtBlacklist_jti_idx" ON "JwtBlacklist"("jti");

-- CreateIndex
CREATE INDEX "JwtBlacklist_expiresAt_idx" ON "JwtBlacklist"("expiresAt");

-- AddForeignKey
ALTER TABLE "JwtBlacklist" ADD CONSTRAINT "JwtBlacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
