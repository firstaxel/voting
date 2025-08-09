import postgres from "postgres";
import schema from "./schema/";

import env from "@/env.config";
import { drizzle } from "drizzle-orm/postgres-js";

const sql = postgres(env.DATABASE_URL, {
	max: 5,
	fetch_types: false,
	prepare: false,
});
export const db = drizzle(sql, {
	schema: {
		...schema,
	},
});
