import { IsOptional, IsString, Matches } from 'class-validator';
import { INVALID_COLOR_DETECTED } from '../../../messages/constants/messages.constants';
import { SimpleListSetting } from '../../util/model/dto/simple.list.setting';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ColorDto extends SimpleListSetting {

    @ApiProperty()
    @IsString()
    @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: INVALID_COLOR_DETECTED })
    firstColor: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: INVALID_COLOR_DETECTED })
    secondColor: string;
}
