ALTER TABLE "candidates-registration" DROP CONSTRAINT "candidates-registration_election_id_elections_id_fk";
--> statement-breakpoint
ALTER TABLE "candidates-registration" ADD COLUMN "election_unique_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "candidates-registration" ADD CONSTRAINT "candidates-registration_election_unique_id_elections_unique_id_fk" FOREIGN KEY ("election_unique_id") REFERENCES "public"."elections"("unique_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates-registration" DROP COLUMN "election_id";