import { useSidebar } from "@/components/animate-ui/radix/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useSession } from "@/hooks/auth-hooks";
import { RedirectToSignIn, UserButton } from "@daveyplate/better-auth-ui";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/admin/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useSession();

	if (!user) {
		return <RedirectToSignIn />;
	}

	if (user?.roles === "student") {
		return <Navigate to="/dashboard" replace />;
	}

	if (!user.approvedToBeAdmin) {
		return <Navigate to="/admin/approval" replace />;
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
