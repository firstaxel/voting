import type { Dashboard } from "@/types/dashboard-navlinks";

import {
	IconActivity,
	IconAddressBook,
	IconAdjustmentsAlt,
	IconAdjustmentsHorizontal,
	IconArchive,
	IconArrowsMaximize,
	IconBell,
	IconBellRinging,
	IconBook,
	IconBox,
	IconBroadcast,
	IconCalendarEvent,
	IconChartAreaLine,
	IconChartBar,
	IconChartPie,
	IconCheckbox,
	IconChecklist,
	IconCircleCheck,
	IconClipboardList,
	IconClipboardText,
	IconClock,
	IconCloudUpload,
	IconCode,
	IconCreditCard,
	IconDashboard,
	IconEdit,
	IconEyeglass,
	IconFileUpload,
	IconFingerprint,
	IconGauge,
	IconGavel,
	IconGraph,
	IconHelp,
	IconHelpCircle,
	IconHistory,
	IconHome,
	IconHourglass,
	IconInfoCircle,
	IconKey,
	IconLanguage,
	IconLayoutDashboard,
	IconLifebuoy,
	IconLink,
	IconList,
	IconListCheck,
	IconLock,
	IconMail,
	IconMask,
	IconMessages,
	IconPlug,
	IconPlus,
	IconPodium,
	IconReportAnalytics,
	IconRocket,
	IconSettings,
	IconShield,
	IconShieldX,
	IconTemplate,
	IconTicket,
	IconUser,
	IconUserCheck,
	IconUserCircle,
	IconUserCog,
	IconUserPlus,
	IconUserShield,
	IconUsers,
	IconUsersGroup,
	IconWand,
	IconWheelchair,
	IconWorld,
	IconZoomQuestion,
} from "@tabler/icons-react";

