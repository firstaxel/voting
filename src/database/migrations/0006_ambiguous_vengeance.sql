CREATE TYPE "public"."roles" AS ENUM('admin', 'students', 'owner');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'students'::"public"."roles";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";