import { UploadedFileModel } from '../../../client/google-drive/models/uploaded-file.model';

export class BlogUploadResultDto implements UploadedFileModel {
    id: number;
    fileName: string;
    fileUrl: string;
}