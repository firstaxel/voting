import { AuthCard } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/owner/auth/$pathname")({
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = Route.useParams();

	return (
		<div className="flex grow flex-col items-center justify-center gap-4 p-4">
			<AuthCard pathname={pathname} redirectTo="/onboarding" />
		</div>
	);
}
