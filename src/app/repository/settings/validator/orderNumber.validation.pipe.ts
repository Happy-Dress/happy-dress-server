import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { IVALID_ORDER_NUMBER } from '../../../messages/constants/messages.constants';
import { GlobalDressOptionsDto } from '../../../service/settings/model/global-dress-options.dto';
@Injectable()
export class OrderNumberValidationPipe implements PipeTransform {
  public validateSettingOrderNumbers(obj: GlobalDressOptionsDto, title: string): (void | never) {
    obj[title].forEach((value: any, index: number) => {
      const step = Object.values(obj[title]);
      if (!step.includes(index + 1) ) throw new BadRequestException(IVALID_ORDER_NUMBER) ;
    });
  }

  public transform(obj: GlobalDressOptionsDto): GlobalDressOptionsDto | never {
    try {
      this.validateSettingOrderNumbers(obj, 'colors');
      this.validateSettingOrderNumbers(obj, 'categories');
      this.validateSettingOrderNumbers(obj, 'materials');
      this.validateSettingOrderNumbers(obj, 'models');
      return obj;
    } catch (e) {
      throw new BadRequestException(IVALID_ORDER_NUMBER);
    }
  }
}
