import {
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { GlobalDressOptionsDTO } from '../model/GlobalDressOptionsDTO';
import { NULL_SETTINGS_DETECTED } from '../../../messages/constants/messages.constants';

@Injectable()
export class NullSettingsValidationPipe implements PipeTransform {
  public transform( globalDressOptionsDTO: GlobalDressOptionsDTO ): GlobalDressOptionsDTO {
    if (!globalDressOptionsDTO.categories?.length || !Array.isArray(globalDressOptionsDTO.categories)) {
      throw new BadRequestException(NULL_SETTINGS_DETECTED);
    }
    return globalDressOptionsDTO;
  }
}