import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IGoogleDriveClient } from '../google-drive.client.abstraction';
import { UploadedFileModel } from '../models/UploadedFile.model';
import * as stream from 'stream';
import { drive_v3, google } from 'googleapis';
import * as path from 'path';
import { FileUploadError } from '../expection/file-upload.error';
import Drive = drive_v3.Drive;
import { FilesUploadResult } from '../models/FilesUploadResult.model';
import { FailedUploadResult } from '../models/FailedUploadResult.model';
import {
  FAILED_DOWNLOAD_GOOGLE_DRIVE_MESSAGE,
  FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE,
} from '../../../messages/constants/messages.constants';
import Params$Resource$Files$Create = drive_v3.Params$Resource$Files$Create;
import { GaxiosPromise } from '@googleapis/docs';
import { FileDownloadError } from '../expection/file-download.error';
import { DownloadedFileModel } from '../models/DownloadedFile.model';

@Injectable()
export class GoogleDriveClient implements IGoogleDriveClient, OnApplicationBootstrap {

    private readonly CREDENTIALS_FILE_NAME = 'google-credentials.json';
    private readonly API_RESPONSE_FIELDS = 'id,name';
    private readonly STATUS_FULFILLED = 'fulfilled';
    private readonly STATUS_REJECTED = 'rejected';
    private readonly DRIVE_VERSION = 'v3';
    private readonly FOLDER_MIMETYPE = 'application/vnd.google-apps.folder';

    private googleDriveApi: Drive;

    public onApplicationBootstrap(): void {
      const pathToCredentials = path.resolve(this.CREDENTIALS_FILE_NAME);
      const auth = new google.auth.GoogleAuth({
        keyFile: pathToCredentials,
        scopes: process.env.SCOPES,
      });
      this.googleDriveApi = google.drive({ version: this.DRIVE_VERSION, auth });
    }

    public async uploadFiles(files: Express.Multer.File[], folderName: string): Promise<FilesUploadResult> {
      const uploadResponse = await Promise.allSettled(files.map((file, index) => this.uploadFile(file, folderName, index)));
      const uploadedFiles = this.getUploadedFiles(uploadResponse);
      const failedFiles = this.getFailedFiles(uploadResponse);
      return {
        uploadedFiles,
        failedFiles,
      };
    }

    public async uploadFile(file: Express.Multer.File, folderName: string, fileId?: number): Promise<UploadedFileModel> {
      try {
        const folderId = await this.getFolderId(folderName);
        const params = this.getCreatingParams(file, folderId);
        const { data: { id, name } = {} } = await this.googleDriveApi.files.create(params);
        return {
          id: fileId || 0,
          fileId: id,
          fileName: name,
        };
      } catch (e) {
        throw new FileUploadError({
          id: fileId || 0,
          fileName: file.originalname,
          reason: `${FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE}`,
        });
      }
    }

    public async downloadFile(fileId: string, id?: number): Promise<DownloadedFileModel> {
      try {
        const downloadedFile = await this.googleDriveApi.files.get({ fileId, alt: 'media' });
        return {
          id: id || 0,
          file: downloadedFile.data,
        };
      } catch (e) {
        throw new FileDownloadError({
          id: 0,
          fileId,
          reason: `${FAILED_DOWNLOAD_GOOGLE_DRIVE_MESSAGE}`,
        });
      }
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

    private getCreatingParams(file: Express.Multer.File, folderId: string): Params$Resource$Files$Create {
      const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        return {
          media: {
            mimeType: file.mimetype,
            body: bufferStream,
          },
          requestBody: {
            name: file.originalname,
            parents: [folderId],
          },
          fields: this.API_RESPONSE_FIELDS,
        };
    }

    private async getFolderId(folderName: string): Promise<string> {
      const folderMetadata = this.getFolderMetadata(folderName);
      const existingFolders = await this.getExistingFoldersByName(folderName);
      if (existingFolders.data.files.length > 0) {
        return existingFolders.data.files[0].id;
      } else {
        const file = await this.googleDriveApi.files.create({
          requestBody: folderMetadata,
          fields: 'id',
        });
        return file.data.id;
      }
    }

    private async getExistingFoldersByName(folderName: string): Promise<GaxiosPromise<drive_v3.Schema$FileList>> {
      return await this.googleDriveApi.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
        spaces: 'drive',
      });
    }

    private getFolderMetadata(folderName: string): drive_v3.Schema$File {
      return {
        name: folderName,
        mimeType: this.FOLDER_MIMETYPE,
      };
    }

}