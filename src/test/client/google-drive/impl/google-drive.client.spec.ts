import { Image } from '../../../../app/service/image/model/Image.model';
import { GoogleDriveClient } from '../../../../app/client/google-drive/impl/google-drive.client';

describe('GoogleDriveClient', () => {
  let googleDriveClient: GoogleDriveClient;

    beforeEach( () => {
      googleDriveClient = new GoogleDriveClient();
    });

    describe('upload',  () => {
        it('should return failed image',  async () => {
          const images: Image[] = [
            {
              id: 0,
            } as any,
          ];
            googleDriveClient.onApplicationBootstrap();
            const actualResult = await googleDriveClient.uploadFiles(images, 'example');
            expect(actualResult.uploadedFiles.length).toBe(0);
            expect(actualResult.failedFiles.length).toBe(1);
        });

    });
});


