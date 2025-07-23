import { UserButton, useAuthenticate } from "@daveyplate/better-auth-ui";

const DashboardHeader = () => {
	const { user } = useAuthenticate();

	return (
		<header className="flex items-center justify-between p-4 border-b">
			<div className="flex items-start flex-col gap-4">
				<h1 className="text-3xl font-bold leading-0.5">
					Welcome back, {user?.name.split(" ")[0]}
				</h1>
				<p className="text-sm text-muted-foreground">
					Let make the world a better place together.
				</p>
			</div>

			<div>
				<UserButton />
			</div>
		</header>
	);
};

export default DashboardHeader;
