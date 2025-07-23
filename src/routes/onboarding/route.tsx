import StepperNavigation from "@/components/stepper-navigation";
import { Stepper } from "@/components/stepper-with-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useIsMobile();
	return (
		<Stepper.Provider
			className="space-y-4"
			variant={isMobile ? "horizontal" : "vertical"}
			labelOrientation={isMobile ? "vertical" : "horizontal"}
		>
			<main>
				<StepperLayout>
					<Outlet />
				</StepperLayout>
			</main>
		</Stepper.Provider>
	);
}

const StepperLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-screen">
			<div className="flex h-full flex-col md:flex-row">
				<div className="hidden md:block border-r w-[300px] rounded-r-2xl border-neutral-200  dark:border-neutral-700 p-4 relative">
					<div className="flex  items-center justify-center h-full ">
						<StepperNavigation />
					</div>
				</div>

				{children}
			</div>
		</div>
	);
};
