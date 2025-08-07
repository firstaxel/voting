import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useSession } from "@/hooks/auth-hooks";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useSession();

	if (!user) {
		return <RedirectToSignIn />;
	}

	return (
		<main>
			<main>
				<DashboardSidebar roleType="student">
					<div className="flex h-full w-full flex-1 flex-col    bg-white p-2 md:p-10  dark:bg-neutral-900">
						<Outlet />
					</div>
				</DashboardSidebar>
			</main>
		</main>
	);
}
