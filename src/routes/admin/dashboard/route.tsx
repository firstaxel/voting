import { SidebarLayout } from "@/components/sidebar-layout";
import { useSession } from "@/hooks/auth-hooks";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
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
			<SidebarLayout roleType="admin">
				<div className="flex flex-1">
					<div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
						<Outlet />
					</div>
				</div>
			</SidebarLayout>
		</main>
	);
}
