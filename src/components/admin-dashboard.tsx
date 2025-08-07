import DashboardAnalyticsCard from "@/components/dashboard-analytics-card";
import DashboardHeader from "@/components/dashboard-header";
import { IconUser } from "@tabler/icons-react";
import { QuickActions } from "./quick-actions";
import { RecentActivity } from "./recent-activity";
const AdminDashboard = () => {
	return (
		<div className="flex flex-col gap-4">
			<DashboardHeader />
			<div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<DashboardAnalyticsCard
						icon={<IconUser />}
						title="Total Election Created"
						description="Total number of elections created"
					/>
					<DashboardAnalyticsCard
						icon={<IconUser />}
						title="Active Elections"
						description="Total number of elections created"
					/>
					<DashboardAnalyticsCard
						icon={<IconUser />}
						title="Upcoming Elections"
						description="Total number of elections created"
					/>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Recent Activity - Takes 2 columns */}
					<div className="lg:col-span-2">
						<RecentActivity />
					</div>

					{/* Right Sidebar */}
					<div className="space-y-6">
						<QuickActions />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
