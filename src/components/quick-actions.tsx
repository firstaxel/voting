import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart3, Download, Plus, ShoppingBag, Users } from "lucide-react";

interface QuickAction {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	shortcut: string;
}

const quickActions: QuickAction[] = [
	{
		id: "1",
		title: "Create Order",
		description: "Add a new order to the system",
		icon: ShoppingBag,
		shortcut: "⌘N",
	},
	{
		id: "2",
		title: "Analytics",
		description: "View detailed performance reports",
		icon: BarChart3,
		shortcut: "⌘R",
	},
	{
		id: "3",
		title: "User Management",
		description: "Manage user accounts and permissions",
		icon: Users,
		shortcut: "⌘U",
	},
	{
		id: "4",
		title: "Export Data",
		description: "Download reports and analytics",
		icon: Download,
		shortcut: "⌘E",
	},
];

export function QuickActions() {
	return (
		<Card className="bg-card border-border">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col ">
						<CardTitle className="text-lg font-semibold text-card-foreground">
							Quick Actions
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Quick actions for managing your elections
						</CardDescription>
					</div>
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground hover:text-card-foreground"
					>
						<Plus className="w-4 h-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				{quickActions.map((action) => (
					<div
						key={action.id}
						className={cn(
							"flex border items-center justify-between p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group",
						)}
					>
						<div className={cn("flex items-center space-x-3")}>
							<div className="p-2 rounded-md bg-secondary">
								<action.icon className="w-4 h-4 text-secondary-foreground" />
							</div>
							<div>
								<p className="text-sm font-medium text-card-foreground">
									{action.title}
								</p>
								<p className="text-xs text-muted-foreground">
									{action.description}
								</p>
							</div>
						</div>
						<span className="text-xs text-muted-foreground group-hover:text-card-foreground transition-colors">
							{action.shortcut}
						</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
