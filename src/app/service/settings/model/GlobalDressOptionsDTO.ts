import { SimpleListSetting } from './SimpleListSetting';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDTO } from './CategoryDTO';

export class GlobalDressOptionsDTO {
    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @IsNotEmpty({ message: 'Категории являются обязательным полем' })
    categories: CategoryDTO[];

    @ValidateNested({ each: true })
    @Type(() => SimpleListSetting)
    @IsNotEmpty({ message: 'Модели являются обязательным полем' })
    models: SimpleListSetting[];
  // materials: MaterialDTO[];
  // colors: ColorDTO[];
    
}