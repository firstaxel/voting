ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_unique";--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "level" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "user_id";