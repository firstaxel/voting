import type { Candidate } from "@/types/election";

const ListCandidates = ({
	candidates,
}: {
	candidates?: Candidate[];
}) => {
	if (candidates?.length < 0) {
		<div className="flex items-center justify-center">
			Create new Candidate form
		</div>;
	}
	return <div>ListCandidates</div>;
};

export default ListCandidates;
