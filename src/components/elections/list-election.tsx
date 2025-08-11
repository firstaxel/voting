import type { Election } from "@/types/election";
import { Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

const ListElection = ({ elections }: { elections: Election[] }) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<Link to="/admin/elections/new">
				<Card className="hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors duration-150 hfukk">
					<CardContent className="h-full">
						<div className="flex flex-col items-center justify-center space-y-2 h-full">
							<PlusCircle className=" size-12 " />
							<p>Create New Election</p>
						</div>
					</CardContent>
				</Card>
			</Link>
			{elections.map((election) => (
				<Link
					to="/admin/elections/$electionId"
					params={{
						electionId: election.uniqueId as string,
					}}
					key={election.uniqueId}
				>
					<Card className="hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors duration-150">
						<CardHeader>
							<div className="flex  items-center space-x-2">
								<Avatar className="size-14">
									<AvatarImage
										src={election.electionImage as string}
										className="object-cover"
									/>
									<AvatarFallback className="flex items-center  justify-center h-full w-full border rounded-full">
										<span className="text-xl font-bold text-primary">
											{election.electionName.slice(0, 1)}
										</span>
									</AvatarFallback>
								</Avatar>

								<div className="flex flex-col ">
									<h2 className="text-base font-bold text-muted-foreground">
										{election.electionName}
									</h2>
									{election.description && (
										<p className="text-sm text-muted-foreground">
											{election.description}
										</p>
									)}
									<p className="text-sm text-muted-foreground">
										{election.electionType}
									</p>
								</div>
							</div>
						</CardHeader>

						<CardContent>
							<div className="flex items-center justify-between space-x-2">
								<div>
									<p className="text-sm text-muted-foreground">
										Starting by: {election.votingStartDate.toLocaleDateString()}
									</p>
									<p className="text-sm text-muted-foreground">
										Ending by: {election.votingEndDate.toLocaleDateString()}
									</p>
								</div>

								<Badge>
									{election.votingEndDate.toLocaleDateString() ===
									new Date().toLocaleDateString()
										? "Ended"
										: "Open"}
								</Badge>
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default ListElection;
