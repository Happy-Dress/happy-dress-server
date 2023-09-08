import { UploadedFileModel } from '../../../client/google-drive/models/UploadedFile.model';

export class BlogUploadResultDto implements UploadedFileModel {
    id: number;
    fileName: string;
    fileId: string;
}