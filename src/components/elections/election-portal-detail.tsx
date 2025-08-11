import type { ElectionWithRelations } from "@/types/election";
import {
	MotionHighlight,
	MotionHighlightItem,
} from "../animate-ui/effects/motion-highlight";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

import { format } from "date-fns";
import { Badge } from "../ui/badge";
import DepartmentList from "./department-list";

const ElectionPortalDetails = ({
	election,
}: { election: ElectionWithRelations }) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
			<MotionHighlight hover className="rounded-xl h-full">
				<Card className="bg-transparent h-full">
					<CardHeader>
						<CardTitle>Election Details</CardTitle>
						<CardDescription className="text-muted-foreground">
							View the details about the current election.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						<div>
							<h2 className="text-lg font-bold"> Name</h2>
							<p className="text-base">{election.electionName}</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Election Type</h3>
							<p className="text-base">{election.electionType}</p>
						</div>

						<div>
							<h3 className="text-lg font-bold">Description</h3>
							<p className="text-muted-foreground text-base">
								{election.description}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Responsible Body</h3>
							<p className="text-muted-foreground text-base">
								{election.responsibleBody}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Contact Email</h3>
							<p className="text-muted-foreground text-base">
								{election.contactEmail}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Academic Year</h3>
							<p className="text-muted-foreground text-base">
								{election.academicYear}
							</p>
						</div>
					</CardContent>
				</Card>

				<MotionHighlightItem className="h-fit">
					<Card className="bg-transparent">
						<CardHeader>
							<CardTitle>Election Dates</CardTitle>
							<CardDescription className="text-muted-foreground">
								View the dates and times of the current election.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-3">
							<div>
								<h2 className="text-lg font-bold">Registration Start Date</h2>
								<p className="text-base">
									{format(
										new Date(election.registrationStartDate),
										"dd/MM/yyyy",
									)}
								</p>
							</div>
							<div>
								<h2 className="text-lg font-bold">Registration End Date</h2>
								<p className="text-base">
									{format(new Date(election.registrationEndDate), "dd/MM/yyyy")}
								</p>
							</div>
							<div>
								<h2 className="text-lg font-bold">Voting Start Date</h2>
								<p className="text-base">
									{format(new Date(election.votingStartDate), "dd/MM/yyyy")}
								</p>
							</div>
							<div>
								<h2 className="text-lg font-bold">Voting End Date</h2>
								<p className="text-base">
									{format(new Date(election.votingEndDate), "dd/MM/yyyy")}
								</p>
							</div>
						</CardContent>
					</Card>
				</MotionHighlightItem>

				<MotionHighlightItem className="h-fit">
					<Card className="bg-transparent">
						<CardHeader>
							<CardTitle>Voter Eligibility Details</CardTitle>
							<CardDescription className="text-muted-foreground">
								View the eligibility requirements for voting.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-3">
							<div className="space-y-2">
								<h2 className="text-lg font-bold"> Eligible to Vote</h2>
								<p className="text-base">{election.enrollmentStatus}</p>
							</div>
							{election.specificDepartments && election.departments && (
								<div>
									<h2 className="text-lg font-bold">Departments</h2>
									<div className="flex flex-wrap gap-2">
										<DepartmentList departments={election.departments} />
									</div>
								</div>
							)}
							{election.academicLevelRequired && election.academicLevels && (
								<div className="space-y-2">
									<h2 className="text-lg font-bold">Academic Level</h2>
									<div className="flex flex-wrap gap-2">
										{election.academicLevels.map((academicLevel) => (
											<Badge
												className="p-2 text-sm capitalize"
												key={academicLevel}
											>
												{academicLevel}
											</Badge>
										))}
									</div>
								</div>
							)}

							{election.minCGPA && (
								<div>
									<h2 className="text-lg font-bold">Minimum CGPA</h2>
									<p className="text-base">{election.minCGPA}</p>
								</div>
							)}
						</CardContent>
					</Card>
				</MotionHighlightItem>
				<MotionHighlightItem className="h-fit">
					<Card className="bg-transparent">
						<CardHeader>
							<CardTitle>Election Security Settings</CardTitle>
							<CardDescription className="text-muted-foreground">
								View the security settings for the election.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-3">
							<div>
								<h2 className="text-lg font-bold">
									Two Factor Authentication (2FA)
								</h2>
								<p className="text-base">
									{election.requireTwoFactorAuth ? "Enabled" : "Disabled"}
								</p>
							</div>
							<div>
								<h2>
									Is the Voters Anonymous?
									<span className="text-muted-foreground text-xs">
										(Voters can be anonymous or not)
									</span>
								</h2>
								<p className="text-base">
									{election.voteAnonymity ? "Enabled" : "Disabled"}
								</p>
							</div>
						</CardContent>
					</Card>
				</MotionHighlightItem>
			</MotionHighlight>
		</div>
	);
};

export default ElectionPortalDetails;
