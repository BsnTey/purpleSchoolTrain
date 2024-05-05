-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "name" TEXT,
    "birth_day" TIMESTAMP(3),
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "post" (
    "uuid" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uuid" UUID NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
