// --- Core Interfaces ---

import type { IconProps } from "@tabler/icons-react";

/**
 * Represents a single navigation link in a dashboard.
 */
interface NavLink {
	id: string; // Unique identifier for the link (e.g., 'dashboard-home', 'elections-management')
	label: string; // Display text for the link (e.g., 'Dashboard Home', 'Elections Management')
	icon: React.ComponentType<IconProps>; // Optional: The Tabler Icon React Component itself
	path: string; // The URL path the link navigates to (e.g., '/owner/dashboard', '/owner/elections')
	subLinks?: NavLink[]; // Optional: For nested navigation (e.g., 'Elections Management' could have 'All Elections', 'Create New Election')
	isVisible?: boolean; // Optional: Controls visibility based on certain conditions (e.g., feature flags, user permissions)
}

/**
 * Represents a feature available on a dashboard.
 */
interface DashboardFeature {
	id: string; // Unique identifier for the feature (e.g., 'real-time-monitoring', 'voter-import')
	title: string; // Display title of the feature (e.g., 'Real-time System Monitoring', 'Import Voters')
	icon?: React.ComponentType<IconProps>; // Optional: The Tabler Icon React Component itself

	description: string; // Brief description of what the feature does
	component?: string; // Optional: Name of the React/Vue/Angular component that renders this feature
	permissions: string[]; // Array of roles/permissions required to access this feature (e.g., ['OWNER'], ['ADMIN', 'ELECTION_MANAGER'])
	isVisible?: boolean; // Optional: Controls visibility based on certain conditions
	// You could add more properties here like 'settingsSchema' for configurable features
}

/**
 * Defines the structure for a dashboard.
 */
interface Dashboard {
	role: "owner" | "admin" | "student"; // The role this dashboard belongs to
	name: string; // Name of the dashboard (e.g., 'Owner Dashboard')
	navigation: NavLink[]; // Array of navigation links for this dashboard
	features: DashboardFeature[]; // Array of features available on this dashboard
}

// --- Specific Feature Interfaces (for more detailed typing) ---

interface ElectionFeature extends DashboardFeature {
	electionType?:
		| "single-choice"
		| "ranked-choice"
		| "proportional"
		| "mixed"
		| "all";
	supportsProxyVoting?: boolean;
}

interface UserManagementFeature extends DashboardFeature {
	canCreateUsers?: boolean;
	canManageRoles?: boolean;
}
type TablerIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type {
	NavLink,
	DashboardFeature,
	Dashboard,
	ElectionFeature,
	UserManagementFeature,
	TablerIconComponent,
};
