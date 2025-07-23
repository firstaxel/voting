import { StepperWithForm } from "@/components/stepper-with-form";
import { RedirectToSignIn, useAuthenticate } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuthenticate();

	if (!user) {
		return <RedirectToSignIn />;
	}
	return (
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
					<StepperWithForm user={user} />
				</div>
			</div>
		</div>
	);
}
