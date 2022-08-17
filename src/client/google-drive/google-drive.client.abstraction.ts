import { ImageUploadResult } from '../../service/image/model/ImageUploadResult';
import { Image } from '../../service/image/model/Image';

export abstract class IGoogleDriveClient {

    public abstract uploadImages(images: Image[]): Promise<ImageUploadResult>;
}
