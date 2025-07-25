import { auth } from "@/lib/auth";
import { ORPCError } from "@orpc/client";
import { os } from "@orpc/server";
export const base = os.$context<{
	headers: HeadersInit;
	request: Request;
}>();

const authMiddleware = base.middleware(async ({ context, next }) => {
	const session = await auth.api.getSession({
		headers: context.request.headers,
	});

	if (!session) {
		throw new ORPCError("Unauthorized", { status: 401 });
	}

	const result = await next({
		context: {
			...context,
			session,
		},
	});

	// Execute logic after the handler

	return result;
});

export const api = base.use(authMiddleware);
