import { EditElectionForm } from "@/components/elections/edit-elections-form";
import { client } from "@/lib/orpc";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(platform)/admin/elections/$electionId/edit/",
)({
	component: RouteComponent,
	loader: async ({ params }) => {
		const election = await client.election.getByElectionId({
			electionId: params.electionId,
		})

		return election;
	},
});

function RouteComponent() {
	const election = Route.useLoaderData();
	const navigate = useNavigate();

	if (!election) {
		return navigate({
			to: "/admin/dashboard/elections",
			replace: true,
		})
	}
	return (
		<div>
			<EditElectionForm election={election} />
		</div>
	)
}
