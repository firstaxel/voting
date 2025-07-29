import { dashboards } from "@/data/dashboard-navlinks";
import { cn } from "@/lib/utils";
import { UserButton } from "@daveyplate/better-auth-ui";

import { Collapsible } from "@radix-ui/react-collapsible";
import { ChevronsDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

export function SidebarLayout({
	children,
	roleType,
}: { children: React.ReactNode; roleType?: "admin" | "owner" | "student" }) {
	const dashboardLinks = dashboards.find(
		(d) => d.role === roleType,
	)?.navigation;

	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div
			className={cn(
				"mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 ",
				"h-screen",
			)}
		>
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto scrollbar">
						{sidebarOpen ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2 py-5 ">
							{dashboardLinks?.map((link, idx) => (
								<div key={`${link.label}-${idx}`}>
									{link.subLinks ? (
										<Collapsible
											onOpenChange={(open) => {
												if (open && !sidebarOpen) {
													return !open;
												}
											}}
										>
											<div className="flex items-center gap-2 w-full">
												<SidebarLink
													key={`${link.label}-${idx}`}
													link={link}
													className="w-full"
												/>
												<CollapsibleTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="size-8"
													>
														<ChevronsDown />
														<span className="sr-only">Toggle</span>
													</Button>
												</CollapsibleTrigger>
											</div>
											<CollapsibleContent className="flex flex-col gap-2 border-l border-neutral-200  ml-4 pl-4 dark:border-neutral-700 transition-all duration-200">
												{link.subLinks.map((subLink, idx) => (
													<SidebarLink
														key={`${subLink.label}-${idx}`}
														link={subLink}
													/>
												))}
											</CollapsibleContent>
										</Collapsible>
									) : (
										<SidebarLink key={`${link.label}-${idx}`} link={link} />
									)}
								</div>
							))}
						</div>
					</div>
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
			className="fixed z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
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
			className="fixed z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
		</a>
	);
};
