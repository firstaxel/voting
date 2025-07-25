import { cn } from "@/lib/utils";
import { UserButton } from "@daveyplate/better-auth-ui";
import {
	IconArrowLeft,
	IconBrandTabler,
	IconSettings,
	IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

export function SidebarLayout({
	children,
	sidebarContent,
}: { children: React.ReactNode; sidebarContent?: React.ReactNode }) {
	const links = [
		{
			label: "Dashboard",
			href: "#",
			icon: (
				<IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Profile",
			href: "#",
			icon: (
				<IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Settings",
			href: "#",
			icon: (
				<IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Logout",
			href: "#",
			icon: (
				<IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
	];
	const [open, setOpen] = useState(false);
	return (
		<div
			className={cn(
				"mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
				"h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					{sidebarContent ? (
						sidebarContent
					) : (
						<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
							{open ? <Logo /> : <LogoIcon />}
							<div className="mt-8 flex flex-col gap-2">
								{links.map((link, idx) => (
									<SidebarLink key={`${link.label}-${idx}`} link={link} />
								))}
							</div>
						</div>
					)}
					<div>
						<UserButton size={"icon"} />
					</div>
				</SidebarBody>
			</Sidebar>
			{children}
		</div>
	);
}
export const Logo = () => {
	return (
		<a
			href="/"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium whitespace-pre text-black dark:text-white"
			>
				Acet Labs
			</motion.span>
		</a>
	);
};
export const LogoIcon = () => {
	return (
		<a
			href="/"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
		</a>
	);
};
