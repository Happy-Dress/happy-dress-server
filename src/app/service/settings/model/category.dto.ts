import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  DESCRIPTION_TOO_LONG,
  DESCRIPTION_TOO_SHORT,
  INVALID_DESCRIPTION_DETECTED, INVALID_GOOGLE_DRIVE_LINK,
} from '../../../messages/constants/messages.constants';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { ApiProperty } from '@nestjs/swagger';

const MIN_LENGTH_DESCRIPTION = 3;
const MAX_LENGTH_DESCRIPTION = 100;

export class CategoryDto extends SimpleListSetting {

    @ApiProperty()
    @IsString()
    @MinLength(MIN_LENGTH_DESCRIPTION, { message: DESCRIPTION_TOO_SHORT })
    @MaxLength(MAX_LENGTH_DESCRIPTION, { message: DESCRIPTION_TOO_LONG })
    //@Matches(/^[а-яА-Яa-zA-Z0-9_.,:— \-]+$/, { message: INVALID_DESCRIPTION_DETECTED })
    //@Matches(/^\S.*\S$/, { message: INVALID_DESCRIPTION_DETECTED })
    description: string;

    @ApiProperty()
    @IsString()
    @Matches(/http:\/\/drive.google.com\/uc\?export=view&id=/, { message: INVALID_GOOGLE_DRIVE_LINK })
    imageUrl: string;
}
