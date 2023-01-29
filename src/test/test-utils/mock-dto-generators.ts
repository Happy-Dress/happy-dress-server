import { CategoryDto } from '../../app/service/settings/model/category.dto';
import { ModelDto } from '../../app/service/settings/model/model.dto';
import { MaterialDto } from '../../app/service/settings/model/material.dto';
import { ColorDto } from '../../app/service/settings/model/color.dto';
import { GlobalDressOptionsDto } from '../../app/service/settings/model/global-dress-options.dto';
import { SimpleListSetting } from '../../app/service/util/model/dto/SimpleListSetting';

export function generateGlobalDressOptionsDto(): GlobalDressOptionsDto {
  return {
    categories: [generateCategoryDto()],
    colors: [generateColorDto()],
    materials: [generateMaterialDto()],
    models: [generateModelDto()],
  };
}

export function generateCategoryDto(): CategoryDto {
  return {
    id: 1,
    description: 'Для свадебных платьев',
    imageUrl: 'image.jpg',
    name: 'Свадебные',
  };
}

export function generateModelDto(): ModelDto {
  return {
    id: 1,
    name: 'Пышное',
  };
}

export function generateMaterialDto(): MaterialDto {
  return {
    id: 1,
    name: 'Фатин',
  };
}

export function generateColorDto(): ColorDto {
  return {
    id: 0,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
  };
}

export function generateSimpleListSetting(): SimpleListSetting {
  return {
    id: 1,
    name: 'plain text',
  };
}
