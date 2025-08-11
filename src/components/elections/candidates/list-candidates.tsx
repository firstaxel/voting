import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/election";
import { UserX } from "lucide-react";
import CandidateLink from "./candidate-link";

const ListCandidates = ({
	candidates,
}: {
	candidates?: Candidate[];
}) => {
	if (!candidates) {
		return (
			<section className="h-[50vh] w-full space-y-4">
				<div className="flex flex-col gap-4 items-center justify-center h-full">
					<UserX className="size-32 " />
					<h3>No candidates have registered for this election</h3>
					<div className="flex md:flex-row flex-col gap-4 items-center justify-center">
						<Button size={"lg"}>Create candidate</Button>
						<CandidateLink
							trigger={
								<Button variant="outline" size={"lg"}>
									Create registration link
								</Button>
							}
						/>
					</div>
				</div>
			</section>
		);
	}

	return <div>ListCandidates</div>;
};

export default ListCandidates;
