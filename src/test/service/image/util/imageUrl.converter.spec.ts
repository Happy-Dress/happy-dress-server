import {ImageUrlConverter} from "../../../../app/service/image/util/imageUrl.converter";
import {UploadedImageModel} from "../../../../app/client/google-drive/models/uploaded-image.model";

describe('ImageUrlConverter', () => {

    let imageUrlConverter: ImageUrlConverter;

    beforeEach( () => {
        imageUrlConverter = new ImageUrlConverter();
    });

    describe('convert',  () => {
        const wrongUrl = 'https://drive.google.com/open?id=';
        const baseUrlImage = 'http://drive.google.com/uc?export=view&id=';
        it('should convert to base url', () => {
            const images: UploadedImageModel[] = [
                {
                    imageUrl: wrongUrl,
                } as any,
            ];
            const convertResult = imageUrlConverter.convertToBaseUrl(images);
            expect(convertResult[0].imageUrl).toBe(baseUrlImage);
        });
    });
});