import DashboardHeader from "@/components/dashboard-header";
import { useSession } from "@/hooks/auth-hooks";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useSession();

	if (!user) {
		return <RedirectToSignIn />;
	}

	return (
		<div>
			<DashboardHeader />
		</div>
	);
}
