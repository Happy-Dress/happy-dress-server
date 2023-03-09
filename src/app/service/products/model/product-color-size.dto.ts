import { IsInt, IsNotEmpty } from 'class-validator';
import { EMPTY_FIELD, INVALID_TYPE_ID } from '../../../messages/constants/messages.constants';
import { ApiProperty } from '@nestjs/swagger';

export class ProductColorSizeDto {
    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Цвет') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Цвет') })
    colorId: number;

    @ApiProperty()
    @IsNotEmpty({ message: EMPTY_FIELD.replace('$TYPE', 'Размеры') })
    @IsInt({ message: INVALID_TYPE_ID.replace('$TYPE', 'Размерах') })
    sizeId: number;
}