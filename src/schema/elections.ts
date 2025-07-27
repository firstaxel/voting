import { z } from "zod";

// --- Utility Schemas ---

// Common non-empty string validation
const nonEmptyString = z.string().min(1, "This field cannot be empty.");

// Validating URLs (optional for some cases)
const urlSchema = z.url("Invalid URL format").optional().or(z.literal(""));

// Validating dates, ensuring they are valid Date objects
const dateSchema = z.coerce.date({
	error: (issue) => {
		if (issue.code === "invalid_type") {
			return "Invalid date format"; // Directly return the message string
		}
		return issue.defaultError; // Fallback to Zod's default error for other issue types
	},
});

// --- Step 1: Election Basics (University Specific) ---
export const ElectionBasicsSchema = z.object({
	electionName: nonEmptyString.max(
		255,
		"Election name cannot exceed 255 characters.",
	),
	// Changed electionType to reflect student body roles or election purposes
	electionType: z.enum(
		[
			"Student Union Government (SUG)",
			"Departmental Election",
			"Faculty Election",
			"Club/Association Election",
			"Other",
		],
		{
			error: "Please select an election type.",
		},
	),
	description: z.string().optional(), // Can be empty or not provided
	// Renamed organization to responsibleBody for university context
	responsibleBody: nonEmptyString.max(
		255,
		"Responsible body name cannot exceed 255 characters. (e.g., Electoral Committee, Dean of Students Affairs)",
	),
	contactEmail: z.string().email("Invalid email address."),
	// Added academicYear for clarity
	academicYear: nonEmptyString
		.regex(
			/^\d{4}\/\d{4}$/,
			"Academic year must be in YYYY/YYYY format (e.g., 2024/2025)",
		)
		.optional(),
});

export type ElectionBasicsFormData = z.infer<typeof ElectionBasicsSchema>;

// --- Step 2: Dates & Times (No change, as dates are universal) ---
export const ElectionDatesTimesSchema = z
	.object({
		registrationStartDate: dateSchema,
		registrationEndDate: dateSchema,
		votingStartDate: dateSchema,
		votingEndDate: dateSchema,
		// Optional: Results release date
		resultsReleaseDate: dateSchema.optional(),
	})
	.check((ctx) => {
		// Validate logical flow of dates
		if (ctx.value.registrationEndDate <= ctx.value.registrationStartDate) {
			ctx.issues.push({
				code: "custom",
				input: ctx.value,
				message: "Registration end date must be after start date.",
				path: ["registrationEndDate"],
			});
		}
		if (ctx.value.votingStartDate <= ctx.value.registrationEndDate) {
			ctx.issues.push({
				code: "custom",
				input: ctx.value,
				message: "Voting start date must be after registration end date.",
				path: ["votingStartDate"],
			});
		}
		if (ctx.value.votingEndDate <= ctx.value.votingStartDate) {
			ctx.issues.push({
				code: "custom",
				input: ctx.value,
				message: "Voting end date must be after voting start date.",
				path: ["votingEndDate"],
			});
		}
		if (
			ctx.value.resultsReleaseDate &&
			ctx.value.resultsReleaseDate <= ctx.value.votingEndDate
		) {
			ctx.issues.push({
				code: "custom",
				input: ctx.value,
				message: "Results release date must be after voting end date.",
				path: ["resultsReleaseDate"],
			});
		}
	});

export type ElectionDatesTimesFormData = z.infer<
	typeof ElectionDatesTimesSchema
>;

// --- Step 3: Candidate Details ---
export const CandidateSchema = z.object({
	fullName: nonEmptyString,
	// Changed partyAffiliation to academicDepartment for university context
	academicDepartment: z.string().optional(), // e.g., "Computer Science", "Law"
	// Added studentId for university context
	studentId: nonEmptyString
		.regex(/^[A-Z0-9]+$/, "Invalid Student ID format.")
		.max(50, "Student ID too long.")
		.optional(),
	bio: z
		.string()
		.max(1000, "Biography cannot exceed 1000 characters.")
		.optional(),
	imageUrl: urlSchema, // Optional URL for candidate image
	email: z.email("Invalid email address").optional().or(z.literal("")), // University email
	phoneNumber: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (E.164)")
		.optional()
		.or(z.literal("")),
	// Added desiredPosition for clarity
	desiredPosition: nonEmptyString.max(
		100,
		"Position name cannot exceed 100 characters.",
	),
});

export const CandidateDetailsSchema = z.object({
	candidates: z
		.array(CandidateSchema)
		.min(1, "At least one candidate is required."),
});

export type CandidateDetailsFormData = z.infer<typeof CandidateDetailsSchema>;

