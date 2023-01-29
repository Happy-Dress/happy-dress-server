import { ColorEntity } from '../../app/repository/settings/color/entity/color.entity';
import { SimpleListSettingEntity } from '../../app/repository/settings/simpleListSetting.entity';
import { CategoryEntity } from '../../app/repository/settings/category/entity/category.entity';

export function generateColorEntity(): ColorEntity {
  return {
    id: 0,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
  };
}

export function generateSimpleListEntity(): SimpleListSettingEntity {
  return {
    id: 1,
    name: 'plain text',
  };
}

export function generateCategoryEntity(): CategoryEntity {
  return {
    id: 1,
    description: 'Для свадебных платьев',
    imageUrl: 'image.jpg',
    name: 'Свадебные',
  };
}
