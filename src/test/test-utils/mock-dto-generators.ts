import { CategoryDto } from '../../app/service/settings/model/category.dto';
import { ModelDto } from '../../app/service/settings/model/model.dto';
import { MaterialDto } from '../../app/service/settings/model/material.dto';
import { ColorDto } from '../../app/service/settings/model/color.dto';
import { GlobalDressOptionsDto } from '../../app/service/settings/model/global-dress-options.dto';
import { SimpleListSetting } from '../../app/service/util/model/dto/simple.list.setting';
import { SizeDto } from '../../app/service/settings/model/size.dto';
import { ProductViewDto } from '../../app/service/products/model/product.view.dto';
import { ProductColorSizeViewDto } from '../../app/service/products/model/product-color-size.view.dto';
import { ProductColorImageViewDto } from '../../app/service/products/model/product-color-image.view.dto';
import { ProductDto } from '../../app/service/products/model/product.dto';
import { ProductColorSizeDto } from '../../app/service/products/model/product-color-size.dto';
import { ProductColorImageDto } from '../../app/service/products/model/product-color-image.dto';
import { ProductSearchDto } from '../../app/service/products/model/product-search.dto';
import { ProductSearchViewDto } from '../../app/service/products/model/product-search.view.dto';
import { BlogDto } from '../../app/service/blog/model/blog.dto';

export function generateGlobalDressOptionsDto(): GlobalDressOptionsDto {
  return {
    categories: [generateCategoryDto()],
    colors: [generateColorDto()],
    materials: [generateMaterialDto()],
    models: [generateModelDto()],
    sizes: [generateSizeDto()],
  };
}

export function generateCategoryDto(): CategoryDto {
  return {
    id: 1,
    description: 'plain text',
    imageUrl: 'plain text',
    name: 'plain text',
    orderNumber: 1,
  };
}

export function generateModelDto(): ModelDto {
  return {
    name: 'plain text',
    orderNumber: 1,
  };
}

export function generateMaterialDto(): MaterialDto {
  return {
    name: 'plain text',
    orderNumber: 1,
  };
}

export function generateColorDto(): ColorDto {
  return {
    id: 1,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
    orderNumber: 1,
  };
}

export function generateSizeDto(): SizeDto {
  return {
    id: 1,
    sizeValue: 1,
  };
}

export function generateProductDto(): ProductDto {
  return {
    id: 1,
    name: 'plain text',
    description: 'plain text',
    mainImageUrl: 'plain text',
    categoryId: 1,
    modelId: 1,
    materialIds: [1],
    productColorSizes: [generateProductColorSizeDto()],
    productColorImages: [generateProductColorImageDto()],
  };
}

export function generateProductColorSizeDto(): ProductColorSizeDto {
  return {
    colorId: 1,
    sizeId: 1,
  };
}

export function generateProductColorImageDto(): ProductColorImageDto {
  return {
    colorId: 1,
    imageURLs: ['plain text'],
  };
}


export function generateSimpleListSetting(): SimpleListSetting {
  return {
    id: 1,
    name: 'plain text',
    orderNumber: 1,
  };
}

export function generateProductColorSizeViewDto(): ProductColorSizeViewDto {
  return {
    size: generateSizeDto(),
    color: generateColorDto(),
  };
}

export function generateProductColorImageViewDto(): ProductColorImageViewDto {
  return {
    color: generateColorDto(),
    imageURLs: ['plain text'],
  };
}

export function generateProductViewDto(): ProductViewDto {
  return {
    id: 1,
    name: 'plain text',
    description: 'plain text',
    mainImageUrl: 'plain text',
    category: generateCategoryDto(),
    model: generateModelDto(),
    materials: [generateModelDto()],
    productColorSizes: [generateProductColorSizeViewDto()],
    productColorImages: [generateProductColorImageViewDto()],
  };
}

export function generateProductSearchDto(): ProductSearchDto {
  return {
    page: 1,
    limit: 1,
    name: 'plain text',
    categoryId: 1,
    materialIds: [1],
    modelIds: [1],
  };
}

export function generateProductSearchViewDto(): ProductSearchViewDto {
  const productSearchDto = generateProductSearchDto();
  return {
    products: [generateProductViewDto()],
    itemsPerPage: productSearchDto.limit,
    totalPages: 1,
    currentPage: productSearchDto.page,
    totalItems: 1,
  };
}

export function generateBlogDto(): BlogDto {
  return {
    id: 1,
    name: 'plain text',
    shortDescription: 'plain text',
    isPublished: true,
    htmlLinkBlog: 'plain link',
  };
}
