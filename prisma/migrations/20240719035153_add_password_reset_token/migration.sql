-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordResetToken" SET DEFAULT '',
ALTER COLUMN "passwordResetTokenExpire" SET DEFAULT CURRENT_TIMESTAMP;
