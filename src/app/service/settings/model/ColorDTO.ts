import { IsOptional, IsString, Matches } from 'class-validator';
import { INVALID_COLOR_DETECTED } from '../../../messages/constants/messages.constants';
import { SimpleListSetting } from './SimpleListSetting';

export class ColorDTO extends SimpleListSetting {

    @IsString()
    @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: INVALID_COLOR_DETECTED })
    firstColor: string;

    @IsOptional()
    @IsString()
    @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: INVALID_COLOR_DETECTED })
    secondColor: string;
}
