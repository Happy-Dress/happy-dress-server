import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IProductsService } from '../../../../service/products/products.service.abstraction';
import { ProductViewDto } from '../../../../service/products/model/product.view.dto';
import { ProductSearchDto } from '../../../../service/products/model/product-search.dto';
import { ProductSearchViewDto } from '../../../../service/products/model/product-search.view.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('products')
@Controller('products')
export class ProductsController {

    @Inject()
    private productService: IProductsService;
    
    @Get(':id')
    @ApiOkResponse({
      description: 'successful get product response',
      type: ProductViewDto,
    })
    async getProduct(@Param('id', new ParseIntPipe()) id: number): Promise<ProductViewDto> {
      return this.productService.getProduct(id);
    }

    @Post('/search')
    @ApiOkResponse({
      description: 'successful search product response',
      type: ProductSearchViewDto,
    })
    async search(@Body() productSearchDto: ProductSearchDto): Promise<ProductSearchViewDto> {
      return await this.productService.searchProducts(productSearchDto);
    }
}
