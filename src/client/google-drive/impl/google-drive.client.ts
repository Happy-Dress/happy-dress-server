import { Injectable } from '@nestjs/common';
import { IGoogleDriveClient } from '../google-drive.client.abstraction';
import { UploadedImageModel } from '../models/uploaded-image.model';
import * as stream from 'stream';
import { google } from 'googleapis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');


@Injectable()
export class GoogleDriveClient implements IGoogleDriveClient {

    public async uploadImages(images: Express.Multer.File[]): Promise<UploadedImageModel[]> {
        const [image] = images;
        const KEYFILEPATH = path.resolve( 'creds.json');
        const SCOPES = ['https://www.googleapis.com/auth/drive'];

        const auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
        const driveService = google.drive({ version: 'v3', auth });
        const bufferStream = new stream.PassThrough();
        bufferStream.end(image.buffer);

        const { data: { id, name } = {} } = await driveService.files.create({
            media: {
                mimeType: image.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: image.filename,
                parents: ['1fleq_ZS4aUgHtVGTxiDsDv9xDG1QuCtg'],
            },
            fields: 'id,name',
        });
        return [
            {
                imageUrl: `https://drive.google.com/open?id=${id}`,
                imageName: name,
            },
        ];
    }

}
