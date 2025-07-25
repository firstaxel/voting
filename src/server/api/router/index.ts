import * as profile from "./profile";
import * as upload from "./upload";

export const router = {
	profile: {
		create: profile.create,
	},
	upload,
};
