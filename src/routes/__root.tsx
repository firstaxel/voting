import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import appCss from "../styles/globals.css?url";

import HydrationProvider from "@/hydration-provider.tsx";
import { Providers } from "@/providers.tsx";
import type { QueryClient } from "@tanstack/react-query";

import "@fontsource/montserrat/400.css";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: () => (
		<RootDocument>
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
			<TanStackQueryLayout />
		</RootDocument>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					name="viewport"
					content="initial-scale=1, viewport-fit=cover, width=device-width"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="oklch(1 0 0)"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="oklch(0.145 0 0)"
				/>

				<HeadContent />
			</head>

			<body>
				<Providers>
					<HydrationProvider>
						<div className="flex min-h-svh flex-col ">{children}</div>
					</HydrationProvider>
				</Providers>

				<Scripts />
			</body>
		</html>
	);
}
