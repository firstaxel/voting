import AdminDashboard from "@/components/admin-dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/admin/")({
	component: RouteComponent,
	pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
	return <AdminDashboard />;
}
