import * as election from "./election";
import * as profile from "./profile";

export const router = {
	profile: {
		create: profile.create,
	},
	election,
};
