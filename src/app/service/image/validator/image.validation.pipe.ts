import {
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';
import { NULL_IMAGES_DETECTED } from '../../../messages/constants/messages.constants';

@Injectable()
export class NullFileValidationPipe implements PipeTransform {
    public transform( files: Express.Multer.File[] ): Express.Multer.File[] {
        if (!files?.length || !Array.isArray(files)) {
            throw new BadRequestException(NULL_IMAGES_DETECTED);
        }
        return files;
    }
}