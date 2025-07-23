import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { defineStepper } from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "better-auth";
import { useForm, useFormContext } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { PhoneInput } from "./phone-input";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

const identitySchema = z.object({
	name: z.string().min(2, "Name is required"),
	avatarUrl: z.string().url().optional(),
	bio: z.string().max(200).optional(),
	phone: z
		.string()
		.regex(/^\+?\d{10,15}$/, "Phone number must be valid")
		.refine(isValidPhoneNumber, "Invalid phone number"),
	gender: z.enum(["male", "female", "other"]).optional(),
});

const academicSchema = z.object({
	matricNo: z
		.string()
		.regex(/^[A-Z]{2,5}\/\d{2,4}\/\d{3,5}$/, "Invalid matric number format"), // e.g., CSC/21/1234
	faculty: z.string().min(2, "Faculty is required"),
	department: z.string().min(2, "Department is required"),
	level: z
		.number()
		.int()
		.min(100)
		.max(700)
		.refine(
			(val) => val % 100 === 0,
			"Level must be in hundreds (e.g., 100, 200)",
		),
	program: z.string().min(2, "Program is required"), // e.g., BSc, MSc, PhD
	modeOfStudy: z
		.enum(["full-time", "part-time", "distance"])
		.default("full-time"),
	isEligibleToVote: z.boolean(), // Only allow true
	hasAgreedToTerms: z.boolean(), // Must agree to terms
});

type IdentityFormValues = z.infer<typeof identitySchema>;
type AcademicFormValues = z.infer<typeof academicSchema>;

const IdentityForm = ({ user }: { user: User }) => {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<IdentityFormValues>();

	return (
		<div className="space-y-4 text-start">
			<div className="space-y-2">
				<label
					htmlFor={register("name").name}
					className="block text-sm font-medium text-primary"
				>
					Name
				</label>
				<Input
					id={register("name").name}
					{...register("name")}
					value={user.name}
					className="block w-full rounded-md border p-2"
				/>
				{errors.name && (
					<span className="text-sm text-destructive">
						{errors.name.message}
					</span>
				)}
			</div>
			<div className="space-y-2">
				<label
					htmlFor={register("bio").name}
					className="block text-sm font-medium text-primary"
				>
					Bio
				</label>
				<Textarea
					id={register("bio").name}
					{...register("bio")}
					className="block w-full rounded-md border p-2"
				/>
				{errors.bio && (
					<span className="text-sm text-destructive">{errors.bio.message}</span>
				)}
			</div>
			<div className="space-y-2">
				<label
					htmlFor={register("phone").name}
					className="block text-sm font-medium text-primary"
				>
					Phone Number
				</label>
				<PhoneInput
					id={register("phone").name}
					onChange={(value) => setValue("phone", value)}
					className="flex w-full rounded-md border p-2"
				/>
				{errors.phone && (
					<span className="text-sm text-destructive">
						{errors.phone.message}
					</span>
				)}
			</div>
			<div className="space-y-2">
				<label
					htmlFor={register("gender").name}
					className="block text-sm font-medium text-primary"
				>
					Gender
				</label>
				<Select
					onValueChange={(value) =>
						setValue("gender", value as IdentityFormValues["gender"])
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select a gender" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Gender</SelectLabel>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				{errors.gender && (
					<span className="text-sm text-destructive">
						{errors.gender.message}
					</span>
				)}
			</div>
		</div>
	);
};

