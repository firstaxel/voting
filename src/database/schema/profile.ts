import { users } from "@/auth-schema";
import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Define Enums
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const modeOfStudyEnum = pgEnum("mode_of_study", [
	"full-time",
	"part-time",
	"distance",
]);

export const profile = pgTable("profile", {
	id: uuid("id").primaryKey().unique(), // UUID or shortid
	name: varchar("name", { length: 100 }).notNull(),
	avatarUrl: text("avatar_url"),
	bio: varchar("bio", { length: 200 }),
	phone: varchar("phone", { length: 20 }).notNull(),

	gender: genderEnum("gender"),

	matricNo: varchar("matric_no", { length: 30 }).notNull().unique(),
	faculty: varchar("faculty", { length: 100 }).notNull(),
	department: varchar("department", { length: 100 }).notNull(),
	level: varchar("level").notNull(), // Validated at app level to be 100–700 and divisible by 100
	program: varchar("program").notNull(),
	modeOfStudy: modeOfStudyEnum("mode_of_study").notNull(),

	isEligibleToVote: boolean("is_eligible_to_vote").notNull(),
	hasAgreedToTerms: boolean("has_agreed_to_terms").notNull(),

	completed: boolean("completed").notNull(),

	userId: varchar("userId").notNull(),
});

export const userRelations = relations(users, ({ one }) => ({
	profile: one(profile, {
		fields: [users.id],
		references: [profile.userId],
	}),
}));
