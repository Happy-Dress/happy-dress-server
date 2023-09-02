import { IsInt, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';
import {
  INVALID_NAME_DETECTED,
  NAME_TOO_LONG,
  NAME_TOO_SHORT,
} from '../../../../messages/constants/messages.constants';
import { IdentifiedModel } from './identified.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 20;

export class SimpleListSetting implements IdentifiedModel {

  @ApiPropertyOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @MinLength(MIN_LENGTH_NAME, { message: NAME_TOO_SHORT })
  @MaxLength(MAX_LENGTH_NAME, { message: NAME_TOO_LONG })
  @Matches(/^[а-яА-Яa-zA-Z0-9_.,—: \-]+$/, { message: INVALID_NAME_DETECTED })
  @Matches(/^\S.*\S$/, { message: INVALID_NAME_DETECTED })
  name: string;

  @IsInt()
  @Min(1)
  orderNumber: number;
}