function AcademicForm() {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<AcademicFormValues>();

	return (
		<ScrollArea className="h-[600px]">
			<div className="space-y-4 text-start">
				<div className="space-y-2">
					<label
						htmlFor={register("matricNo").name}
						className="block text-sm font-medium text-primary"
					>
						Matric No
					</label>
					<Input
						id={register("matricNo").name}
						{...register("matricNo")}
						className="block w-full rounded-md border p-2"
					/>
					{errors.matricNo && (
						<span className="text-sm text-destructive">
							{errors.matricNo.message}
						</span>
					)}
				</div>
				<div className="space-y-2">
					<label
						htmlFor={register("department").name}
						className="block text-sm font-medium text-primary"
					>
						Department
					</label>
					<Input
						id={register("department").name}
						{...register("department")}
						className="block w-full rounded-md border p-2"
					/>
					{errors.department && (
						<span className="text-sm text-destructive">
							{errors.department.message}
						</span>
					)}
				</div>
				<div className="space-y-2">
					<label
						htmlFor={register("faculty").name}
						className="block text-sm font-medium text-primary"
					>
						Faculty
					</label>
					<Input
						id={register("faculty").name}
						{...register("faculty")}
						className="block w-full rounded-md border p-2"
					/>
					{errors.faculty && (
						<span className="text-sm text-destructive">
							{errors.faculty.message}
						</span>
					)}
				</div>{" "}
				<div className="space-y-2">
					<label
						htmlFor={register("level").name}
						className="block text-sm font-medium text-primary"
					>
						Level
					</label>
					<Input
						id={register("level").name}
						{...register("level")}
						className="block w-full rounded-md border p-2"
					/>
					{errors.level && (
						<span className="text-sm text-destructive">
							{errors.level.message}
						</span>
					)}
				</div>{" "}
				<div className="space-y-2">
					<label
						htmlFor={register("program").name}
						className="block text-sm font-medium text-primary"
					>
						Program
					</label>
					<Input
						id={register("program").name}
						{...register("program")}
						className="block w-full rounded-md border p-2"
					/>
					{errors.program && (
						<span className="text-sm text-destructive">
							{errors.program.message}
						</span>
					)}
				</div>
				<div className="space-y-2">
					<label
						htmlFor={register("modeOfStudy").name}
						className="block text-sm font-medium text-primary"
					>
						Mode of Study
					</label>
					<Select
						onValueChange={(value) =>
							setValue(
								"modeOfStudy",
								value as AcademicFormValues["modeOfStudy"],
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a mode of study" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Mode of Study</SelectLabel>
								<SelectItem value="full-time">Full-time</SelectItem>
								<SelectItem value="part-time">Part-time</SelectItem>
								<SelectItem value="distance">Distance</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{errors.modeOfStudy && (
						<span className="text-sm text-destructive">
							{errors.modeOfStudy.message}
						</span>
					)}
				</div>
				<div className="space-y-2">
					<label
						htmlFor={register("isEligibleToVote").name}
						className="block text-sm font-medium text-primary"
					>
						Is Eligible to Vote
					</label>
					<Select
						onValueChange={(value) =>
							setValue("isEligibleToVote", Boolean(value))
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a is eligible to vote" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Is Eligible to Vote</SelectLabel>
								<SelectItem value="true">True</SelectItem>
								<SelectItem value="false">False</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{errors.isEligibleToVote && (
						<span className="text-sm text-destructive">
							{errors.isEligibleToVote.message}
						</span>
					)}
				</div>
				<div className="space-y-2">
					<label
						htmlFor={register("hasAgreedToTerms").name}
						className="block text-sm font-medium text-primary"
					>
						Has agreed to terms
					</label>
					<Select
						onValueChange={(value) =>
							setValue("hasAgreedToTerms", Boolean(value))
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a has agreed to terms" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Has agreed to terms</SelectLabel>
								<SelectItem value="true">True</SelectItem>
								<SelectItem value="false">False</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{errors.hasAgreedToTerms && (
						<span className="text-sm text-destructive">
							{errors.hasAgreedToTerms.message}
						</span>
					)}
				</div>
			</div>
		</ScrollArea>
	);
}

function CompleteComponent() {
	return <div className="text-center">Thank you! Your order is complete.</div>;
}

export const { Stepper, useStepper } = defineStepper(
	{
		id: "profile",
		title: "Profile",
		schema: identitySchema,
		Component: IdentityForm,
	},
	{
		id: "academic",
		title: "Academic",
		schema: academicSchema,
		Component: AcademicForm,
	},
	{
		id: "complete",
		title: "Complete",
		schema: z.object({}),
		Component: CompleteComponent,
	},
);

export function StepperWithForm({ user }: { user: User }) {
	return <FormStepperComponent user={user} />;
}

const FormStepperComponent = ({ user }: { user: User }) => {
	const methods = useStepper();

	const form = useForm({
		mode: "onTouched",
		resolver: zodResolver(methods.current.schema),
	});

	const onSubmit = (values: z.infer<typeof methods.current.schema>) => {
		alert(
			`Form values for step ${methods.current.id}: ${JSON.stringify(values)}`,
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<Stepper.Navigation className="md:hidden">
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
				{methods.switch({
					profile: ({ Component }) => <Component user={user} />,
					academic: ({ Component }) => <Component />,
					complete: ({ Component }) => <Component />,
				})}
				<Stepper.Controls>
					{!methods.isLast && (
						<Button
							variant="secondary"
							onClick={methods.prev}
							disabled={methods.isFirst}
						>
							Previous
						</Button>
					)}
					<Button
						type="submit"
						onClick={() => {
							if (methods.isLast) {
								return methods.reset();
							}
							methods.beforeNext(async () => {
								const valid = await form.trigger();
								if (!valid) return false;
								return true;
							});
						}}
					>
						{methods.isLast ? "Reset" : "Next"}
					</Button>
				</Stepper.Controls>
			</form>
		</Form>
	);
};
