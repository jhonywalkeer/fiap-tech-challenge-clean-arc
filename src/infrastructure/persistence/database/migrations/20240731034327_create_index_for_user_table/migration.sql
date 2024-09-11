-- CreateIndex
CREATE INDEX "user_social_security_number_idx" ON "user" USING HASH ("social_security_number");
