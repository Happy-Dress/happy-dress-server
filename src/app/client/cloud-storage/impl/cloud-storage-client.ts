import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ICloudStorageClient } from '../cloud-storage.client.abstraction';
import { FilesUploadResult } from '../../google-drive/models/FilesUploadResult.model';
import { Bucket, Storage } from '@google-cloud/storage';
import * as path from 'path';
import { UploadedFileModel } from '../../google-drive/models/UploadedFile.model';
import { FailedUploadResult } from '../../google-drive/models/FailedUploadResult.model';
import { FileUploadError } from '../../google-drive/expection/file-upload.error';


@Injectable()
export class CloudStorageClient implements ICloudStorageClient, OnApplicationBootstrap {
    private readonly CREDENTIALS_FILE_NAME = 'google-credentials.json';
    private readonly STATUS_FULFILLED = 'fulfilled';
    private readonly STATUS_REJECTED = 'rejected';

    private bucket: Bucket;

    public onApplicationBootstrap(): any {
      const pathToCredentials = path.resolve(this.CREDENTIALS_FILE_NAME);

      const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        keyFilename: pathToCredentials,
      });
      this.bucket = storage.bucket(process.env.BUCKET_NAME);
    }

    public async uploadFiles(images: Express.Multer.File[], folderName: string): Promise<FilesUploadResult> {
      const uploadResponse = await Promise.allSettled(images.map((file, index) => this.uploadFile(file, folderName, index)));
      const uploadedFiles = this.getUploadedFiles(uploadResponse);
      const failedFiles = this.getFailedFiles(uploadResponse);
      return {
        uploadedFiles,
        failedFiles,
      };
    }

    private getUploadedFiles(uploadResponse: PromiseSettledResult<UploadedFileModel>[]): UploadedFileModel[] {
      return uploadResponse
        .filter(response => response.status === this.STATUS_FULFILLED)
        .map(response => response as PromiseFulfilledResult<UploadedFileModel>)
        .map(response => response.value);
    }

    private getFailedFiles(uploadResponse: PromiseSettledResult<UploadedFileModel>[]): FailedUploadResult[] {
      return uploadResponse
        .filter(response => response.status === this.STATUS_REJECTED)
        .map(response => response as PromiseRejectedResult)
        .map(response => (response.reason as FileUploadError).getFailedFiles());
    }

    private async uploadFile(file: Express.Multer.File, folderName: string, fileId?: number): Promise<UploadedFileModel> {
      try {
        const blob = this.bucket.file(file.originalname);
        const stream = blob.createWriteStream();
        stream.end(file.buffer);
        return Promise.resolve({
          id: fileId,
          fileName: file.originalname,
          fileId: blob.name,
        });
      } catch (err) {
        throw err;
      }

    }


}