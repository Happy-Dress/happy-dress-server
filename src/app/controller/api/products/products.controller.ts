import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ProductDto } from '../../../service/products/model/productDto';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { IProductsService } from '../../../service/products/products.service.abstraction';

@Controller('products')
export class ProductsController {

    @Inject()
    private goodsService: IProductsService;

    @Get(':id')
    async getProduct(@Param('id', new ParseIntPipe()) id: number): Promise<ProductDto> {
      return this.goodsService.getProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addProduct(@Body() productDto: ProductDto): Promise<void> {
      await this.goodsService.addProduct(productDto);
    }
}