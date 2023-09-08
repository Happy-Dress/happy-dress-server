import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {
  BLOG_NAME_TOO_LONG,
  BLOG_NAME_TOO_SHORT,
  BLOG_SHORT_DESCRIPTION_TOO_LONG,
  BLOG_SHORT_DESCRIPTION_TOO_SHORT,
  EMPTY_FIELD,
  FIELD_MUST_BE_STRING,
  INVALID_BOOLEAN_FIELD,
} from '../../../messages/constants/messages.constants';

const MIN_LENGTH_SHORT_DESCRIPTION = 3;
const MAX_LENGTH_SHORT_DESCRIPTION = 250;
const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 20;

export class BlogDto implements IdentifiedModel {
    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Имя') })
    @IsString({ message: FIELD_MUST_BE_STRING.replace('$FIELD', 'Имя') })
    @MinLength(MIN_LENGTH_NAME, { message: BLOG_NAME_TOO_SHORT })
    @MaxLength(MAX_LENGTH_NAME, { message: BLOG_NAME_TOO_LONG })
    //@Matches(/^(?!\s+$)[a-zA-Z0-9а-яА-ЯёЁ\s]*$/, { message: INVALID_BLOG_NAME })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Краткая описание') })
    @IsString({ message: FIELD_MUST_BE_STRING.replace('$FIELD', 'Краткая описание') })
    @MinLength(MIN_LENGTH_SHORT_DESCRIPTION, { message: BLOG_SHORT_DESCRIPTION_TOO_SHORT })
    @MaxLength(MAX_LENGTH_SHORT_DESCRIPTION, { message: BLOG_SHORT_DESCRIPTION_TOO_LONG })
    //@Matches(/^(?=.*[^ ]).+$/, { message: INVALID_BLOG_SHORT_DESCRIPTION })
    shortDescription: string;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Опубликован') })
    @IsBoolean({ message: INVALID_BOOLEAN_FIELD.replace('$FIELD', 'Опубликован') })
    isPublished: boolean;
    
    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'HTML-ссылка-id') })
    @IsString({ message: FIELD_MUST_BE_STRING.replace('$FIELD', 'HTML-ссылка-id') })
    htmlLinkId: string;
}