import { Module } from '@nestjs/common';
import { IGoogleDriveClient } from './google-drive/google-drive.client.abstraction';
import { GoogleDriveClient } from './google-drive/impl/google-drive.client';

@Module({
  providers: [
    {
      provide: IGoogleDriveClient,
      useClass: GoogleDriveClient,
    },
  ],
  exports: [IGoogleDriveClient],
})
export class ClientModule {}
