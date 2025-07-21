import { db } from "@/database";
import * as schema from "@/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema,
	}),

	emailAndPassword: {
		enabled: true,
	},
	plugins: [reactStartCookies()],
	advanced: {
		cookiePrefix: "voting",
	},
});
