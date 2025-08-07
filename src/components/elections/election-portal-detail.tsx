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

const ElectionPortalDetails = ({
	election,
}: { election: ElectionWithRelations }) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full">
			<MotionHighlight hover className="rounded-xl h-full">
				<Card className="bg-transparent">
					<CardHeader>
						<CardTitle>Election Details</CardTitle>
						<CardDescription className="text-muted-foreground">
							View the details about the current election.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						<div>
							<h2 className="text-lg font-bold"> Name</h2>
							<p className="text-sm">{election.electionName}</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Election Type</h3>
							<p className="text-sm">{election.electionType}</p>
						</div>

						<div>
							<h3 className="text-lg font-bold">Description</h3>
							<p className="text-muted-foreground text-sm">
								{election.description}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Responsible Body</h3>
							<p className="text-muted-foreground text-sm">
								{election.responsibleBody}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Contact Email</h3>
							<p className="text-muted-foreground text-sm">
								{election.contactEmail}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-bold">Academic Year</h3>
							<p className="text-muted-foreground text-sm">
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
								<p className="text-sm">
									{format(
										new Date(election.registrationStartDate),
										"dd/MM/yyyy",
									)}
								</p>
							</div>
							<div>
								<h2 className="text-lg font-bold">Registration End Date</h2>
								<p className="text-sm">
									{format(new Date(election.registrationEndDate), "dd/MM/yyyy")}
								</p>
							</div>
							<div>
								<h2 className="text-lg font-bold">Voting Start Date</h2>
								<p className="text-sm">
									{format(new Date(election.votingStartDate), "dd/MM/yyyy")}
								</p>
							</div>
							<div>
								<h2 className="text-lg font-bold">Voting End Date</h2>
								<p className="text-sm">
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
							<div>
								<h2 className="text-lg font-bold">People Eligible to Vote</h2>
								<p className="text-sm">{election.enrollmentStatus}</p>
							</div>
							{election.specificDepartments && election.electionDepartments && (
								<div>
									<h2 className="text-lg font-bold">Departments</h2>
									{election.electionDepartments.map((department) => (
										<Badge key={department.departmentName}>
											{department.departmentName}
										</Badge>
									))}
								</div>
							)}
							{election.academicLevelRequired &&
								election.electionAcademicLevels && (
									<div>
										<h2 className="text-lg font-bold">Academic Level</h2>
										{election.electionAcademicLevels.map((academicLevel) => (
											<Badge key={academicLevel.academicLevel}>
												{academicLevel.academicLevel}
											</Badge>
										))}
									</div>
								)}

							{election.minCGPA && (
								<div>
									<h2 className="text-lg font-bold">Minimum CGPA</h2>
									<p className="text-sm">{election.minCGPA}</p>
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
								<p className="text-sm">
									{election.requireTwoFactorAuth ? "Enabled" : "Disabled"}
								</p>
							</div>
							<div>
								<h2>
									Is the Voters Anonymous?
									<span className="text-muted-foreground text-sm">
										(Voters can be anonymous or not)
									</span>
								</h2>
								<p className="text-sm">
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
