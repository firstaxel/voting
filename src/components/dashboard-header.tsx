import { useIsMobile } from "@/hooks/use-mobile";
import { UserButton, useAuthenticate } from "@daveyplate/better-auth-ui";

interface Props {
	title?: string;
	description?: string;
	userButton?: boolean;
}

const DashboardHeader = ({ title, description, userButton = true }: Props) => {
	const { user } = useAuthenticate();
	const isMobile = useIsMobile();

	return (
		<header className="flex items-center justify-between p-4 gap-4 border-b">
			<div className="flex items-start flex-col gap-4">
				<h1 className="text-2xl md:text-3xl font-bold leading-0.5">
					{title ? title : <div> Welcome, {user?.name.split(" ")[0]}</div>}{" "}
				</h1>
				<p className="text-sm text-muted-foreground">
					{description
						? description
						: "Let make the world a better place together."}{" "}
				</p>
			</div>

			{userButton && (
				<div>
					<UserButton size={isMobile ? "icon" : "default"} />
				</div>
			)}
		</header>
	);
};

export default DashboardHeader;
