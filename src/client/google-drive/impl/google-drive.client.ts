import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IGoogleDriveClient } from '../google-drive.client.abstraction';
import { UploadedImageModel } from '../models/uploaded-image.model';
import * as stream from 'stream';
import { drive_v3, google } from 'googleapis';
import * as path from 'path';
import { ImageUploadError } from '../expection/image-upload.error';
import Drive = drive_v3.Drive;

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

    public async uploadImages(images: Express.Multer.File[]): Promise<UploadedImageModel[]> {
        return await Promise.all(images.map(image => this.uploadImage(image)));
    }

    private async uploadImage(image: Express.Multer.File): Promise<UploadedImageModel> {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(image.buffer);
        try {
            const { data: { id, name } = {} } = await this.googleDriveApi.files.create({
                media: {
                    mimeType: image.mimetype,
                    body: bufferStream,
                },
                requestBody: {
                    name: image.filename,
                    parents: [process.env.PARENT_FOLDER],
                },
                fields: this.API_RESPONSE_FIELDS,
            });
            return {

                imageUrl: `${this.IMAGE_DEFAULT_URL}${id}`,
                imageName: name,

            };
        } catch (e) {
            throw new ImageUploadError(image.originalname);
        }
    }


}
