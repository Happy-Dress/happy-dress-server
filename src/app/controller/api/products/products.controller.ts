import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ProductDto } from '../../../service/products/model/productDto';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { IProductsService } from '../../../service/products/products.service.abstraction';
import { UpdateProductDto } from '../../../service/products/model/updateProductDto';


@Controller('products')
export class ProductsController {

    @Inject()
    private productService: IProductsService;

    @Get(':id')
    async getProduct(@Param('id', new ParseIntPipe()) id: number): Promise<ProductDto> {
      return this.productService.getProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async addProduct(@Body() productDto: UpdateProductDto): Promise<ProductDto> {
      return await this.productService.addProduct(productDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
      await this.productService.deleteProduct(id);
    }

}