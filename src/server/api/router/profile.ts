import { client } from "@/lib/orpc";
import { profileSchema } from "@/schema";
import { api } from "..";

export const create = api
	.input(profileSchema)
	.handler(async ({ context, input }) => {
		const { avatarUrl } = input;

		const { success, signedUrl } = await client.upload.generatePresignedURL({
			filename: avatarUrl[0].name,
			contentType: avatarUrl[0].type,
		});

		if (!success) throw new Error("Failed to get upload URL");

		const uploadResponse = await fetch(signedUrl, {
			method: "PUT",
			body: avatarUrl[0],
			headers: {
				"Content-Type": avatarUrl[0].type,
			},
		});

		if (!uploadResponse.ok)
			throw new Error(`Upload filed with status: ${uploadResponse.status}`);
	});
