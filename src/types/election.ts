import type schema from "@/database/schema";
import type {
	academicLevelEnum,
	candidate,
	electionAcademicLevels,
	electionAuthMethods,
	electionDepartments,
	elections,
	voters,
	votes,
} from "@/database/schema/election";
import type { ModelWithRelations } from "./drizzle";

export type AcademicLevelOption = {
	label: string;
	value: AcademicLevel;
};

export type AcademicLevel = (typeof academicLevelEnum.enumValues)[number];

export const ACADEMIC_LEVEL_OPTIONS: AcademicLevelOption[] = [
	{ label: "100 Level", value: "100 Level" },
	{ label: "200 Level", value: "200 Level" },
	{ label: "300 Level", value: "300 Level" },
	{ label: "400 Level", value: "400 Level" },
	{ label: "500 Level & Above", value: "500 Level" },
	{ label: "Postgraduate", value: "Postgraduate" },
	{ label: "Other", value: "Other" },
];

export type SecurityOption =
	| "University Email OTP"
	| "SMS OTP"
	| "Password"
	| "Biometric";

// --- Infer Types (for convenience in your application code) ---
export type Election = typeof elections.$inferSelect; // for select queries
export type NewElection = typeof elections.$inferInsert; // for insert queries

export type Candidate = typeof candidate.$inferSelect;
export type NewCandidate = typeof candidate.$inferInsert;

export type Voter = typeof voters.$inferSelect;
export type NewVoter = typeof voters.$inferInsert;

export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;

export type ElectionDepartment = typeof electionDepartments.$inferSelect;
export type NewElectionDepartment = typeof electionDepartments.$inferInsert;

export type ElectionAcademicLevel = typeof electionAcademicLevels.$inferSelect;
export type NewElectionAcademicLevel =
	typeof electionAcademicLevels.$inferInsert;

export type ElectionAuthMethod = typeof electionAuthMethods.$inferSelect;
export type NewElectionAuthMethod = typeof electionAuthMethods.$inferInsert;

export type ElectionModel = typeof schema.elections;

export type ElectionWithRelations = ModelWithRelations<
	typeof schema,
	ElectionModel
>;
