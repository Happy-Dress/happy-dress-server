import { Inject, Injectable } from '@nestjs/common';
import { IGoodsService } from '../goods.service.abstraction';
import { GoodDto } from '../model/good.dto';
import { GoodsCrudService } from '../crud/goods.crud.service';

@Injectable()
export class GoodsService implements IGoodsService {
  
  @Inject()
  private goodsCrudService: GoodsCrudService;
  
  public async getGoods(): Promise<GoodDto[]> {
    return await this.goodsCrudService.getAll();
  }

  public async setGoods(goods: GoodDto[]): Promise<GoodDto[]> {
    await this.goodsCrudService.update(goods);
    return await this.goodsCrudService.getAll();
  }

}