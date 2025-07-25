import { defineEnv } from "envin";
import { z } from "zod";

const env = defineEnv({
	/**
	 * Specify environment variables that can be accessed on both client and server.
	 * You'll get a type error if you try to access a server-side env var on the client.
	 */
	shared: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},

	/**
	 * Specify your server-side environment variables schema here.
	 * This way you can ensure the app isn't built with invalid env vars.
	 */
	server: {
		DATABASE_URL: z.url(),
		AWS_REGION: z.string(),
		AWS_ENDPOINT: z.string(),
		AWS_ACCESS_KEY_ID: z.string(),
		AWS_SECRET_ACCESS_KEY: z.string(),
		S3_BUCKET_NAME: z.string(),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "VITE_PUBLIC_",

	/**
	 * Specify your client-side environment variables schema here.
	 * For them to be exposed to the client, prefix them with your framework's public prefix.
	 */
	client: {},

	/**
	 * What object holds the environment variables at runtime.
	 * This is usually `process.env` or `import.meta.env`.
	 */
	env: process.env,
});

export default env;
