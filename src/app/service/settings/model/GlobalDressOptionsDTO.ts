import { SimpleListSetting } from './SimpleListSetting';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GlobalDressOptionsDTO {
    @ValidateNested({ each: true })
    @Type(() => SimpleListSetting)
    @IsNotEmpty({ message: 'Категории являются обязательным полем' })
    categories: SimpleListSetting[];

    @ValidateNested({ each: true })
    @Type(() => SimpleListSetting)
    @IsNotEmpty({ message: 'Модели являются обязательным полем' })
    models: SimpleListSetting[];
  // materials: MaterialDTO[];
  // colors: ColorDTO[];
    
}