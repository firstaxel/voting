import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useSession } from "@/hooks/auth-hooks";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/owner/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isLoading, user } = useSession();
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (user?.roles !== "owner") {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<main>
			<DashboardSidebar roleType="admin">
				<div className="flex h-full w-full flex-1 flex-col    bg-white p-2 md:p-10  dark:bg-neutral-900">
					<Outlet />
				</div>
			</DashboardSidebar>
		</main>
	);
}
