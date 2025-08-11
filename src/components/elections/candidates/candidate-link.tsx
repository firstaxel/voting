import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "@/components/ui/credenza";
const CandidateLink = ({ trigger }: { trigger: React.ReactNode }) => {
	return (
		<Credenza>
			<CredenzaTrigger asChild>{trigger}</CredenzaTrigger>
			<CredenzaContent>
				<CredenzaHeader>
					<CredenzaTitle>Candidate Registration</CredenzaTitle>
					<CredenzaDescription>
						Create a candidate registration link to allow people to register as
						candidates for this election.
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody className="p-8">
					This component is built using shadcn/ui&apos;s dialog and drawer
					component, which is built on top of Vaul.
				</CredenzaBody>
				{/* <CredenzaFooter>

				</CredenzaFooter> */}
			</CredenzaContent>
		</Credenza>
	);
};

export default CandidateLink;
