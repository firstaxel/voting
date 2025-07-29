import { db } from "@/database";
import { elections } from "@/database/schema/election";
import { FullElectionFormSchema } from "@/schema/elections";
import z from "zod/v4";
import { privateProcedure } from "..";

export const create = privateProcedure
	.input(FullElectionFormSchema)
	.handler(async ({ input }) => {
		try {
			const [res] = await db
				.insert(elections)
				.values({
					...input,
				})
				.returning({
					uniqueId: elections.uniqueId,
				});

			return res;
		} catch (error) {
			console.log(error);
		}
	});

export const get = privateProcedure
	.input(
		z.object({
			electionId: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		try {
			const { electionId } = input;
			const res = await db.query.elections.findFirst({
				where: (table, { eq }) => eq(table.uniqueId, electionId),
				with: {
					candidates: true,
					votes: true,
					voters: true,
					electionDepartments: true,
				},
			});

			return res;
		} catch (error) {
			console.log(error);
		}
	});
