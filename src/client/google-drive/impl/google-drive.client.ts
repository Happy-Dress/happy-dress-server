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
import { FAILED_UPLOAD_GOOGLE_DRIVE } from '../../../../exceptions/constants/image.exception.constants';
import { Image } from '../../../service/image/model/Image';

@Injectable()
export class GoogleDriveClient implements IGoogleDriveClient, OnApplicationBootstrap {

    private readonly CREDENTIALS_FILE_NAME = 'creds.json';
    private readonly IMAGE_DEFAULT_URL = 'https://drive.google.com/open?id=';
    private readonly API_RESPONSE_FIELDS = 'id,name';

    private googleDriveApi: Drive;

    public onApplicationBootstrap(): any {
        const pathToCredentials = path.resolve(this.CREDENTIALS_FILE_NAME);
        const auth = new google.auth.GoogleAuth({
            keyFile: pathToCredentials,
            scopes: process.env.SCOPES,
        });
        this.googleDriveApi = google.drive({ version: 'v3', auth });
    }

    public async uploadImages(images: Image[]): Promise<ImageUploadResult> {
        const uploadedImages: UploadedImageModel[] = [];
        const failedImages: FailedUploadResult[] = [];
        const uploadResponse =  await Promise.allSettled(images.map(image => this.uploadImage(image)));
        uploadResponse.forEach(response => {
            if (response.status === 'fulfilled'){
                uploadedImages.push(response.value);
            } else {
                const error: ImageUploadError = response.reason;
                failedImages.push(error.getFailedImage());
            }
        });
        return {
            uploadedImages,
            failedImages,
        };
    }

    private async uploadImage(image: Image): Promise<UploadedImageModel> {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(image.buffer);
        try {
            const { data: { id, name } = {} } = await this.googleDriveApi.files.create({
                media: {
                    mimeType: image.mimetype,
                    body: bufferStream,
                },
                requestBody: {
                    name: image.originalname,
                    parents: [process.env.PARENT_FOLDER],
                },
                fields: this.API_RESPONSE_FIELDS,
            });
            return {
                id: image.id,
                imageUrl: `${this.IMAGE_DEFAULT_URL}${id}`,
                imageName: name,
            };
        } catch (e) {
            throw new ImageUploadError({
                id: image.id,
                imageName: image.originalname,
                reason: `${FAILED_UPLOAD_GOOGLE_DRIVE}`,
            });
        }
    }


}
