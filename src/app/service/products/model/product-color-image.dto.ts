import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';
import { EMPTY_FIELD, INVALID_GOOGLE_DRIVE_LINK, INVALID_TYPE_ID } from '../../../messages/constants/messages.constants';

export class ProductColorImageDto {
    
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Цвет') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Цвет') })
    colorId: number;

    @IsString()
    @Matches(/http:\/\/drive.google.com\/uc\?export=view&id=/, { message: INVALID_GOOGLE_DRIVE_LINK })
    mainImageUrl: string;

    imageURLs: string[];
}