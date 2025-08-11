import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/animate-ui/radix/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	useSidebar,
} from "@/components/animate-ui/radix/sidebar";
import { dashboards } from "@/data/dashboard-navlinks";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SidebarUserButton from "./sidebar-user-button";

export const DashboardSidebar = ({
	children,
	roleType,
}: { children: React.ReactNode; roleType?: "admin" | "owner" | "student" }) => {
	const dashboardLinks = dashboards.find(
		(d) => d.role === roleType,
	)?.navigation;

	return (
		<SidebarProvider defaultOpen={true}>
			<Sidebar collapsible="icon">
				<SidebarHeader>
					{/* Team Switcher */}
					<SidebarMenu>
						<SidebarMenuItem>
							<Logo />
						</SidebarMenuItem>
					</SidebarMenu>
					{/* Team Switcher */}
				</SidebarHeader>

				<SidebarContent>
					{/* Nav Main */}
					<SidebarGroup>
						<SidebarGroupLabel>Platform</SidebarGroupLabel>
						<SidebarMenu>
							{dashboardLinks?.map((item, idx) => (
								<div key={`${item.label}-${idx}`}>
									{item.subLinks ? (
										<Collapsible
											key={item.label}
											asChild
											className="group/collapsible"
										>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton
														tooltip={item.label}
														className="[&>svg]:size-6"
													>
														{item.icon && <item.icon />}
														<span className="text-sm">{item.label}</span>
														<ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
													</SidebarMenuButton>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<SidebarMenuSub>
														{item.subLinks?.map((subItem) => (
															<SidebarMenuSubItem key={subItem.label}>
																<SidebarMenuSubButton
																	asChild
																	className="[&>svg]:size-6"
																>
																	<Link to={subItem.path}>
																		{subItem.icon && <subItem.icon />}

																		<span className="text-sm">
																			{subItem.label}
																		</span>
																	</Link>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>
												</CollapsibleContent>
											</SidebarMenuItem>
										</Collapsible>
									) : (
										<SidebarMenuItem>
											<SidebarMenuButton
												tooltip={item.label}
												asChild
												className="[&>svg]:!size-6 items-center "
											>
												<Link to={item.path}>
													{item.icon && <item.icon />}

													<span className="text-sm">{item.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)}
								</div>
							))}
						</SidebarMenu>
					</SidebarGroup>
					{/* Nav Main */}
				</SidebarContent>
				<SidebarFooter>
					{/* Nav User */}
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarUserButton />
						</SidebarMenuItem>
					</SidebarMenu>
					{/* Nav User */}
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>

			<SidebarInset>
				{/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
				</header> */}
				<div className="flex flex-1 flex-col ">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export const Logo = () => {
	const { open } = useSidebar();
	return (
		<div>
			{open ? (
				<a
					href="/"
					className={cn(
						" z-20 flex items-center  space-x-2 py-1 text-sm font-normal text-black",
					)}
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
			) : (
				<a
					href="/"
					className=" z-20 flex items-center  space-x-2 py-1 text-sm font-normal text-black"
				>
					<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
				</a>
			)}
		</div>
	);
};
