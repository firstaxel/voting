import type { Election } from "@/types/election";
import { MotionHighlight } from "../animate-ui/effects/motion-highlight";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

import { format } from "date-fns";

const ElectionPortalDetails = ({ election }: { election: Election }) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<MotionHighlight hover className="rounded-xl">
				<Card className="bg-transparent">
					<CardHeader>
						<CardTitle>Election Details</CardTitle>
						<CardDescription className="text-muted-foreground">
							View the details about the current election.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						<div>
							<h2 className="text-base"> Name</h2>
							<span className="text-sm">{election.electionName}</span>
						</div>
						<div>
							<h3 className="text-base">Election Type</h3>
							<span className="text-sm">{election.electionType}</span>
						</div>

						<div>
							<h3 className="text-base">Description</h3>
							<p className="text-muted-foreground text-sm">
								{election.description}
							</p>
						</div>
						<div>
							<h3 className="text-base">Responsible Body</h3>
							<p className="text-muted-foreground text-sm">
								{election.responsibleBody}
							</p>
						</div>
						<div>
							<h3 className="text-base">Contact Email</h3>
							<p className="text-muted-foreground text-sm">
								{election.contactEmail}
							</p>
						</div>
						<div>
							<h3 className="text-base">Academic Year</h3>
							<p className="text-muted-foreground text-sm">
								{election.academicYear}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-transparent">
					<CardHeader>
						<CardTitle>Election Dates</CardTitle>
						<CardDescription className="text-muted-foreground">
							View the dates and times of the current election.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						<div>
							<h2 className="text-base">Registration Start Date</h2>
							<span className="text-sm">
								{format(new Date(election.registrationStartDate), "dd/MM/yyyy")}
							</span>
						</div>
						<div>
							<h2 className="text-base">Registration End Date</h2>
							<span className="text-sm">
								{format(new Date(election.registrationEndDate), "dd/MM/yyyy")}
							</span>
						</div>
						<div>
							<h2 className="text-base">Voting Start Date</h2>
							<span className="text-sm">
								{format(new Date(election.votingStartDate), "dd/MM/yyyy")}
							</span>
						</div>
						<div>
							<h2 className="text-base">Voting End Date</h2>
							<span className="text-sm">
								{format(new Date(election.votingEndDate), "dd/MM/yyyy")}
							</span>
						</div>
					</CardContent>
				</Card>
			</MotionHighlight>
		</div>
	);
};

export default ElectionPortalDetails;
