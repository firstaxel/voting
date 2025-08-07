import DashboardHeader from "@/components/dashboard-header";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/owner/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<DashboardHeader />{" "}
		</div>
	)
}
