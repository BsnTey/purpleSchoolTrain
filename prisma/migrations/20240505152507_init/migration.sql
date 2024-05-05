/*
  Warnings:

  - You are about to drop the column `user_uuid` on the `post` table. All the data in the column will be lost.
  - Added the required column `userUuid` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_user_uuid_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "user_uuid",
ADD COLUMN     "userUuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
