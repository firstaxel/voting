import { users } from "@/auth-schema";
import { relations, sql } from "drizzle-orm";
import {
	boolean,
	integer,
	numeric,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

// --- Enums ---
export const electionTypeEnum = pgEnum("election_type", [
	"Student Union Government (SUG)",
	"Departmental Election",
	"Faculty Election",
	"Club/Association Election",
	"Other",
]);

export const enrollmentStatusEnum = pgEnum("enrollment_status", [
	"Currently Enrolled",
	"Alumni",
	"Staff",
	"Faculty",
]);

export const academicLevelEnum = pgEnum("academic_level", [
	"100 Level",
	"200 Level",
	"300 Level",
	"400 Level",
	"500 Level",
	"Postgraduate",
	"Other",
]);

export const authMethodEnum = pgEnum("auth_method", [
	"University Email OTP",
	"SMS OTP",
	"Password",
	"Biometric",
]);

export const voteAnonymityEnum = pgEnum("vote_anonymity", [
	"Fully Anonymous",
	"Partially Anonymous",
	"Non-Anonymous",
]);

// --- Base Timestamps for reusability ---
export const timestamps = {
	createdAt: timestamp("created_at").notNull().default(sql`now()`),
	updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
};

// --- Tables ---

export const elections = pgTable("elections", {
	id: serial("id").primaryKey(),
	uniqueId: varchar("unique_id", { length: 255 })
		.unique()
		.$defaultFn(() => uuid()),
	electionName: varchar("election_name", { length: 255 }).notNull(),
	electionType: electionTypeEnum("election_type").notNull(),
	description: text("description"),
	responsibleBody: varchar("responsible_body", { length: 255 }).notNull(),
	contactEmail: varchar("contact_email", { length: 255 }).notNull(),
	academicYear: varchar("academic_year", { length: 9 }), // YYYY/YYYY format

	// Dates & Times
	registrationStartDate: timestamp("registration_start_date", {
		mode: "date",
	}).notNull(),
	registrationEndDate: timestamp("registration_end_date", {
		mode: "date",
	}).notNull(),
	votingStartDate: timestamp("voting_start_date", { mode: "date" }).notNull(),
	votingEndDate: timestamp("voting_end_date", { mode: "date" }).notNull(),
	resultsReleaseDate: timestamp("results_release_date", { mode: "date" }),

	// Voter Eligibility
	enrollmentStatus: enrollmentStatusEnum("enrollment_status").notNull(),
	specificDepartments: boolean("specific_departments").notNull().default(false),
	academicLevelRequired: boolean("academic_level_required")
		.notNull()
		.default(false),
	minCGPA: numeric("min_cgpa", { precision: 3, scale: 2, mode: "number" }), // e.g., 3.50

	// Security & Verification
	requireTwoFactorAuth: boolean("require_two_factor_auth")
		.notNull()
		.default(true),
	voteAnonymity: voteAnonymityEnum("vote_anonymity")
		.notNull()
		.default("Fully Anonymous"),
	showLiveResults: boolean("show_live_results").notNull().default(false),
	uniqueBallotPerVoter: boolean("unique_ballot_per_voter")
		.notNull()
		.default(true),
	ballotEncryptionEnabled: boolean("ballot_encryption_enabled")
		.notNull()
		.default(true),
	auditTrailEnabled: boolean("audit_trail_enabled").notNull().default(true),

	...timestamps,
});

export const candidates = pgTable("candidates", {
	id: serial("id").primaryKey(),
	uniqueId: varchar("unique_id", { length: 255 })
		.unique()
		.$defaultFn(() => uuid()),
	electionId: integer("election_id")
		.notNull()
		.references(() => elections.id, { onDelete: "cascade" }),
	userId: varchar("user_id", { length: 255 }).references(() => users.id, {
		onDelete: "cascade",
	}), // Assuming a user ID from an external auth system, or make it serial if users are managed internally
	email: varchar("email", { length: 255 }).notNull(), // Email used for invitation
	name: varchar("name", { length: 255 }), // Candidate's actual name
	manifesto: text("manifesto"),
	position: varchar("position", { length: 255 }),
	approved: boolean("approved").notNull().default(false), // Admin approval status
	...timestamps,
});

export const voters = pgTable("voters", {
	id: serial("id").primaryKey(),
	uniqueId: varchar("unique_id", { length: 255 })
		.unique()
		.$defaultFn(() => uuid()),
	electionId: integer("election_id")
		.notNull()
		.references(() => elections.id, { onDelete: "cascade" }),
	userId: varchar("user_id", { length: 255 }).unique().notNull(), // Unique ID for the voter (e.g., student ID, staff ID)
	email: varchar("email", { length: 255 }).unique().notNull(), // Voter's email
	hasVoted: boolean("has_voted").notNull().default(false),
	// You might store other eligibility data here if not dynamic (e.g., pre-fetched dept, academic level)
	...timestamps,
});

export const votes = pgTable("votes", {
	id: serial("id").primaryKey(),
	electionId: integer("election_id")
		.notNull()
		.references(() => elections.id, { onDelete: "cascade" }),
	voterId: integer("voter_id") // Nullable if 'Fully Anonymous'
		.references(() => voters.id, { onDelete: "set null" }),
	candidateId: integer("candidate_id")
		.notNull()
		.references(() => candidates.id, { onDelete: "cascade" }),
	castAt: timestamp("cast_at").notNull().default(sql`now()`),
	// Additional fields for auditing or encrypted payload if needed
	encryptedPayload: text("encrypted_payload"), // If ballotEncryptionEnabled
});

// --- Junction Tables for Many-to-Many Relationships ---

// Election <-> Department (if specificDepartments is true)
export const electionDepartments = pgTable(
	"election_departments",
	{
		electionId: integer("election_id")
			.notNull()
			.references(() => elections.id, { onDelete: "cascade" }),
		departmentName: varchar("department_name", { length: 255 }).notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.electionId, t.departmentName] }),
	}),
);

