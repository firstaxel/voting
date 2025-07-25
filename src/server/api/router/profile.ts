import { db } from "@/database";
import { profile } from "@/database/schema";
import { auth } from "@/lib/auth";
import { profileSchema } from "@/schema";
import { ORPCError } from "@orpc/client";
import { privateProcedure } from "..";
import { uploadFile } from "./upload";

export const create = privateProcedure
	.input(profileSchema)
	.handler(async ({ context, input }) => {
		try {
			const rateLimited = context.rateLimiterRes;

			if (rateLimited.remainingPoints < 1) {
				throw new ORPCError("Too many requests", { status: 429 });
			}
			const { avatarUrl, name, ...rest } = input;

			const { success, retunedUrl } = await uploadFile({
				files: avatarUrl,
				userId: context.userId,
				name,
			});
			if (!success) throw new Error("Failed to get upload URL");

			if (name !== context.user.name || retunedUrl) {
				await auth.api.updateUser({
					body: {
						name: name !== context.user.name ? name : context.user.name,
						image: retunedUrl ? retunedUrl : "",
					},
					headers: context.headers,
				});
			}

			const [res] = await db
				.insert(profile)
				.values({
					completed: true,
					userId: context.user.id,
					...rest,
				})
				.returning();

			return res;
		} catch (error) {
			console.log(error);
		}
	});