// --- Step 4: Voter Eligibility Criteria (University Specific) ---
export const VoterEligibilitySchema = z
	.object({
		// Enrollment status (e.g., currently enrolled, alumni)
		enrollmentStatus: z.enum(
			["Currently Enrolled", "Alumni", "Staff", "Faculty"],
			{
				error: "Please select enrollment status.",
			},
		),
		// Specific academic programs/departments/faculties
		specificDepartments: z.boolean(),
		departments: z.array(nonEmptyString).optional(), // List of department names

		// Academic level (e.g., Year 1, Year 2, Postgraduate)
		academicLevelRequired: z.boolean(),
		academicLevels: z
			.array(
				z.enum([
					"Year 1",
					"Year 2",
					"Year 3",
					"Year 4",
					"Year 5+",
					"Postgraduate",
					"Other",
				]),
			)
			.optional(),

		// Hall of Residence
		hallOfResidenceRequired: z.boolean(),
		hallNames: z.array(nonEmptyString).optional(),

		// Minimum CGPA (optional for some elections)
		minCGPA: z
			.number()
			.min(0.0, "CGPA cannot be negative.")
			.max(5.0, "CGPA cannot exceed 5.0.")
			.optional(),

		// Other custom criteria, e.g., "must have paid current session dues"
		customCriteriaEnabled: z.boolean(),
		customCriteriaDescription: z.string().optional(),
	})
	.check(({ issues, value }) => {
		// Conditional validation for specific departments
		if (value.specificDepartments) {
			if (!value.departments || value.departments.length === 0) {
				issues.push({
					code: "custom",
					input: value,
					message:
						"At least one department must be specified if specific departments are required.",
					path: ["departments"],
				});
			}
		} else {
			// If not specific departments, then departments array should be empty
			if (value.departments && value.departments.length > 0) {
				issues.push({
					code: "custom",
					input: value,
					message:
						"Departments should not be specified if not requiring specific departments.",
					path: ["departments"],
				});
			}
		}

		// Conditional validation for academic levels
		if (value.academicLevelRequired) {
			if (!value.academicLevels || value.academicLevels.length === 0) {
				issues.push({
					code: "custom",
					input: value,
					message: "At least one academic level must be selected if required.",
					path: ["academicLevels"],
				});
			}
		} else {
			if (value.academicLevels && value.academicLevels.length > 0) {
				issues.push({
					code: "custom",
					input: value,
					message:
						"Academic levels should not be selected if not requiring specific levels.",
					path: ["academicLevels"],
				});
			}
		}

		if (value.customCriteriaEnabled && !value.customCriteriaDescription) {
			issues.push({
				code: "custom",
				input: value,
				message: "Description is required if custom criteria is enabled.",
				path: ["customCriteriaDescription"],
			});
		} else if (
			!value.customCriteriaEnabled &&
			value.customCriteriaDescription
		) {
			issues.push({
				code: "custom",
				input: value,
				message:
					"Custom criteria description should not be set if custom criteria is not enabled.",
				path: ["customCriteriaEnabled"],
			});
		}
	});

export type VoterEligibilityFormData = z.infer<typeof VoterEligibilitySchema>;

// --- Step 6: Security & Verification Settings (No major change, but re-numbered) ---
export const SecuritySettingsSchema = z.object({
	// Voter authentication methods - could be university specific (e.g., student portal SSO)
	authMethods: z
		.array(
			z.enum([
				"University Email OTP",
				"Student Portal SSO",
				"SMS OTP",
				"Password",
				"Biometric",
				"Other",
			]),
		)
		.min(1, "At least one authentication method must be selected."),
	requireTwoFactorAuth: z.boolean(),

	// Anonymity settings
	voteAnonymity: z.enum(
		["Fully Anonymous", "Partially Anonymous", "Non-Anonymous"],
		{
			error: "Please select a vote anonymity setting.",
		},
	),
	showLiveResults: z.boolean(), // Can be enabled/disabled by admin

	// Ballot security
	uniqueBallotPerVoter: z.boolean(),
	ballotEncryptionEnabled: z.boolean(),

	// Auditability
	auditTrailEnabled: z.boolean().optional(),
	blockchainIntegration: z.boolean().optional(), // If using blockchain for auditability
});

export type SecuritySettingsFormData = z.infer<typeof SecuritySettingsSchema>;

// --- Combined Schema for Final Submission ---
export const FullElectionFormSchema = z.object({
	...ElectionBasicsSchema.shape,
	...ElectionDatesTimesSchema.shape,
	...CandidateDetailsSchema.shape,
	...VoterEligibilitySchema.shape,
	...SecuritySettingsSchema.shape,
});

export type FullElectionFormData = z.infer<typeof FullElectionFormSchema>;
