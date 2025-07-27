ALTER TABLE "users" ADD COLUMN "approved_to_be_admin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" text;