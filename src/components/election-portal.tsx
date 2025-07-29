import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/animate-ui/components/tabs";
import type { ElectionWithRelations } from "@/types/election";
import ElectionPortalDetails from "./elections/election-portal-detail";

export default function ElectionPortal({
	electionDetail,
}: { electionDetail: ElectionWithRelations }) {
	return (
		<Tabs defaultValue="tab-1">
			<TabsList className="h-[50px] rounded-none border-b bg-transparent p-0 w-full justify-normal">
				<TabsTrigger
					value="tab-1"
					className="h-full data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
				>
					Election Details
				</TabsTrigger>
				<TabsTrigger
					value="tab-2"
					className="h-full data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
				>
					Candidates
				</TabsTrigger>
				<TabsTrigger
					value="tab-3"
					className="h-full data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
				>
					Voters
				</TabsTrigger>
			</TabsList>
			<TabsContent value="tab-1">
				<ElectionPortalDetails election={electionDetail} />
			</TabsContent>
			<TabsContent value="tab-2">
				<p className="text-muted-foreground p-4 text-center text-xs">
					Content for Tab 2
				</p>
			</TabsContent>
			<TabsContent value="tab-3">
				<p className="text-muted-foreground p-4 text-center text-xs">
					Content for Tab 3
				</p>
			</TabsContent>
		</Tabs>
	);
}
