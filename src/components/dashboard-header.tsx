import { useIsMobile } from "@/hooks/use-mobile";
import { UserButton, useAuthenticate } from "@daveyplate/better-auth-ui";
import { SidebarTrigger } from "./animate-ui/radix/sidebar";
import { Button } from "./ui/button";

interface Props {
	title?: string;
	description?: string;
	userButton?: boolean;

	actions?: React.ReactNode;
}

const DashboardHeader = ({
	title,
	description,
	userButton = true,
	actions,
}: Props) => {
	const { user } = useAuthenticate();
	const isMobile = useIsMobile();

	return (
		<header className="flex items-center justify-between p-4 gap-4 border-b">
			<div className="flex items-center gap-4">
				<Button asChild variant={"ghost"}>
					<SidebarTrigger className="p-2" />
				</Button>
				<div className="flex flex-col ">
					<h1 className="text-2xl md:text-3xl font-bold ">
						{title ? (
							title
						) : (
							<div> Welcome, {user?.name.split(" ")[0]}</div>
						)}{" "}
					</h1>
					<p className="text-sm text-muted-foreground">
						{description
							? description
							: "Let make the world a better place together."}{" "}
					</p>
				</div>
			</div>

			{userButton && (
				<div>
					<UserButton size={isMobile ? "icon" : "default"} />
				</div>
			)}

			{actions}
		</header>
	);
};

export default DashboardHeader;
