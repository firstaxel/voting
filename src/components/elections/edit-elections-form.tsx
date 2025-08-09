import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { defineStepper } from "@/components/ui/stepper";
import { orpcReactQuery } from "@/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { fuoyePrograms } from "@/data/university.constants";
import { cn } from "@/lib/utils";
import {
	type ElectionBasicsFormData,
	ElectionBasicsSchema,
	type ElectionDatesTimesFormData,
	ElectionDatesTimesSchema,
	type FullElectionFormData,
	type SecuritySettingsFormData,
	SecuritySettingsSchema,
	type VoterEligibilityFormData,
	VoterEligibilitySchema,
} from "@/schema/elections";
import {
	ACADEMIC_LEVEL_OPTIONS,
	type Election,
	type ElectionWithRelations,
	type SecurityOption,
} from "@/types/election";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { AvatarUploader } from "../avatar-upload";
import { MultiSelect } from "../multiple-select";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

const ElectionBasisForm = ({
	election,
}: {
	election: Election;
}) => {
	const form = useFormContext<ElectionBasicsFormData>();

	return (
		<ScrollArea className="h-[60vh]">
			<div className="space-y-4">
				<h2 className="text-2xl font-bold mb-4"> Election Information</h2>

				<FormField
					control={form.control}
					name="electionImage"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Election Picture</FormLabel>

							<AvatarUploader
								value={field.value}
								onChange={field.onChange}
								image={election.electionImage as string}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="electionName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Election Name</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., SUG Presidential Election"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The official name of this election.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="electionType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Election Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select an election type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Student Union Government (SUG)">
										Student Union Government (SUG)
									</SelectItem>
									<SelectItem value="Departmental Election">
										Departmental Election
									</SelectItem>
									<SelectItem value="Faculty Election">
										Faculty Election
									</SelectItem>

									<SelectItem value="Club/Association Election">
										Club/Association Election
									</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Categorize the purpose or scope of this election.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Election Description (Optional)</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Provide a brief overview or purpose of the election..."
									className="resize-y"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A short description visible to voters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="responsibleBody"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Responsible Body/Committee</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., Electoral Committee, Dean of Students Affairs"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The entity overseeing this election.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="contactEmail"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contact Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="election.committee@university.edu"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Primary email for inquiries related to this election.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="academicYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Academic Year (Optional)</FormLabel>
							<FormControl>
								<Input placeholder="e.g., 2024/2025" {...field} />
							</FormControl>
							<FormDescription>
								The academic year this election pertains to.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</ScrollArea>
	);
};

const ElectionDatesTimesForm = () => {
	const form = useFormContext<ElectionDatesTimesFormData>();

	return (
		<ScrollArea className="h-[60vh]">
			<div className="space-y-4">
				<h2 className="text-2xl font-bold mb-4">Step 2: Dates & Times</h2>

				{/* Registration Start Date */}
				<FormField
					control={form.control}
					name="registrationStartDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Voter Registration Start Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild className="w-full">
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										autoFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								When voters can begin to register.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Registration End Date */}
				<FormField
					control={form.control}
					name="registrationEndDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Voter Registration End Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild className="w-full">
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										autoFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>When voter registration closes.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Voting Start Date */}
				<FormField
					control={form.control}
					name="votingStartDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Voting Start Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild className="w-full">
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>When voting officially begins.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Voting End Date */}
				<FormField
					control={form.control}
					name="votingEndDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Voting End Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild className="w-full">
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>When voting officially ends.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Results Release Date (Optional) */}
				<FormField
					control={form.control}
					name="resultsReleaseDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Results Release Date (Optional)</FormLabel>
							<Popover>
								<PopoverTrigger asChild className="w-full">
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[280px] justify-start text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										autoFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								When election results will be publicly released.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</ScrollArea>
	);
};

