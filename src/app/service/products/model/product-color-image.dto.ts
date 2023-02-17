import { IsInt, IsNotEmpty } from 'class-validator';
import { EMPTY_FIELD, INVALID_TYPE_ID } from '../../../messages/constants/messages.constants';

export class ProductColorImageDto {
    
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Цвет') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Цвет') })
    colorId: number;

    imageURLs: string[];
}