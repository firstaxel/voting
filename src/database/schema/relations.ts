// --- Relations for Relational Queries ---

import { relations } from "drizzle-orm";
import {
	candidates,
	electionAcademicLevels,
	electionAuthMethods,
	electionDepartments,
	elections,
	voters,
	votes,
} from "./election";

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
