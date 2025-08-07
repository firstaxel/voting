import { useSession } from "@/hooks/auth-hooks";
import { UserButton } from "@daveyplate/better-auth-ui";
import { IconUserPlus } from "@tabler/icons-react";
import { useSidebar } from "./animate-ui/radix/sidebar";

const SidebarUserButton = () => {
	const { open } = useSidebar();

	const { data } = useSession();

	const extraLinks =
		data?.user.roles === "owner"
			? [
					{
						label: "Switch to Owner",
						href: "/owner/dashboard",
					},
				]
			: data?.user.roles === "admin"
				? [
						{
							icon: <IconUserPlus />,
							signedIn: true,
							separator: true,
							label: "Switch to Admin",
							href: "/admin/dashboard",
						},
					]
				: undefined;

	return (
		<UserButton size={open ? "default" : "icon"} additionalLinks={extraLinks} />
	);
};

export default SidebarUserButton;
