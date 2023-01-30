import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { GoodsService } from '../../../service/goods/impl/goods.service';
import { GoodDto } from '../../../service/goods/model/good.dto';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';

@Controller('goods')
export class GoodsController {

    @Inject()
    private goodsService: GoodsService;

    @Get()
    async get(): Promise<GoodDto[]> {
      return this.goodsService.getGoods();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async save(@Body() goodsDto: GoodDto[]): Promise<GoodDto[]> {
      return await this.goodsService.setGoods(goodsDto);
    }
}