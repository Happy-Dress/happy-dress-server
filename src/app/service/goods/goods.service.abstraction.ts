import { GoodDto } from './model/good.dto';

export abstract class IGoodsService {
  abstract getGoods(): Promise<GoodDto[]>;

  abstract setGoods(goods: GoodDto[]): Promise<GoodDto[]>;
}