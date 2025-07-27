import { db } from "@/database";
import * as authSchema from "@/database/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { reactStartCookies } from "better-auth/react-start";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema: authSchema,
	}),

	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			roles: {
				type: "string",
				required: true,
				defaultValue: "student",
				input: false,
			},
			approvedToBeAdmin: {
				type: "boolean",
				defaultValue: false,
				input: false,
			},
		},
	},
	hooks: {
		// before(inputContext) {
		// },
	},
	plugins: [reactStartCookies()],
	databaseHooks: {
		user: {
			create: {
				after: async (user, context) => {
					if (context) {
						if (
							context.headers?.get("referer")?.includes("/admin/auth/sign-up")
						) {
							await db
								.update(authSchema.users)
								.set({
									roles: "admin",
								})
								.where(eq(authSchema.users.id, user.id));
						}

						if (
							context.headers?.get("referer")?.includes("/owner/auth/sign-up")
						) {
							await db
								.update(authSchema.users)
								.set({
									roles: "owner",
									approvedToBeAdmin: true,
									adminKey: uuid(),
								})
								.where(eq(authSchema.users.id, user.id));
						}
					}
				},
			},
		},
		session: {
			create: {
				before: async (session, context) => {
					const [user] = await db
						.select()
						.from(authSchema.users)
						.where(eq(authSchema.users.id, session.userId));
					if (context) {
						if (context.path === "/sign-in/email") {
							if (
								context.headers
									?.get("referer")
									?.includes("/owner/auth/sign-in") &&
								user.roles !== "owner"
							) {
								throw new APIError("UNAUTHORIZED", {
									message: "User must be a owner to sign in.",
								});
							}

							if (
								context.headers?.get("referer")?.includes("/admin/auth/sign-in")
							) {
								if (user.roles === "student") {
									throw new APIError("UNAUTHORIZED", {
										message: "User must be an admin or owner to sign in.",
									});
								}
							}
						}
						return {
							data: session,
						};
					}
				},
			},
		},
	},
	advanced: {
		cookiePrefix: "voting",
	},
});
