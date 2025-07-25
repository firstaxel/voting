import env from "@/env.config";
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadFile = async ({
	userId,
	files,
	name,
}: { userId: string; name: string; files: File[] }) => {
	const s3Client = new S3Client({
		region: env.AWS_REGION,
		endpoint: env.AWS_ENDPOINT,
		credentials: {
			accessKeyId: env.AWS_ACCESS_KEY_ID,
			secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		},
	});

	const fileExtension = files[0].name.split(".").pop() || "";

	const key = `${userId}/${name}-${Date.now()}.${fileExtension}`;

	const command = new PutObjectCommand({
		Bucket: env.S3_BUCKET_NAME,
		Key: key,
		ContentType: files[0].type,
	});

	const signedUrl = await getSignedUrl(s3Client, command);

	const uploadResponse = await fetch(signedUrl, {
		method: "PUT",
		body: files[0],
		headers: {
			"Content-Type": files[0].type,
		},
	});
	if (!uploadResponse.ok)
		throw new Error(`Upload filed with status: ${uploadResponse.status}`);

	const getUrlCommand = new GetObjectCommand({
		Bucket: env.S3_BUCKET_NAME,
		Key: key,
	});

	const retunedUrl = await getSignedUrl(s3Client, getUrlCommand, {
		expiresIn: 3600,
	});

	return {
		retunedUrl,
		key,
		success: true,
	};
};
