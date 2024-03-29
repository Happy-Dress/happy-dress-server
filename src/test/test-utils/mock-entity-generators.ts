import { ColorEntity } from '../../app/repository/settings/color/entity/color.entity';
import { SimpleListSettingEntity } from '../../app/repository/settings/simpleListSetting.entity';
import { CategoryEntity } from '../../app/repository/settings/category/entity/category.entity';
import { SizeEntity } from '../../app/repository/settings/size/enitity/size.entity';
import { ProductColorSizeEntity } from '../../app/repository/product/product-color-size/entity/product-color-size.entity';
import { ProductEntity } from '../../app/repository/product/entity/product.entity';
import {
  ProductColorImageEntity,
} from '../../app/repository/product/product-color-image/entity/product-color-image.entity';
import { BlogEntity } from '../../app/repository/blog/blog.entity';

export function generateColorEntity(): ColorEntity {
  return {
    id: 1,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
    orderNumber: 1,
  };
}

export function generateSimpleListEntity(): SimpleListSettingEntity {
  return {
    id: 1,
    name: 'plain text',
    orderNumber: 1,
  };
}

export function generateCategoryEntity(): CategoryEntity {
  return {
    id: 1,
    description: 'plain text',
    imageUrl: 'plain text',
    name: 'plain text',
    orderNumber: 1,
  };
}

export function generateSizeEntity(): SizeEntity {
  return {
    id: 1,
    sizeValue: 1,
  };
}

export function generateProductEntity(): ProductEntity {
  return {
    id: 1,
    name: 'plain text',
    description: 'plain text',
    mainImageUrl: 'plain text',
    category: generateCategoryEntity(),
    model: generateSimpleListEntity(),
    materials: [generateSimpleListEntity()],
  };
}

export function generateProductColorSizeEntity(): ProductColorSizeEntity {
  return {
    id: 1,
    product: generateProductEntity(),
    color: generateColorEntity(),
    size: generateSizeEntity(),
  };
}

export function generateProductColorImageEntity(): ProductColorImageEntity {
  return {
    id: 1,
    product: generateProductEntity(),
    color: generateColorEntity(),
    imageUrls: ['plain text'],
  };
}

export function generateBlogEntity(): BlogEntity {
  return {
    id: 1,
    name: 'plain text',
    shortDescription: 'plain text',
    isPublished: true,
    htmlLinkId: 'plain link',
  };
}
