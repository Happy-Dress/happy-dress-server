import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  DESCRIPTION_TOO_LONG,
  DESCRIPTION_TOO_SHORT,
} from '../../../messages/constants/messages.constants';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { ApiProperty } from '@nestjs/swagger';

const MIN_LENGTH_DESCRIPTION = 3;
const MAX_LENGTH_DESCRIPTION = 500;

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
    imageUrl: string;
}
