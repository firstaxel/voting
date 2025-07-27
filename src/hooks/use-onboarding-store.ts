import type { Profile } from "@/schema/profile";
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { syncObservable } from "@legendapp/state/sync";

const onboarding = observable<Profile>({
	avatarUrl: [],
	name: "",
	bio: "",
	phone: "",
	gender: "male",
	matricNo: "",
	faculty: "",
	department: "",
	level: "",
	program: "",
	modeOfStudy: "full-time",
	isEligibleToVote: false,
	hasAgreedToTerms: false,
});

syncObservable(onboarding, {
	persist: {
		name: "persistenceExample",
		plugin: ObservablePersistLocalStorage,
	},
});

export const useOnboardingStore = () => {
	return onboarding;
};
