import * as auth from "@/auth-schema";
import * as election from "./election";
import * as profile from "./profile";
import * as relations from "./relations";

const schema = {
	...auth,
	...profile,
	...election,
	...relations,
};

export default schema;
