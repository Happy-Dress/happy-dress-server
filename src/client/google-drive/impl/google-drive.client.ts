import { Injectable } from '@nestjs/common';
import { IGoogleDriveClient } from '../google-drive.client.abstraction';

@Injectable()
export class GoogleDriveClient implements IGoogleDriveClient{

    public uploadImages(): void {
        throw new Error('not yest implemented');
    }
}
