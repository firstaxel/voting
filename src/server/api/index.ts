import { auth } from "@/lib/auth";
import { opts, rateLimiterRedis } from "@/lib/ratelimit";
import { ORPCError } from "@orpc/client";
import { os } from "@orpc/server";
import type { ResponseHeadersPluginContext } from "@orpc/server/plugins";

interface ORPCContext extends ResponseHeadersPluginContext {
	headers: HeadersInit;
	request: Request;
	ip: string;
}

export const base = os.$context<ORPCContext>();

const authMiddleware = base.middleware(async ({ context, next }) => {
	const session = await auth.api.getSession({
		headers: context.request.headers,
	});

	if (!session) {
		throw new ORPCError("Unauthorized", { status: 401 });
	}

	const result = await next({
		context: {
			userId: session.user.id,
			...session,
		},
	});

	return result;
});

export const rateLimiterMiddleware = base
	.$context<{
		ip: string;
		userId?: string;
		resHeaders?: Headers;
	}>()
	.middleware(async ({ context, next }) => {
		const key = context.userId ? context.userId : context.ip;
		const pointsToConsume = context.userId ? 1 : 30;
		const rateLimiterRes = await rateLimiterRedis
			.consume(key, pointsToConsume)
			.then(async (res) => res)
			.catch((_) => {
				throw new ORPCError("Too many requests", { status: 429 });
			});

		context.resHeaders?.set(
			"Retry-After",
			String(rateLimiterRes.msBeforeNext / 1000),
		);
		context.resHeaders?.set("X-RateLimit-Limit", String(opts.points));
		context.resHeaders?.set(
			"X-RateLimit-Remaining",
			String(rateLimiterRes.remainingPoints),
		);
		context.resHeaders?.set(
			"X-RateLimit-Reset",
			String(Math.ceil((Date.now() + rateLimiterRes.msBeforeNext) / 1000)),
		);

		return next({
			context: {
				rateLimiterRes,
			},
		});
	});
export const publicProcedure = base.use(rateLimiterMiddleware);

export const privateProcedure = base
	.use(authMiddleware)
	.use(rateLimiterMiddleware);
