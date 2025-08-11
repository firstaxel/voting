DROP TABLE "election_academic_levels" CASCADE;--> statement-breakpoint
DROP TABLE "election_auth_methods" CASCADE;--> statement-breakpoint
DROP TABLE "election_departments" CASCADE;--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "departments" text[];--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "auth_methods" text[];--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "academic_levels" text[];