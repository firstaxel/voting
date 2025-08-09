import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main>
			<DashboardSidebar roleType="student">
				<div className="flex h-full w-full flex-1 flex-col    bg-white p-2 md:p-10  dark:bg-neutral-900">
					<Outlet />
				</div>
			</DashboardSidebar>
		</main>
	);
}
