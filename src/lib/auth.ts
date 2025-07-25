import { db } from "@/database";
import * as authSchema from "@/database/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema: authSchema,
	}),

	emailAndPassword: {
		enabled: true,
	},
	plugins: [reactStartCookies()],
	advanced: {
		cookiePrefix: "voting",
	},
});
