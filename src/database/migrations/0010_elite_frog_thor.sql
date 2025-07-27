ALTER TABLE "users" ALTER COLUMN "roles" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT 'student'::text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('admin', 'student', 'owner');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT 'student'::"public"."roles";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" SET DATA TYPE "public"."roles" USING "roles"::"public"."roles";