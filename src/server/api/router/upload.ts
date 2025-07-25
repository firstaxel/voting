import env from "@/env.config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import z from "zod/v4";
import { api } from "..";

const uploadSchema = z.object({
	filename: z.string(),
	contentType: z.string(),
});

export const generatePresignedURL = api
	.input(uploadSchema)
	.handler(async ({ input, context }) => {
		const { filename, contentType } = input;

		const { user } = context.session;
		const s3Client = new S3Client({
			region: env.AWS_REGION,
			endpoint: env.AWS_ENDPOINT,
			credentials: {
				accessKeyId: env.AWS_ACCESS_KEY_ID,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
			},
		});

		const fileExtension = filename.split(".").pop() || "";

		const key = `${user.id}/${user.name}.${fileExtension}`;

		const command = new PutObjectCommand({
			Bucket: env.S3_BUCKET_NAME,
			Key: key,
			ContentType: contentType,
		});

		const signedUrl = await getSignedUrl(s3Client, command);

		return {
			signedUrl,
			key,
			success: true,
		};
	});

export const uploadRouter = {
	generatePresignedURL,
};
