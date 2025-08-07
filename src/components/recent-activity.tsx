import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ActivityItem {
	id: string;
	type: string;
	title: string;
	description: string;
	time: string;
	user: string;
	avatar: string;
	badge?: string;
	badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

const activities: ActivityItem[] = [
	{
		id: "1",
		type: "JD",
		title: "New order received",
		description: "Order #12345 from Enterprise Corp - $25,000",
		time: "2 minutes ago",
		user: "John Doe",
		avatar: "JD",
		badge: "High Value",
		badgeVariant: "default",
	},
	{
		id: "2",
		type: "JS",
		title: "Payment processed",
		description: "Stripe payment of $1,234.56 completed successfully",
		time: "5 minutes ago",
		user: "Jane Smith",
		avatar: "JS",
	},
	{
		id: "3",
		type: "AW",
		title: "User registration",
		description: "New premium user: alice@company.com",
		time: "10 minutes ago",
		user: "Alice Wilson",
		avatar: "AW",
		badge: "Premium",
		badgeVariant: "secondary",
	},
];

export function RecentActivity() {
	return (
		<Card className="bg-secondary border-border">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-xl font-bold text-card-foreground">
							Recent Activity
						</CardTitle>
						<p className="text-sm text-muted-foreground mt-1 font-medium">
							Latest updates and events from your system
						</p>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">3 items</span>
						<Button variant="ghost" size="sm" className="text-muted-foreground">
							•••
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{activities.map((activity) => (
					<div
						key={activity.id}
						className="flex items-start space-x-3 border border-dashed  rounded-lg p-4"
					>
						<div className="flex-shrink-0">
							<div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
								{activity.type}
							</div>
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<p className="text-sm font-medium text-card-foreground">
									{activity.title}
								</p>
								{activity.badge && (
									<Badge variant={activity.badgeVariant} className="text-xs">
										{activity.badge}
									</Badge>
								)}
							</div>
							<p className="text-sm text-muted-foreground">
								{activity.description}
							</p>
							<div className="flex items-center mt-1 text-xs text-muted-foreground">
								<span>{activity.time}</span>
								<span className="mx-1">•</span>
								<span>{activity.user}</span>
							</div>
						</div>
					</div>
				))}

				<Button
					variant="outline"
					className="w-full justify-between text-muted-foreground hover:text-card-foreground mt-4"
				>
					<span>View All Activities</span>
					<ArrowRight className="w-4 h-4" />
				</Button>
			</CardContent>
		</Card>
	);
}
