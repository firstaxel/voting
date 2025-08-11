import * as auth from "@/auth-schema";
import * as election from "./election";
import * as profile from "./profile";

const schema = {
	...auth,
	...profile,
	...election,
};

export default schema;
