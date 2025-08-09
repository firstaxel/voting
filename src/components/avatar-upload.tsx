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
import { AvatarFallback } from "@radix-ui/react-avatar";
import type { User } from "better-auth";
import { Plus, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";

export function AvatarUploader({
	user,
	onChange,
	image,
	value,
}: {
	user?: User;
	image?: string;
	value: File[] | undefined;
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
					) : value && value.length > 0 ? (
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
							<Avatar className="size-20">
								<AvatarImage
									src={user?.image ? user.image : image}
									className="object-cover"
								/>
								<AvatarFallback className="flex items-center justify-center h-full w-full border rounded-full">
									<Plus />
								</AvatarFallback>
							</Avatar>
						</div>
					)}
				</FileUploadTrigger>
			</FileUploadDropzone>
		</FileUpload>
	);
}
