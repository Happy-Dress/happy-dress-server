import { Injectable } from '@nestjs/common';
import { UploadedImageModel } from '../../../client/google-drive/models/uploaded-image.model';

const wrongUrl = 'https://drive.google.com/open?id=';
const baseUrlImage = 'http://drive.google.com/uc?export=view&id=';

@Injectable()
export class ImageUrlConverter {

  public convertToBaseUrl(images: UploadedImageModel[]): UploadedImageModel[] {
    return images.map((image) => {
      image.imageUrl = image.imageUrl.replace(wrongUrl, baseUrlImage);
      return image;
    });
  }

}