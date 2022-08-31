import {
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';
import { NULL_IMAGES_DETECTED } from '../../../messages/constants/messages.constants';

@Injectable()
export class NullFileValidationPipe implements PipeTransform {
    public transform(
        files: Express.Multer.File | Express.Multer.File[]
    ): Express.Multer.File | Express.Multer.File[] {
        if (files === undefined || files === null) {
            throw new BadRequestException(NULL_IMAGES_DETECTED);
        }
        if (Array.isArray(files) && files.length === 0) {
            throw new BadRequestException(NULL_IMAGES_DETECTED);
        }
        return files;
    }
}