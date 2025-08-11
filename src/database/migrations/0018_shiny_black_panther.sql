CREATE TABLE "candidate" (
	"id" serial PRIMARY KEY NOT NULL,
	"unique_id" varchar(255),
	"candidate_registration_id" varchar NOT NULL,
	"user_id" varchar(255),
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"manifesto" text,
	"position" varchar(255),
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "candidate_unique_id_unique" UNIQUE("unique_id")
);
--> statement-breakpoint
CREATE TABLE "candidates-registration" (
	"id" varchar(255),
	"auto_approval" boolean DEFAULT true,
	"election_id" integer NOT NULL,
	CONSTRAINT "candidates-registration_id_unique" UNIQUE("id")
);

--> statement-breakpoint
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_candidate_registration_id_candidates-registration_id_fk" FOREIGN KEY ("candidate_registration_id") REFERENCES "public"."candidates-registration"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates-registration" ADD CONSTRAINT "candidates-registration_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_candidate_id_candidate_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidate"("id") ON DELETE cascade ON UPDATE no action;
