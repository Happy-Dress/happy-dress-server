import { Injectable } from '@nestjs/common';
import { CategoryDTO } from '../model/CategoryDTO';
import { GlobalDressOptionsDTO } from '../model/GlobalDressOptionsDTO';

@Injectable()
export class GlobalDressOptionsConverter{
  public convertToDTO(categories: CategoryDTO[]): GlobalDressOptionsDTO{
    return {
      categories,
    };
  }
}