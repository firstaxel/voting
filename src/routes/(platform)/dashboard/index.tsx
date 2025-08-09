import DashboardHeader from "@/components/dashboard-header";
import { useSession } from "@/hooks/auth-hooks";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useSession();
	const navigate = useNavigate({
		from: Route.fullPath,
	});

	if (!user) {
		return <RedirectToSignIn />;
	}

	if (!user.onboarded) {
		navigate({
			to: "/onboarding",
			from: Route.fullPath,
			params: {
				"redirect-to": `${location.pathname}${location.search}`,
			},
		});
	}
	return (
		<div>
			<DashboardHeader />
		</div>
	);
}
