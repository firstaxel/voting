import schema from "@/database/schema";
import { auth } from "@/lib/auth";
import { profileSchema } from "@/schema/profile";
import { eq } from "drizzle-orm";
import z from "zod";
import { privateProcedure } from "..";
import { uploadFile } from "./upload";

export const create = privateProcedure
	.input(profileSchema)
	.handler(async ({ context, input }) => {
		console.log(context.user);
		try {
			const { avatarUrl, name, ...rest } = input;

			const { success, returnedUrl } = await uploadFile({
				files: avatarUrl,
				userId: context.userId,
				name,
			});
			if (!success) throw new Error("Failed to get upload URL");

			if (name !== context.user.name || returnedUrl) {
				await auth(context.db).api.updateUser({
					body: {
						name: name !== context.user.name ? name : context.user.name,
						image: returnedUrl ? returnedUrl : "",
					},
					headers: context.headers,
				});
			}

			const [res] = await context.db.transaction(async (tx) => {
				const res = await tx
					.insert(schema.profile)
					.values({
						completed: true,
						userId: context.user.id,

						...rest,
					})
					.returning();

				await tx
					.update(schema.users)
					.set({ onboarded: true })
					.where(eq(schema.users.id, context.user.id));
				return res;
			});

			return {
				success: true,
				data: res,
			};
		} catch (error) {
			return {
				success: false,
				error: error,
			};
		}
	});

export const createCandidateLink = privateProcedure
	.input(
		z.object({
			electionId: z.string(),
		}),
	)
	.handler(async ({ context, input }) => {
		try {
			const { electionId } = input;

			const [res] = await context.db
				.insert(schema.candidatesRegistration)
				.values({
					autoApproval: true,
					electionId,
				})
				.returning({
					id: schema.candidatesRegistration.id,
				});

			return {
				success: true,
				data: res,
			};
		} catch (error) {
			return {
				success: false,
				error: error,
			};
		}
	});
