import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ColorDto } from './color.dto';
import { ModelDto } from './model.dto';
import { MaterialDto } from './material.dto';
import { CategoryDto } from './category.dto';
import { SizeDto } from './size.dto';

export class GlobalDressOptionsDto {
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    @IsNotEmpty({ message: 'Категории являются обязательным полем' })
    categories: CategoryDto[];

    @ValidateNested({ each: true })
    @Type(() => ModelDto)
    @IsNotEmpty({ message: 'Модели являются обязательным полем' })
    models: ModelDto[];

    @ValidateNested({ each: true })
    @Type(() => MaterialDto)
    @IsNotEmpty({ message: 'Материалы являются обязательным полем' })
    materials: MaterialDto[];

    @ValidateNested({ each: true })
    @Type(() => ColorDto)
    @IsNotEmpty({ message: 'Цвета являются обязательным полем' })
    colors: ColorDto[];

    @ValidateNested({ each: true })
    @Type(() => SizeDto)
    @IsNotEmpty({ message: 'Размеры являются обязательным полем' })
    sizes: SizeDto[];
}
