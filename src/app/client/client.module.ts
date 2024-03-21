import { Module } from '@nestjs/common';
import { IGoogleDriveClient } from './google-drive/google-drive.client.abstraction';
import { GoogleDriveClient } from './google-drive/impl/google-drive.client';
import { ICloudStorageClient } from './cloud-storage/cloud-storage.client.abstraction';
import { CloudStorageClient } from './cloud-storage/impl/cloud-storage-client';

@Module({
  providers: [
    {
      provide: IGoogleDriveClient,
      useClass: GoogleDriveClient,
    },
    {
      provide: ICloudStorageClient,
      useClass: CloudStorageClient,
    },
  ],
  exports: [IGoogleDriveClient, ICloudStorageClient],
})
export class ClientModule {}
