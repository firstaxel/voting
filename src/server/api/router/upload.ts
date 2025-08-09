import env from "@/env.config";

type PublicR2UrlParams = {
	objectKey: string;
};

export const uploadFile = async ({
	userId,
	files,
	name,
}: { userId: string; name: string; files: File[] }) => {
	try {
		const fileExtension = files[0].name.split(".").pop() || "";

		const key = `${userId}/${name}-${Date.now()}`;

		const formData = new FormData();
		formData.append("file", files[0]);
		formData.append("key", key);

		const auth = Buffer.from(
			`${env.R2_UPLOADER_USER}:${env.R2_UPLOADER_PASS}`,
		).toString("base64");

		const uploadResponse = await fetch(`${env.R2_UPLOADER_LINK}/upload`, {
			method: "PUT",
			body: formData,
			headers: {
				Authorization: `Basic ${auth}`,
			},
		});
		if (!uploadResponse.ok)
			throw new Error(`Upload filed with status: ${uploadResponse.status}`);

		return {
			returnedUrl: getPublicR2Url({ objectKey: `${key}.${fileExtension}` }),
			key,
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error,
		};
	}
};

function getPublicR2Url({ objectKey }: PublicR2UrlParams): string {
	return `${env.CLOUDFLARE_PUBLIC_ENDPOINT}/${objectKey}`;
}