// Election <-> Academic Level (if academicLevelRequired is true)
export const electionAcademicLevels = pgTable(
	"election_academic_levels",
	{
		electionId: integer("election_id")
			.notNull()
			.references(() => elections.id, { onDelete: "cascade" }),
		academicLevel: academicLevelEnum("academic_level").notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.electionId, t.academicLevel] }),
	}),
);

// Election <-> Auth Method (many-to-many as multiple auth methods can be selected)
export const electionAuthMethods = pgTable(
	"election_auth_methods",
	{
		electionId: integer("election_id")
			.notNull()
			.references(() => elections.id, { onDelete: "cascade" }),
		authMethod: authMethodEnum("auth_method").notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.electionId, t.authMethod] }),
	}),
);

export const electionsRelations = relations(elections, ({ many }) => ({
	candidates: many(candidates),
	voters: many(voters),
	votes: many(votes),
	electionDepartments: many(electionDepartments),
	electionAcademicLevels: many(electionAcademicLevels),
	electionAuthMethods: many(electionAuthMethods),
}));

export const candidatesRelations = relations(candidates, ({ one }) => ({
	election: one(elections, {
		fields: [candidates.electionId],
		references: [elections.id],
	}),
	// If a candidate can have multiple positions or be associated with specific roles, you might add more here
}));

export const votersRelations = relations(voters, ({ one, many }) => ({
	election: one(elections, {
		fields: [voters.electionId],
		references: [elections.id],
	}),
	votes: many(votes), // A voter can cast multiple votes if multi-vote is allowed (uncommon in typical elections)
}));

export const votesRelations = relations(votes, ({ one }) => ({
	election: one(elections, {
		fields: [votes.electionId],
		references: [elections.id],
	}),
	voter: one(voters, {
		fields: [votes.voterId],
		references: [voters.id],
	}),
	candidate: one(candidates, {
		fields: [votes.candidateId],
		references: [candidates.id],
	}),
}));

export const electionDepartmentsRelations = relations(
	electionDepartments,
	({ one }) => ({
		election: one(elections, {
			fields: [electionDepartments.electionId],
			references: [elections.id],
		}),
		// If you had a 'departments' table, you'd link it here
	}),
);

export const electionAcademicLevelsRelations = relations(
	electionAcademicLevels,
	({ one }) => ({
		election: one(elections, {
			fields: [electionAcademicLevels.electionId],
			references: [elections.id],
		}),
	}),
);

export const electionAuthMethodsRelations = relations(
	electionAuthMethods,
	({ one }) => ({
		election: one(elections, {
			fields: [electionAuthMethods.electionId],
			references: [elections.id],
		}),
	}),
);