const dashboards: Dashboard[] = [
	// --- OWNER DASHBOARD ---
	{
		role: "owner",
		name: "Owner Dashboard",
		navigation: [
			{
				id: "dashboard-home",
				label: "Dashboard",
				icon: IconHome,
				path: "/owner/dashboard",
			},
			{
				id: "elections-management",
				label: "Elections Management",
				icon: IconClipboardList,
				path: "/owner/elections",
				subLinks: [
					{
						id: "all-elections",
						label: "All Elections",
						icon: IconList,
						path: "/owner/elections/all",
					},
					{
						id: "create-new-election",
						label: "Create New Election",
						icon: IconPlus,
						path: "/owner/elections/new",
					},
					{
						id: "election-templates",
						label: "Templates",
						icon: IconTemplate,
						path: "/owner/elections/templates",
					},
				],
			},
			{
				id: "user-management",
				label: "User Management",
				icon: IconUsersGroup,
				path: "/owner/users",
				subLinks: [
					{
						id: "all-users",
						label: "All Users",
						icon: IconUsers,
						path: "/owner/users/all",
					},
					{
						id: "user-roles",
						label: "User Roles",
						icon: IconUserShield,
						path: "/owner/users/roles",
					},
					{
						id: "user-analytics",
						label: "User Analytics",
						icon: IconChartAreaLine,
						path: "/owner/users/analytics",
					},
				],
			},
			{
				id: "system-settings",
				label: "System Settings",
				icon: IconSettings,
				path: "/owner/settings",
				subLinks: [
					{
						id: "general-settings",
						label: "General Settings",
						icon: IconSettings,
						path: "/owner/settings/general",
					},
					{
						id: "security-settings",
						label: "Security Settings",
						icon: IconLock,
						path: "/owner/settings/security",
					},
					{
						id: "integrations",
						label: "Integrations",
						icon: IconPlug,
						path: "/owner/settings/integrations",
					},
					{
						id: "audit-logs",
						label: "Audit Logs",
						icon: IconClipboardText,
						path: "/owner/settings/audit",
					},
				],
			},
			{
				id: "analytics-reports",
				label: "Analytics & Reports",
				icon: IconChartPie,
				path: "/owner/analytics",
				subLinks: [
					{
						id: "platform-performance",
						label: "Platform Performance",
						icon: IconGauge,
						path: "/owner/analytics/performance",
					},
					{
						id: "voting-trends",
						label: "Voting Trends",
						icon: IconGraph,
						path: "/owner/analytics/trends",
					},
					{
						id: "security-incidents",
						label: "Security Incidents",
						icon: IconShieldX,
						path: "/owner/analytics/incidents",
					},
				],
			},
			{
				id: "support-communication",
				label: "Support & Communication",
				icon: IconLifebuoy,
				path: "/owner/support",
				subLinks: [
					{
						id: "support-tickets",
						label: "Support Tickets",
						icon: IconTicket,
						path: "/owner/support/tickets",
					},
					{
						id: "announcements",
						label: "Announcements",
						icon: IconBroadcast,
						path: "/owner/support/announcements",
					},
					{
						id: "documentation",
						label: "Documentation",
						icon: IconBook,
						path: "/owner/support/docs",
					},
				],
			},
			{
				id: "billing-subscriptions",
				label: "Billing & Subscriptions",
				icon: IconCreditCard,
				path: "/owner/billing",
			},
			{
				id: "developer-tools",
				label: "Developer Tools",
				icon: IconCode,
				path: "/owner/dev-tools",
			},
			{
				id: "compliance-legal",
				label: "Compliance & Legal",
				icon: IconGavel,
				path: "/owner/compliance",
			},
			{
				id: "marketing-growth",
				label: "Marketing & Growth",
				icon: IconRocket,
				path: "/owner/marketing",
			},
		],
		features: [
			{
				id: "real-time-monitoring",
				title: "Real-time System Monitoring",
				description:
					"Monitor system health, active users, and potential issues in real-time.",
				permissions: ["OWNER"],
				icon: IconActivity,
			},
			{
				id: "advanced-election-config",
				title: "Advanced Election Configuration",
				description:
					"Tools for setting up complex elections with custom rules and weighting.",
				permissions: ["OWNER"],
				component: "ElectionConfigTool",
				icon: IconAdjustmentsHorizontal,
			},
			{
				id: "comprehensive-user-management",
				title: "Comprehensive User Management",
				description:
					"Add, edit, suspend, or delete users and manage roles/permissions.",
				permissions: ["OWNER"],
				component: "UserManagementPanel",
				icon: IconUsers,
			},
			{
				id: "security-threat-response",
				title: "Security Management",
				description:
					"Monitor and respond to security threats, manage encryption.",
				permissions: ["OWNER"],
				icon: IconShield,
			},
			{
				id: "advanced-analytics-reporting",
				title: "Advanced Analytics & Reporting",
				description:
					"Granular data on platform usage, with custom report generation.",
				permissions: ["OWNER"],
				icon: IconReportAnalytics,
			},
			{
				id: "full-audit-trail",
				title: "Full Audit Trail",
				description:
					"Immutable logs of every action on the platform for accountability.",
				permissions: ["OWNER"],
				icon: IconListCheck,
			},
			{
				id: "scalability-management",
				title: "Scalability Management",
				description: "Monitor and manage server resources to ensure stability.",
				permissions: ["OWNER"],
				icon: IconArrowsMaximize,
			},
			{
				id: "automated-backups",
				title: "Automated Backups & DR",
				description:
					"Configure and monitor backup processes and disaster recovery plans.",
				permissions: ["OWNER"],
				icon: IconCloudUpload,
			},
			{
				id: "notification-system-config",
				title: "Notification System Configuration",
				description:
					"Configure alerts for critical system events and user issues.",
				permissions: ["OWNER"],
				icon: IconBellRinging,
			},
			{
				id: "cms-management",
				title: "Content Management System",
				description: "Manage static pages, FAQs, and platform announcements.",
				permissions: ["OWNER"],
				icon: IconLayoutDashboard,
			},
			{
				id: "ai-anomaly-detection",
				title: "AI Anomaly Detection",
				description:
					"AI-powered alerts for unusual voting patterns or system activities.",
				permissions: ["OWNER"],
				icon: IconEyeglass,
			},
			{
				id: "api-key-management",
				title: "API Key Management",
				description: "Generate and manage API keys for integrations.",
				permissions: ["OWNER"],
				icon: IconKey,
			},
		],
	},

	// --- ADMIN DASHBOARD (for Voting Bodies) ---
	{
		role: "admin",
		name: "Admin Dashboard",
		navigation: [
			{
				id: "dashboard-home",
				label: "Dashboard ",
				icon: IconDashboard,
				path: "/admin/dashboard",
			},
			{
				id: "my-elections",
				label: "My Elections",
				icon: IconCalendarEvent,
				path: "/admin/dashboard/elections",
				subLinks: [
					{
						id: "current-elections",
						label: "Current Elections",
						icon: IconHourglass,
						path: "/admin/dashboard/elections/current",
					},
					{
						id: "upcoming-elections",
						label: "Upcoming Elections",
						icon: IconClock,
						path: "/admin/dashboard/elections/upcoming",
					},
					{
						id: "past-elections",
						label: "Past Elections",
						icon: IconArchive,
						path: "/admin/dashboard/elections/past",
					},
					{
						id: "create-new-election",
						label: "Create New Election",
						icon: IconPlus,
						path: "/admin/dashboard/elections/new",
					},
				],
			},
			{
				id: "voter-management",
				label: "Voter Management",
				icon: IconUsers,
				path: "/admin/voters",
				subLinks: [
					{
						id: "registered-voters",
						label: "Registered Voters",
						icon: IconList,
						path: "/admin/dashboard/voters/all",
					},
					{
						id: "import-voters",
						label: "Import Voters",
						icon: IconFileUpload,
						path: "/admin/dashboard/voters/import",
					},
					{
						id: "voter-groups",
						label: "Voter Groups",
						icon: IconUserCircle,
						path: "/admin/dashboard/voters/groups",
					},
					{
						id: "voter-authentication",
						label: "Voter Authentication",
						icon: IconFingerprint,
						path: "/admin/dashboard/voters/auth-config",
					},
				],
			},
			{
				id: "candidate-management",
				label: "Candidate Management",
				icon: IconUserPlus,
				path: "/admin/candidates",
				subLinks: [
					{
						id: "manage-candidates",
						label: "Manage Candidates",
						icon: IconUserCog,
						path: "/admin/dashboard/candidates/manage",
					},
					{
						id: "candidate-profiles",
						label: "Candidate Profiles",
						icon: IconAddressBook,
						path: "/admin/dashboard/candidates/profiles",
					},
				],
			},
			{
				id: "results-reports",
				label: "Results & Reports",
				icon: IconChartBar,
				path: "/admin/results",
				subLinks: [
					{
						id: "election-results",
						label: "Election Results",
						icon: IconPodium,
						path: "/admin/dashboard/results/view",
					},
					{
						id: "turnout-reports",
						label: "Turnout Reports",
						icon: IconUsersGroup,
						path: "/admin/dashboard/results/turnout",
					},
					{
						id: "election-audit-trail",
						label: "Audit Trail",
						icon: IconClipboardText,
						path: "/admin/dashboard/results/audit",
					},
				],
			},
			{
				id: "settings",
				label: "Settings",
				icon: IconSettings,
				path: "/admin/dashboard/settings",
			},
			{
				id: "support",
				label: "Support",
				icon: IconHelp,
				path: "/admin/dashboard/support",
			},
			{
				id: "integrations",
				label: "Integrations",
				icon: IconPlug,
				path: "/admin/dashboard/integrations",
			},
		],
		features: [
			{
				id: "election-setup-wizard",
				title: "Intuitive Election Setup Wizard",
				description:
					"Guided process for creating elections with various options.",
				permissions: ["ADMIN"],
				icon: IconWand,
			},
			{
				id: "secure-voter-management",
				title: "Secure Voter Management",
				description:
					"Tools to onboard voters, manage eligibility, and ensure data integrity.",
				permissions: ["ADMIN"],
				icon: IconUserCheck,
			},
			{
				id: "ballot-customization",
				title: "Ballot Customization",
				description:
					"Design ballots with various question types and candidate ordering.",
				permissions: ["ADMIN"],
				icon: IconBox,
			},
			{
				id: "real-time-election-monitoring",
				title: "Real-time Election Monitoring",
				description: "Live updates on voter turnout during active elections.",
				permissions: ["ADMIN"],
				icon: IconActivity,
			},
			{
				id: "transparent-result-generation",
				title: "Transparent Result Generation",
				description:
					"Secure and auditable process for vote tallying and results.",
				permissions: ["ADMIN"],
				icon: IconChecklist,
			},
			{
				id: "communication-tools",
				title: "Communication Tools",
				description:
					"Send announcements and reminders to their specific voter base.",
				permissions: ["ADMIN"],
				icon: IconMail,
			},
			{
				id: "delegated-admin-access",
				title: "Delegated Admin Access",
				description:
					"Create sub-admins within their voting body with limited permissions.",
				permissions: ["ADMIN"],
				icon: IconUserShield,
			},
			{
				id: "advanced-election-options",
				title: "Advanced Election Options",
				description:
					"Conditional voting logic, proportional representation tools, proxy voting.",
				permissions: ["ADMIN"],
				icon: IconAdjustmentsAlt,
			},
			{
				id: "customizable-templates",
				title: "Customizable Communication Templates",
				description:
					"Pre-designed and customizable templates for election emails/SMS.",
				permissions: ["ADMIN"],
				icon: IconMessages,
			},
			{
				id: "sis-integration",
				title: "SIS/Membership System Integration",
				description:
					"Seamlessly pull eligible voter lists from external systems.",
				permissions: ["ADMIN"],
				icon: IconLink,
			},
			{
				id: "public-election-pages",
				title: "Public Election Pages",
				description:
					"Create dedicated, branded public pages for each election.",
				permissions: ["ADMIN"],
				icon: IconWorld,
			},
		],
	},

	// --- STUDENT DASHBOARD (for Voters) ---
	{
		role: "student",
		name: "Student Dashboard",
		navigation: [
			{
				id: "dashboard-home",
				label: "Dashboard ",
				icon: IconHome,
				path: "/student/dashboard",
			},
			{
				id: "my-elections",
				label: "My Elections",
				icon: IconCheckbox,
				path: "/student/elections",
				subLinks: [
					{
						id: "current-elections",
						label: "Current Elections",
						icon: IconHourglass,
						path: "/student/elections/current",
					},
					{
						id: "upcoming-elections",
						label: "Upcoming Elections",
						icon: IconClock,
						path: "/student/elections/upcoming",
					},
					{
						id: "past-elections",
						label: "Past Elections",
						icon: IconArchive,
						path: "/student/elections/past",
					},
				],
			},
			{
				id: "my-profile",
				label: "My Profile",
				icon: IconUser,
				path: "/student/profile",
			},
			{
				id: "help-support",
				label: "Help & Support",
				icon: IconHelpCircle,
				path: "/student/help",
			},
		],
		features: [
			{
				id: "personalized-election-list",
				title: "Personalized Election List",
				description: "View only elections they are eligible to vote in.",
				permissions: ["STUDENT"],
				icon: IconListCheck,
			},
			{
				id: "secure-voting-interface",
				title: "Simple & Secure Voting Interface",
				description:
					"Intuitive design for casting votes with clear instructions.",
				permissions: ["STUDENT"],
				icon: IconEdit,
			},
			{
				id: "candidate-info-access",
				title: "Candidate Information Access",
				description: "Easy access to candidate profiles and manifestos.",
				permissions: ["STUDENT"],
				icon: IconInfoCircle,
			},
			{
				id: "vote-confirmation",
				title: "Vote Confirmation",
				description:
					"Clear confirmation message after a vote is successfully cast.",
				permissions: ["STUDENT"],
				icon: IconCircleCheck,
			},
			{
				id: "voting-history",
				title: "Voting History",
				description:
					"A record of elections participated in (without revealing specific vote).",
				permissions: ["STUDENT"],
				icon: IconHistory,
			},
			{
				id: "election-notifications",
				title: "Election Notifications",
				description: "Alerts for new elections, voting deadlines, and results.",
				permissions: ["STUDENT"],
				icon: IconBell,
			},
			{
				id: "secure-authentication",
				title: "Secure Authentication",
				description:
					"Robust login procedures, including two-factor authentication.",
				permissions: ["STUDENT"],
				icon: IconLock,
			},
			{
				id: "anonymity-assurance",
				title: "Anonymity Assurance",
				description: "Information on how votes are kept anonymous and secure.",
				permissions: ["STUDENT"],
				icon: IconMask,
			},
			{
				id: "accessibility-features",
				title: "Accessibility Features",
				description:
					"Ensuring the voting interface is accessible to all users.",
				permissions: ["STUDENT"],
				icon: IconWheelchair,
			},
			{
				id: "interactive-candidate-info",
				title: "Interactive Candidate Information",
				description:
					'Candidate comparison tool and "Meet the Candidates" section.',
				permissions: ["STUDENT"],
				icon: IconZoomQuestion,
			},
			{
				id: "post-election-impact",
				title: "Post-Election Impact (Anonymized)",
				description:
					"View aggregated voting data trends after results are released.",
				permissions: ["STUDENT"],
				icon: IconChartPie,
			},
			{
				id: "dynamic-language-support",
				title: "Dynamic Language Support",
				description: "Option to choose preferred language for the interface.",
				permissions: ["STUDENT"],
				icon: IconLanguage,
			},
		],
	},
];

export { dashboards };
