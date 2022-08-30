import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IGoogleDriveClient } from '../google-drive.client.abstraction';
import { UploadedImageModel } from '../models/uploaded-image.model';
import * as stream from 'stream';
import { drive_v3, google } from 'googleapis';
import * as path from 'path';
import { ImageUploadError } from '../expection/image-upload.error';
import Drive = drive_v3.Drive;
import { ImageUploadResult } from '../../../service/image/model/ImageUploadResult';
import { FailedUploadResult } from '../../../service/image/model/FailedUploadResult';
import { FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE } from '../../../messages/constants/messages.constants';
import { Image } from '../../../service/image/model/Image';
import Params$Resource$Files$Create = drive_v3.Params$Resource$Files$Create;

@Injectable()
export class GoogleDriveClient implements IGoogleDriveClient, OnApplicationBootstrap {

    private readonly CREDENTIALS_FILE_NAME = 'google-credentials.json';
    private readonly IMAGE_DEFAULT_URL = 'https://drive.google.com/open?id=';
    private readonly API_RESPONSE_FIELDS = 'id,name';
    private readonly STATUS_FULFILLED = 'fulfilled';
    private readonly STATUS_REJECTED = 'rejected';
    private readonly DRIVE_VERSION = 'v3';

    private googleDriveApi: Drive;

    public onApplicationBootstrap(): void {
        const pathToCredentials = path.resolve(this.CREDENTIALS_FILE_NAME);
        const auth = new google.auth.GoogleAuth({
            keyFile: pathToCredentials,
            scopes: process.env.SCOPES,
        });
        this.googleDriveApi = google.drive({ version: this.DRIVE_VERSION, auth });
    }

    public async uploadImages(images: Image[]): Promise<ImageUploadResult> {
        const uploadResponse = await Promise.allSettled(images.map(image => this.uploadImage(image)));
        const uploadedImages = this.getUploadedImages(uploadResponse);
        const failedImages = this.getFailedImages(uploadResponse);
        return {
            uploadedImages,
            failedImages,
        };
    }

    private getUploadedImages(uploadResponse: PromiseSettledResult<UploadedImageModel>[]): UploadedImageModel[] {
        return uploadResponse
            .filter(response => response.status === this.STATUS_FULFILLED)
            .map(response => response as PromiseFulfilledResult<UploadedImageModel>)
            .map(response => response.value);
    }

    private getFailedImages(uploadResponse: PromiseSettledResult<UploadedImageModel>[]): FailedUploadResult[] {
        return uploadResponse
            .filter(response => response.status === this.STATUS_REJECTED)
            .map(response => response as PromiseRejectedResult)
            .map(response => (response.reason as ImageUploadError).getFailedImage());
    }

    private async uploadImage(image: Image): Promise<UploadedImageModel> {
        const params = this.getImageCreateParams(image);
        try {
            const { data: { id, name } = {} } = await this.googleDriveApi.files.create(params);
            return {
                id: image.id,
                imageUrl: `${this.IMAGE_DEFAULT_URL}${id}`,
                imageName: name,
            };
        } catch (e) {
            throw new ImageUploadError({
                id: image.id,
                imageName: image.originalname,
                reason: `${FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE}`,
            });
        }
    }

    private getImageCreateParams(image: Image): Params$Resource$Files$Create {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(image.buffer);
        return {
            media: {
                mimeType: image.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: image.originalname,
                parents: [process.env.PARENT_FOLDER],
            },
            fields: this.API_RESPONSE_FIELDS,
        };
    }

}