const VoterEligibilityForm = () => {
	const form = useFormContext<VoterEligibilityFormData>();

	// --- Watch fields for conditional rendering ---
	const watchSpecificDepartments = form.watch("specificDepartments");
	const watchAcademicLevelRequired = form.watch("academicLevelRequired");

	const customCriteriaEnabled = form.watch("customCriteriaEnabled");

	return (
		<ScrollArea className="h-[60vh] py-4">
			<div className="space-y-4">
				<h2 className="text-2xl font-bold mb-4">
					Step 4: Voter Eligibility Criteria
				</h2>

				<FormField
					control={form.control}
					name="enrollmentStatus"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Voter Enrollment Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Currently Enrolled">
										Currently Enrolled
									</SelectItem>
									<SelectItem value="Alumni">Alumni</SelectItem>
									<SelectItem value="Staff">Staff</SelectItem>
									<SelectItem value="Faculty">Faculty</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Define the primary eligibility status for voters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Conditional Field: Specific Departments */}
				<FormField
					control={form.control}
					name="specificDepartments"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Require Specific Departments?</FormLabel>
								<FormDescription>
									If checked, only voters from specified departments can
									participate.
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				{watchSpecificDepartments && (
					<FormField
						control={form.control}
						name="departments"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Allowed Departments</FormLabel>
								<FormControl>
									<MultiSelect
										options={fuoyePrograms}
										onValueChange={field.onChange}
										defaultValue={field.value}
										placeholder="Select departments eligible"
										variant="inverted"
										animation={2}
										maxCount={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Conditional Field: Academic Level Required */}
				<FormField
					control={form.control}
					name="academicLevelRequired"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Require Specific Academic Levels?</FormLabel>
								<FormDescription>
									If checked, only voters from specified academic levels can
									participate.
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				{watchAcademicLevelRequired && (
					<FormField
						control={form.control}
						name="academicLevels"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Allowed Academic Levels</FormLabel>
								<FormControl>
									<MultiSelect
										options={ACADEMIC_LEVEL_OPTIONS}
										onValueChange={field.onChange}
										defaultValue={field.value}
										placeholder="Select departments eligible"
										variant="inverted"
										animation={2}
										maxCount={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Minimum CGPA */}
				<FormField
					control={form.control}
					name="minCGPA"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Minimum CGPA (Optional)</FormLabel>
							<FormControl>
								<Input
									type="number"
									step="0.01"
									placeholder="e.g., 3.50"
									{...field}
									onChange={(e) =>
										field.onChange(
											e.target.value === ""
												? undefined
												: Number.parseFloat(e.target.value),
										)
									}
									value={field.value === undefined ? "" : field.value} // Handle undefined for number input
								/>
							</FormControl>
							<FormDescription>
								Specify a minimum Cumulative Grade Point Average for voters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="customCriteriaEnabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Enable Custom Criteria</FormLabel>
								<FormDescription>
									Enable custom criteria to allow voters to participate based on
									their academic level.
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{customCriteriaEnabled && (
					<FormField
						control={form.control}
						name="customCriteriaDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your custom criteria</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
			</div>
		</ScrollArea>
	);
};

const SecuritySettingsForm = () => {
	const form = useFormContext<SecuritySettingsFormData>();

	return (
		<ScrollArea className="h-[60vh]">
			<div className="space-y-4">
				<h2 className="text-2xl font-bold mb-4">
					Step 5: Security & Verification Settings
				</h2>

				<FormField
					control={form.control}
					name="authMethods"
					render={() => (
						<FormItem>
							<FormLabel>Voter Authentication Methods</FormLabel>
							<div className="space-y-2">
								{[
									"University Email OTP",
									"SMS OTP",
									"Password",
									"Biometric",
								].map((method) => (
									<FormField
										key={method}
										control={form.control}
										name="authMethods"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value?.includes(
															method as SecurityOption,
														)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([
																		...(field.value || []),
																		method,
																	])
																: field.onChange(
																		(field.value || []).filter(
																			(value) => value !== method,
																		),
																	);
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">{method}</FormLabel>
											</FormItem>
										)}
									/>
								))}
							</div>
							<FormDescription>
								Select how voters will authenticate to cast their votes.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="requireTwoFactorAuth"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Require Two-Factor Authentication (2FA)</FormLabel>
								<FormDescription>
									Enhance security by requiring a second verification step.
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="voteAnonymity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Vote Anonymity Level</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select anonymity level" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Fully Anonymous">
										Fully Anonymous
									</SelectItem>
									<SelectItem value="Partially Anonymous">
										Partially Anonymous
									</SelectItem>
									<SelectItem value="Non-Anonymous">
										Non-Anonymous (Voter identity linked to vote)
									</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Choose whether votes are completely unidentifiable or linked to
								voters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="showLiveResults"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Display Live Results During Voting</FormLabel>
								<FormDescription>
									Allow voters to see real-time election results as votes are
									cast.
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="uniqueBallotPerVoter"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									disabled // Assumed to be always true for security
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Ensure Unique Ballot Per Voter</FormLabel>
								<FormDescription>
									Guarantee that each eligible voter can cast only one valid
									ballot. (Recommended: Always Enabled)
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="ballotEncryptionEnabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									disabled // Assumed to be always true for security
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Enable Ballot Encryption</FormLabel>
								<FormDescription>
									Encrypt voter ballots to protect privacy and integrity.
									(Recommended: Always Enabled)
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="auditTrailEnabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									disabled // Assumed to be always true for transparency
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Enable Audit Trail</FormLabel>
								<FormDescription>
									Maintain a verifiable log of all election activities.
									(Recommended: Always Enabled)
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</ScrollArea>
	);
};

export const { Stepper, useStepper } = defineStepper(
	{
		id: "general",
		title: "General Information",
		schema: ElectionBasicsSchema,
		Component: ElectionBasisForm,
	},
	{
		id: "dates",
		title: "Dates & Times",
		schema: ElectionDatesTimesSchema,
		Component: ElectionDatesTimesForm,
	},

	{
		id: "voter-eligibility",
		title: "Voter Eligibility",
		schema: VoterEligibilitySchema,
		Component: VoterEligibilityForm,
	},
	{
		id: "security-settings",
		title: "Security & Verification",
		schema: SecuritySettingsSchema,
		Component: SecuritySettingsForm,
	},
);

const EditElection = ({
	election,
}: {
	election: ElectionWithRelations;
}) => {
	const methods = useStepper();

	const navigate = useNavigate();

	const form = useForm({
		mode: "onTouched",
		resolver: zodResolver(methods.current.schema),
		defaultValues: {
			...election,
			electionImage: [],
		},
	});

	const values = form.getValues() as FullElectionFormData;

	const { mutate, isPending } = useMutation(
		orpcReactQuery.election.editElection.mutationOptions(),
	);

	const onSubmit = () => {
		mutate(values, {
			onSuccess: (data) => {
				toast.success("Election created successfully", {
					description: "You can now voting preparation!",
				});

				if (data) {
					navigate({
						to: `/admin/dashboard/elections/${data.uniqueId}`,
					});
				}
			},
			onError: (error) => {
				toast.error("Failed to create election");
				console.log(error);
			},
		});
	};

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
							<Stepper.Title className="text-center">
								{step.title}
							</Stepper.Title>
						</Stepper.Step>
					))}
				</Stepper.Navigation>
				{methods.switch({
					general: ({ Component }) => <Component election={election} />,
					dates: ({ Component }) => <Component />,
					"voter-eligibility": ({ Component }) => <Component />,
					"security-settings": ({ Component }) => <Component />,
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
					{!methods.isLast ? (
						<Button
							type={"button"}
							onClick={() => {
								methods.beforeNext(async () => {
									const valid = await form.trigger();
									console.log(form.formState.errors);
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
					) : (
						<Button
							type={"submit"}
							onClick={() => {
								methods.beforeNext(async () => {
									const valid = await form.trigger();
									console.log(form.formState.errors);
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
					)}
				</Stepper.Controls>
			</form>
		</Form>
	);
};

export function EditElectionForm({
	election,
}: {
	election: ElectionWithRelations;
}) {
	return (
		<Stepper.Provider
			className="space-y-4"
			variant={"horizontal"}
			labelOrientation={"vertical"}
		>
			<EditElection election={election} />
		</Stepper.Provider>
	);
}
