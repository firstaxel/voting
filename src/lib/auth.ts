import * as authSchema from "@/database/schema/auth";
import env from "@/env.config";
import { betterAuth } from "better-auth";
import { type DB, drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

export const auth = (db: DB) =>
	betterAuth({
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
				onboarded: {
					type: "boolean",
					defaultValue: false,
					input: false,
				},
			},
		},

		plugins: [reactStartCookies()],
		advanced: {
			cookiePrefix: "voting",
			ipAddress: {
				ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare specific header example
			},
		},
		secret: env.BETTER_AUTH_SECRET,
	});
