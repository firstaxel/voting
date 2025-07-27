import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
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
import { orpcReactQuery } from "@/lib/orpc";
import { fuoyePrograms } from "@/lib/university.constants";
import { type Profile, academicSchema, identitySchema } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { User } from "better-auth";
import { Loader2 } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { AvatarUploader } from "./avatar-upload";
import { PhoneInput } from "./phone-input";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

type IdentityFormValues = z.infer<typeof identitySchema>;
type AcademicFormValues = z.infer<typeof academicSchema>;

const IdentityForm = ({ user }: { user: User }) => {
	const {
		register,
		getValues,
		setValue,
		control,
		formState: { errors },
	} = useFormContext<IdentityFormValues>();

	return (
		<ScrollArea className="h-[50vh]">
			<div className="space-y-4 text-start">
				<FormField
					control={control}
					name="avatarUrl"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Profile Picture</FormLabel>

							<AvatarUploader
								user={user}
								value={field.value}
								onChange={field.onChange}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="space-y-2">
					<label
						id={register("name").name}
						htmlFor={register("name").name}
						className="block text-sm font-medium text-primary"
					>
						Name
					</label>
					<Input
						id={register("name").name}
						{...register("name")}
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
						id={register("bio").name}
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
						<span className="text-sm text-destructive">
							{errors.bio.message}
						</span>
					)}
				</div>
				<div className="space-y-2">
					<label
						id={register("phone").name}
						htmlFor={register("phone").name}
						className="block text-sm font-medium text-primary"
					>
						Phone Number
					</label>
					<PhoneInput
						id={register("phone").name}
						value={getValues("phone")}
						onChange={(value) => setValue("phone", value)}
						className="flex w-full rounded-md border p-2"
					/>
					{errors.phone && (
						<span className="text-sm text-destructive">
							{errors.phone.message}
						</span>
					)}
				</div>
				<FormField
					control={control}
					name="gender"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Gender</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select your gender" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Gender</SelectLabel>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</ScrollArea>
	);
};

function AcademicForm() {
	const {
		register,

		control,
		formState: { errors },
	} = useFormContext<AcademicFormValues>();

	return (
		<ScrollArea className="h-[60vh]">
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

					<FormField
						control={control}
						name="modeOfStudy"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Mode of Study</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a mode of study" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{fuoyePrograms.map((program) => (
												<SelectItem key={program} value={program}>
													{program}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>
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
				</div>
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
				</div>
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
				<FormField
					control={control}
					name="modeOfStudy"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Mode of Study</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a mode of study" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Mode of Study</SelectLabel>
										<SelectItem value="full-time">Full-time</SelectItem>
										<SelectItem value="part-time">Part-time</SelectItem>
										<SelectItem value="distance">Distance</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="isEligibleToVote"
					render={({ field }) => (
						<FormItem>
							<div className=" flex   items-center gap-3">
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
								<FormLabel> Is eligible to vote</FormLabel>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="hasAgreedToTerms"
					render={({ field }) => (
						<FormItem>
							<div className=" flex items-center  gap-3">
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
								<FormLabel> Has agreed to terms</FormLabel>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</ScrollArea>
	);
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
);

export function OnboardingForm({ user }: { user: User }) {
	return <FormStepperComponent user={user} />;
}

const FormStepperComponent = ({ user }: { user: User }) => {
	const methods = useStepper();

	const form = useForm({
		mode: "onTouched",
		resolver: zodResolver(methods.current.schema),
		defaultValues: {
			name: user.name,
			hasAgreedToTerms: false,
			isEligibleToVote: false,
		},
	});

	const values = form.getValues() as Profile;

	const { mutate, isPending } = useMutation(
		orpcReactQuery.profile.create.mutationOptions(),
	);

	const onSubmit = () => {
		mutate(values, {
			onSuccess: () => {
				toast.success("Profile created successfully", {
					description: "You can now vote on the polls!",
				});
			},
			onError: (error) => {
				console.log(error);
			},
		});
	};

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
				})}
				<Stepper.Controls>
					{!methods.isFirst && (
						<Button
							variant="secondary"
							onClick={methods.prev}
							disabled={methods.isFirst || isPending}
						>
							Previous
						</Button>
					)}
					<Button
						type={"submit"}
						onClick={() => {
							methods.beforeNext(async () => {
								const valid = await form.trigger();
								if (!valid) return false;
								return true;
							});
						}}
						disabled={isPending}
					>
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							<>{methods.isLast ? "Onboard" : "Next"}</>
						)}
					</Button>
				</Stepper.Controls>
			</form>
		</Form>
	);
};
