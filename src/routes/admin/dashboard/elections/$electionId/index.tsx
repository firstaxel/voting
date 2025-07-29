import DashboardHeader from "@/components/dashboard-header";
import ElectionPortal from "@/components/election-portal";
import { client } from "@/lib/orpc";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard/elections/$electionId/")(
	{
		component: RouteComponent,
		loader: async ({ params }) => {
			const res = await client.election.get({
				electionId: params.electionId,
			});

			return res;
		},
		pendingComponent: () => {
			return (
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="animate-spin size-12" />
				</div>
			);
		},
	},
);

function RouteComponent() {
	const response = Route.useLoaderData();

	if (!response) return <div>Loading...</div>;
	return (
		<div>
			<DashboardHeader
				title={response.electionName}
				userButton={false}
				description={
					response.description
						? response.description
						: "View the details about the current election."
				}
			/>

			<ElectionPortal electionDetail={response} />
		</div>
	);
}
