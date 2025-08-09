import DashboardHeader from "@/components/dashboard-header";
import ListElection from "@/components/elections/list-election";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/lib/orpc";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, PlusCircle } from "lucide-react";

export const Route = createFileRoute("/(platform)/admin/dashboard/elections/")({
	component: RouteComponent,
	loader: async () => {
		const elections = await client.election.get();

		return elections;
	},
});

function RouteComponent() {
	const elections = Route.useLoaderData();

	if (!elections) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loader2 className="size-12 animate-spin" />
			</div>
		);
	}

	if (elections.length < 1) {
		return (
			<section className="h-full w-full space-y-4">
				<DashboardHeader
					title="Elections"
					description="See the list of all the election you created"
					userButton={false}
				/>

				<div className="flex flex-col gap-4 items-center justify-center ">
					<h2 className="text-3xl font-bold">
						You don&apos;t have any elections.
					</h2>
					<Link to="/admin/dashboard/elections/new">
						<Card className="hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors duration-150">
							<CardContent className="h-full">
								<div className="flex flex-col items-center justify-center space-y-2 h-full">
									<PlusCircle className=" size-12 " />
									<p>Create New Election</p>
								</div>
							</CardContent>
						</Card>
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="space-y-4">
			<DashboardHeader
				title="Elections"
				description="See the list of all the election you created"
				userButton={false}
			/>

			<ListElection elections={elections} />
		</section>
	);
}
