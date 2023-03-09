import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ColorDto } from './color.dto';
import { ModelDto } from './model.dto';
import { MaterialDto } from './material.dto';
import { CategoryDto } from './category.dto';
import { SizeDto } from './size.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GlobalDressOptionsDto {
    @ApiProperty({ type: [CategoryDto] })
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    @IsNotEmpty({ message: 'Категории являются обязательным полем' })
    categories: CategoryDto[];

    @ApiProperty({ type: [ModelDto] })
    @ValidateNested({ each: true })
    @Type(() => ModelDto)
    @IsNotEmpty({ message: 'Модели являются обязательным полем' })
    models: ModelDto[];

    @ApiProperty({ type: [MaterialDto] })
    @ValidateNested({ each: true })
    @Type(() => MaterialDto)
    @IsNotEmpty({ message: 'Материалы являются обязательным полем' })
    materials: MaterialDto[];

    @ApiProperty({ type: [ColorDto] })
    @ValidateNested({ each: true })
    @Type(() => ColorDto)
    @IsNotEmpty({ message: 'Цвета являются обязательным полем' })
    colors: ColorDto[];

    @ApiProperty({ type: [SizeDto] })
    @ValidateNested({ each: true })
    @Type(() => SizeDto)
    @IsNotEmpty({ message: 'Размеры являются обязательным полем' })
    sizes: SizeDto[];
}
