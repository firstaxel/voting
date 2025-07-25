import { Button } from "@/components/ui/button";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadTrigger,
} from "@/components/ui/file-upload";
import { UserAvatar } from "@daveyplate/better-auth-ui";
import type { User } from "better-auth";
import { X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export function AvatarUploader({
	user,
	onChange,
	value,
}: {
	user: User;
	value: File[];
	onChange: (value: File[]) => void;
}) {
	const [files, setFiles] = React.useState<File[]>();

	const onFileReject = React.useCallback((file: File, message: string) => {
		toast(message, {
			description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
		});
	}, []);

	const handleChange = (files: File[]) => {
		onChange(files);
		setFiles(files);
	};

	return (
		<FileUpload
			value={files ? files : value}
			onValueChange={handleChange}
			onFileReject={onFileReject}
			maxFiles={1}
			accept="image/*"
			className="w-full max-w-md"
		>
			<FileUploadDropzone>
				<FileUploadTrigger asChild>
					{files ? (
						<FileUploadList orientation="horizontal">
							{files.map((file) => (
								<FileUploadItem
									key={file.name}
									value={file}
									className="p-0 rounded-full"
								>
									<FileUploadItemPreview className="size-20 [&>svg]:size-12 rounded-full" />
									<FileUploadItemMetadata className="sr-only" />
									<FileUploadItemDelete asChild>
										<Button
											variant="secondary"
											size="icon"
											className="-top-1 -right-1 absolute size-5 rounded-full"
										>
											<X className="size-3" />
										</Button>
									</FileUploadItemDelete>
								</FileUploadItem>
							))}
						</FileUploadList>
					) : value ? (
						<FileUploadList orientation="horizontal">
							{value.map((file) => (
								<FileUploadItem
									key={file.name}
									value={file}
									className="p-0 rounded-full"
								>
									<FileUploadItemPreview className="size-20 [&>svg]:size-12 rounded-full" />
									<FileUploadItemMetadata className="sr-only" />
									<FileUploadItemDelete asChild>
										<Button
											variant="secondary"
											size="icon"
											className="-top-1 -right-1 absolute size-5 rounded-full"
										>
											<X className="size-3" />
										</Button>
									</FileUploadItemDelete>
								</FileUploadItem>
							))}
						</FileUploadList>
					) : (
						<div>
							<UserAvatar className="size-14" user={user} />
						</div>
					)}
				</FileUploadTrigger>
			</FileUploadDropzone>
		</FileUpload>
	);
}
