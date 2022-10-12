import { SimpleListSetting } from './SimpleListSetting';
import { IsString, Matches } from 'class-validator';
import { INVALID_EXTENSION_OR_NOT_EXISTS_FILE_DETECTED } from '../../../messages/constants/messages.constants';

export class CategoryDTO extends SimpleListSetting {
    @IsString()
    @Matches(/([a-zA-Z0-9\s_\\.\-():])+(.jpeg|.png|.jpg)$/, { message: INVALID_EXTENSION_OR_NOT_EXISTS_FILE_DETECTED })
    imageUrl: string;
}
