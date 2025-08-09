import schema from "@/database/schema";
import env from "@/env.config";
import { auth } from "@/lib/auth";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { drizzle } from "drizzle-orm/postgres-js";

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
	GET: ({ request }) => {
		const db = drizzle(env.DATABASE_URL, {
			schema: {
				...schema,
			},
		});
		return auth(db).handler(request);
	},
	POST: ({ request }) => {
		const db = drizzle(env.DATABASE_URL, {
			schema: {
				...schema,
			},
		});
		return auth(db).handler(request);
	},
});
