import { router } from "@/server/api/router";
import ip from "@arcjet/ip";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { createServerFileRoute } from "@tanstack/react-start/server";

const handler = new RPCHandler(router, {
	plugins: [
		new CORSPlugin({
			origin: (origin) => origin,
			allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
		}),
	],
});

async function handle({ request }: { request: Request }) {
	const { response } = await handler.handle(request, {
		prefix: "/api/rpc",
		context: {
			headers: request.headers,
			request,
			ip: ip(request),
		},
	});

	return response ?? new Response("Not Found", { status: 404 });
}

export const ServerRoute = createServerFileRoute("/api/rpc/$").methods({
	HEAD: handle,
	GET: handle,
	POST: handle,
	PUT: handle,
	PATCH: handle,
	DELETE: handle,
});
