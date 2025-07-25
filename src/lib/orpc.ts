import { router } from "@/server/api/router";
import ip from "@arcjet/ip";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createRouterClient } from "@orpc/server";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getHeaders, getWebRequest } from "@tanstack/react-start/server";

const getORPCClient = createIsomorphicFn()
	.server(() =>
		createRouterClient(router, {
			context: () => {
				const request = getWebRequest() as Request;

				return {
					headers: getHeaders() as HeadersInit,
					request,
					ip: ip(request),
				};
			},
		}),
	)
	.client((): RouterClient<typeof router> => {
		const link = new RPCLink({
			url: `${window.location.origin}/api/rpc`,
		});

		return createORPCClient(link);
	});

export const client: RouterClient<typeof router> = getORPCClient();

export const orpcReactQuery = createTanstackQueryUtils(client);
