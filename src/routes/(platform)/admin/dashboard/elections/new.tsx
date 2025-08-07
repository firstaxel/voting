import {
	ElectionsForm,
	Stepper,
} from "@/components/elections/create-elections-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(platform)/admin/dashboard/elections/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Stepper.Provider
			className="space-y-4"
			variant={"horizontal"}
			labelOrientation={"vertical"}
		>
			<main>
				<div className="w-full max-w-2xl px-4 mx-auto h-full">
					<div className="flex flex-col items-start justify-center h-full space-y-4">
						<div className="space-y-3">
							<h1 className="text-3xl font-bold ">Complete your profile</h1>
							<p className="text-sm text-muted-foreground">
								Please fill out the form below to complete your profile, scroll
								where necessary.
							</p>
						</div>
						<div className="w-full">
							<ElectionsForm />
						</div>
					</div>
				</div>
			</main>
		</Stepper.Provider>
	)
}
