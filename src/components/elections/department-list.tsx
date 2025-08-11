import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

const DepartmentList = ({ departments }: { departments: string[] }) => {
	const isMobile = useIsMobile();
	const visibleDepartments = departments.slice(0, 5);
	const remainingDepartments = departments.slice(5);
	const remainingCount = remainingDepartments.length;

	return (
		<div className="flex flex-wrap gap-2">
			{visibleDepartments.map((department) => (
				<Badge
					key={department}
					variant="outline"
					className="p-2 text-sm capitalize"
				>
					{department.replace(/-/g, " ")}
				</Badge>
			))}

			{remainingCount > 0 && (
				<Popover modal>
					<PopoverTrigger asChild>
						<Badge className="cursor-pointer p-2 text-sm capitalize">
							{remainingCount} more
						</Badge>
					</PopoverTrigger>
					<PopoverContent
						className=" p-2 w-lg"
						side={isMobile ? "bottom" : "left"}
					>
						<ScrollArea className="h-[400px]">
							<div className="flex flex-wrap gap-2">
								{remainingDepartments.map((department) => (
									<Badge
										key={department}
										variant="secondary"
										className="p-2 text-sm capitalize"
									>
										{department.replace(/-/g, " ")}
									</Badge>
								))}
							</div>
						</ScrollArea>
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};

export default DepartmentList;
