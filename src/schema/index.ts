import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod/v4";

export const identitySchema = z.object({
	name: z.string().min(2, "Name is required"),
	avatarUrl: z
		.array(z.custom<File>())
		.min(1, "Please select at least one file")
		.max(2, "Please select up to 2 files")
		.refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
			message: "File size must be less than 5MB",
			path: ["files"],
		}),
	bio: z.string().max(200).optional(),
	phone: z
		.string()
		.regex(/^\+?\d{10,15}$/, "Phone number must be valid")
		.refine(isValidPhoneNumber, "Invalid phone number"),
	gender: z.enum(["male", "female", "other"]),
});

export const academicSchema = z.object({
	matricNo: z
		.string()
		.regex(/^[A-Z]{2,5}\/\d{2,4}\/\d{3,5}$/, "Invalid matric number format"), // e.g., CSC/21/1234
	faculty: z.string().min(2, "Faculty is required"),
	department: z.string().min(2, "Department is required"),
	level: z
		.string()

		.refine(
			(val) => Number(val) % 100 === 0,
			"Level must be in hundreds (e.g., 100, 200)",
		),
	program: z.string().min(2, "Program is required"), // e.g., BSc, MSc, PhD
	modeOfStudy: z
		.enum(["full-time", "part-time", "distance"])
		.default("full-time"),
	isEligibleToVote: z
		.boolean("Please tick check to confirm eligibility")
		.default(false), // Only allow true
	hasAgreedToTerms: z
		.boolean("Please tick check to agreeing to the terms")
		.default(false), // Must agree to terms
});

export const profileSchema = z.object({
	...identitySchema.shape,
	...academicSchema.shape,
});

export type Profile = z.infer<typeof profileSchema>;
