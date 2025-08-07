import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ElectionWithRelations } from "@/types/election";
import React from "react";
import ElectionPortalDetails from "./elections/election-portal-detail";

export default function ElectionPortal({
	electionDetail,
}: { electionDetail: ElectionWithRelations }) {
	const electionTab = [
		{
			name: "Elections Details",
			value: "election-details",
		},
		{
			name: "Candidates",
			value: "election-candidates",
		},
		{
			name: "Voters",
			value: "election-voters",
		},
	];

	const [value, setValue] = React.useState(electionTab[0].value);
	return (
		<Tabs value={value} onValueChange={setValue}>
			<TabsList className="h-[50px] rounded-none border-b bg-transparent p-0 w-full justify-normal">
				{electionTab.map((election) => (
					<TabsTrigger
						key={election.value}
						value={election.value}
						className="h-full"
					>
						{election.name}
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent
				value="election-details"
				className="h-full
			"
			>
				<div className="h-full">
					<ElectionPortalDetails election={electionDetail} />
				</div>
			</TabsContent>
			<TabsContent value="election-candidates">
				<div className="h-full">
					<ElectionPortalDetails election={electionDetail} />
				</div>
			</TabsContent>
			<TabsContent value="election-voters">
				<div className="h-full">
					<ElectionPortalDetails election={electionDetail} />
				</div>
			</TabsContent>
		</Tabs>
	);
}
