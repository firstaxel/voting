CREATE TYPE "public"."academic_level" AS ENUM('100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'Postgraduate', 'Other');--> statement-breakpoint
CREATE TYPE "public"."auth_method" AS ENUM('University Email OTP', 'SMS OTP', 'Password', 'Biometric');--> statement-breakpoint
CREATE TYPE "public"."election_type" AS ENUM('Student Union Government (SUG)', 'Departmental Election', 'Faculty Election', 'Other');--> statement-breakpoint
CREATE TYPE "public"."enrollment_status" AS ENUM('Currently Enrolled', 'Alumni', 'Staff', 'Faculty');--> statement-breakpoint
CREATE TYPE "public"."vote_anonymity" AS ENUM('Fully Anonymous', 'Partially Anonymous', 'Non-Anonymous');--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"election_id" integer NOT NULL,
	"user_id" varchar(255),
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"manifesto" text,
	"position" varchar(255),
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "election_academic_levels" (
	"election_id" integer NOT NULL,
	"academic_level" "academic_level" NOT NULL,
	CONSTRAINT "election_academic_levels_election_id_academic_level_pk" PRIMARY KEY("election_id","academic_level")
);
--> statement-breakpoint
CREATE TABLE "election_auth_methods" (
	"election_id" integer NOT NULL,
	"auth_method" "auth_method" NOT NULL,
	CONSTRAINT "election_auth_methods_election_id_auth_method_pk" PRIMARY KEY("election_id","auth_method")
);
--> statement-breakpoint
CREATE TABLE "election_departments" (
	"election_id" integer NOT NULL,
	"department_name" varchar(255) NOT NULL,
	CONSTRAINT "election_departments_election_id_department_name_pk" PRIMARY KEY("election_id","department_name")
);
--> statement-breakpoint
CREATE TABLE "elections" (
	"id" serial PRIMARY KEY NOT NULL,
	"election_name" varchar(255) NOT NULL,
	"election_type" "election_type" NOT NULL,
	"description" text,
	"responsible_body" varchar(255) NOT NULL,
	"contact_email" varchar(255) NOT NULL,
	"academic_year" varchar(9),
	"registration_start_date" timestamp NOT NULL,
	"registration_end_date" timestamp NOT NULL,
	"voting_start_date" timestamp NOT NULL,
	"voting_end_date" timestamp NOT NULL,
	"results_release_date" timestamp,
	"enrollment_status" "enrollment_status" NOT NULL,
	"specific_departments" boolean DEFAULT false NOT NULL,
	"academic_level_required" boolean DEFAULT false NOT NULL,
	"min_cgpa" numeric(3, 2),
	"require_two_factor_auth" boolean DEFAULT true NOT NULL,
	"vote_anonymity" "vote_anonymity" DEFAULT 'Fully Anonymous' NOT NULL,
	"show_live_results" boolean DEFAULT false NOT NULL,
	"unique_ballot_per_voter" boolean DEFAULT true NOT NULL,
	"ballot_encryption_enabled" boolean DEFAULT true NOT NULL,
	"audit_trail_enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voters" (
	"id" serial PRIMARY KEY NOT NULL,
	"election_id" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"has_voted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "voters_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "voters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"election_id" integer NOT NULL,
	"voter_id" integer,
	"candidate_id" integer NOT NULL,
	"cast_at" timestamp DEFAULT now() NOT NULL,
	"encrypted_payload" text
);
--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "election_academic_levels" ADD CONSTRAINT "election_academic_levels_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "election_auth_methods" ADD CONSTRAINT "election_auth_methods_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "election_departments" ADD CONSTRAINT "election_departments_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voters" ADD CONSTRAINT "voters_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_election_id_elections_id_fk" FOREIGN KEY ("election_id") REFERENCES "public"."elections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_voter_id_voters_id_fk" FOREIGN KEY ("voter_id") REFERENCES "public"."voters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;