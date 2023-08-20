import {
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { NULL_FILES_DETECTED } from '../messages/constants/messages.constants';

@Injectable()
export class NullFileValidationPipe implements PipeTransform {
  public transform( file: Express.Multer.File ): Express.Multer.File {
    if (!file) {
      throw new BadRequestException(NULL_FILES_DETECTED);
    }
    return file;
  }
}