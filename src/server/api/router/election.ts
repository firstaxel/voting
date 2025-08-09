import { db } from "@/database";
import { elections } from "@/database/schema/election";
import { FullElectionFormSchema } from "@/schema/elections";
import z from "zod/v4";
import { privateProcedure } from "..";
import { uploadFile } from "./upload";

export const create = privateProcedure
	.input(FullElectionFormSchema)
	.handler(async ({ input, context }) => {
		try {
			const { success, returnedUrl } = await uploadFile({
				files: input.electionImage as File[],
				userId: context.userId,
				name: input.electionName,
			});
			if (!success) throw new Error("Failed to get upload URL");
			const [res] = await db
				.insert(elections)
				.values({
					...input,
					electionImage: returnedUrl,
					createdBy: context.userId,
				})
				.returning({
					uniqueId: elections.uniqueId,
				});

			return res;
		} catch (error) {
			console.log(error);
		}
	});
export const editElection = privateProcedure
	.input(FullElectionFormSchema)
	.handler(async ({ input, context }) => {
		try {
			const { success, returnedUrl } = await uploadFile({
				files: input.electionImage as File[],
				userId: context.userId,
				name: input.electionName,
			});
			if (!success) throw new Error("Failed to get upload URL");
			const [res] = await db
				.insert(elections)
				.values({
					...input,
					electionImage: returnedUrl,
					createdBy: context.userId,
				})
				.returning({
					uniqueId: elections.uniqueId,
				});

			return res;
		} catch (error) {
			console.log(error);
		}
	});

export const getByElectionId = privateProcedure
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
					electionAcademicLevels: true,
					electionAuthMethods: true,
				},
			});

			return res;
		} catch (error) {
			console.log(error);
		}
	});

export const get = privateProcedure.handler(async ({ context }) => {
	try {
		const res = await db.query.elections.findMany({
			where: (table, { eq }) => eq(table.createdBy, context.userId),
			with: {
				candidates: true,
				votes: true,
				voters: true,
			},
		});

		return res;
	} catch (error) {
		console.log(error);
	}
});
