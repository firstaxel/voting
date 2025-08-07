import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main>
			<SidebarProvider>
				<Outlet />
			</SidebarProvider>
		</main>
	);
}
