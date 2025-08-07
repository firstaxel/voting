import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

type Props = {
	title: string;
	description: string;
	icon: React.ReactNode;
};
const DashboardAnalyticsCard = ({ title, description, icon: Icon }: Props) => {
	return (
		<Card>
			<CardHeader className="flex items-start flex-col gap-4 ">
				<div className="bg-zinc-500 w-fit p-2 rounded-xl">{Icon}</div>
				<div className="space-y-2">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<h3 className="text-3xl font-bold">123</h3>
			</CardContent>
		</Card>
	);
};

export default DashboardAnalyticsCard;
