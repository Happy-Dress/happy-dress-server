
import { Image } from '../../../../app/service/image/model/Image';
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
            const actualResult = await googleDriveClient.uploadImages(images);
            expect(actualResult.uploadedImages.length).toBe(0);
            expect(actualResult.failedImages.length).toBe(1);
        });

    });
});


