import { SimpleListSetting } from './SimpleListSetting';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDTO } from './CategoryDTO';
import { ColorDTO } from './ColorDTO';

export class GlobalDressOptionsDTO {
    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @IsNotEmpty({ message: 'Категории являются обязательным полем' })
    categories: CategoryDTO[];

    @ValidateNested({ each: true })
    @Type(() => SimpleListSetting)
    @IsNotEmpty({ message: 'Модели являются обязательным полем' })
    models: SimpleListSetting[];

    @ValidateNested({ each: true })
    @Type(() => SimpleListSetting)
    @IsNotEmpty({ message: 'Материалы являются обязательным полем' })
    materials: SimpleListSetting[];

    @ValidateNested({ each: true })
    @Type(() => ColorDTO)
    @IsNotEmpty({ message: 'Цвета являются обязательным полем' })
    colors: ColorDTO[];
    
}