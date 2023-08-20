import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IProductsService } from '../../../../service/products/products.service.abstraction';
import { ProductViewDto } from '../../../../service/products/model/product.view.dto';
import { JwtAuthGuard } from '../../../security/guards/jwt.auth.guard';
import { ProductDto } from '../../../../service/products/model/product.dto';
import { ProductSearchViewDto } from '../../../../service/products/model/product-search.view.dto';
import { ProductSearchDto } from '../../../../service/products/model/product-search.dto';

@ApiTags('secure_products')
@Controller('secure/products')
export class ProductsSecureController {

    @Inject()
    private productService: IProductsService;

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({
      description: 'successful get product response',
      type: ProductViewDto,
    })
    async getProduct(@Param('id', new ParseIntPipe()) id: number): Promise<ProductViewDto> {
      return this.productService.getProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @ApiOkResponse({
      description: 'successful create product response',
      type: ProductViewDto,
    })
    async createProduct(@Body() productDto: ProductDto): Promise<ProductViewDto> {
      return await this.productService.createProduct(productDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    @ApiOkResponse({
      description: 'successful update product response',
      type: ProductViewDto,
    })
    async updateProduct(
      @Param('id', new ParseIntPipe()) id: number,
        @Body() productDto: ProductDto): Promise<ProductViewDto> {
      return await this.productService.updateProduct(id, productDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/search')
    @ApiOkResponse({
      description: 'successful search product response',
      type: ProductSearchViewDto,
    })
    async search(@Body() productSearchDto: ProductSearchDto): Promise<ProductSearchViewDto> {
      return await this.productService.searchProducts(productSearchDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteProducts(@Body() ids: Set<number>): Promise<void> {
      await this.productService.deleteProducts(ids);
    }

}