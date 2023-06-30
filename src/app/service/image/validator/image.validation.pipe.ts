import {
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { NULL_FILES_DETECTED } from '../../../messages/constants/messages.constants';
import { Image } from '../model/Image';

@Injectable()
export class NullFilesValidationPipe implements PipeTransform {
  public transform( files: Image[] ): Image[] {
    if (!files?.length || !Array.isArray(files)) {
      throw new BadRequestException(NULL_FILES_DETECTED);
    }
    return files;
  }
}