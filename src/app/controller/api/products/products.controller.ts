import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductDto } from '../../../service/products/model/product.dto';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { IProductsService } from '../../../service/products/products.service.abstraction';
import { ProductViewDto } from '../../../service/products/model/product.view.dto';
import { ProductSearchDto } from '../../../service/products/model/product-search.dto';
import { ProductSearchViewDto } from '../../../service/products/model/product-search.view.dto';


@Controller('products')
export class ProductsController {

    @Inject()
    private productService: IProductsService;

    @Get(':id')
    async getProduct(@Param('id', new ParseIntPipe()) id: number): Promise<ProductViewDto> {
      return this.productService.getProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createProduct(@Body() productDto: ProductDto): Promise<ProductViewDto> {
      return await this.productService.createProduct(productDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    async updateProduct(
      @Param('id', new ParseIntPipe()) id: number,
        @Body() productDto: ProductDto): Promise<ProductViewDto> {
      return await this.productService.updateProduct(id, productDto);
    }

    @Put('/search')
    async search(@Body() productSearchDto: ProductSearchDto): Promise<ProductSearchViewDto> {
      return await this.productService.searchProducts(productSearchDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
      await this.productService.deleteProduct(id);
    }

}
