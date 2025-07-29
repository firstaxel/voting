import { Loader2 } from "lucide-react";
import React, { type ReactNode } from "react";

const HydrationProvider = ({ children }: { children: ReactNode }) => {
	const [isHydrated, setIsHydrated] = React.useState(false);

	React.useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="animate-spin size-12" />
			</div>
		);
	}
	return <div>{children}</div>;
};

export default HydrationProvider;
