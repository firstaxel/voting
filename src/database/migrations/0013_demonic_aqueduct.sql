ALTER TABLE "candidates" ADD COLUMN "unique_id" varchar(255);--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "unique_id" varchar(255);--> statement-breakpoint
ALTER TABLE "voters" ADD COLUMN "unique_id" varchar(255);--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_unique_id_unique" UNIQUE("unique_id");--> statement-breakpoint
ALTER TABLE "elections" ADD CONSTRAINT "elections_unique_id_unique" UNIQUE("unique_id");--> statement-breakpoint
ALTER TABLE "voters" ADD CONSTRAINT "voters_unique_id_unique" UNIQUE("unique_id");