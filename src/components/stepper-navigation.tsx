import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Stepper, useStepper } from "./stepper-with-form";

const StepperNavigation = () => {
	const methods = useStepper();

	const form = useForm({
		mode: "onTouched",
		resolver: zodResolver(methods.current.schema),
	});

	return (
		<Stepper.Navigation>
			{methods.all.map((step) => (
				<Stepper.Step
					key={step.id}
					of={step.id}
					type={step.id === methods.current.id ? "submit" : "button"}
					onClick={async () => {
						const valid = await form.trigger();
						if (!valid) return;
						methods.goTo(step.id);
					}}
				>
					<Stepper.Title>{step.title}</Stepper.Title>
				</Stepper.Step>
			))}
		</Stepper.Navigation>
	);
};

export default StepperNavigation;
