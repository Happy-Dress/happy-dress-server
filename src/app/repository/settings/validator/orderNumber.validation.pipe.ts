import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { IVALID_ORDER_NUMBER } from '../../../messages/constants/messages.constants';
import { GlobalDressOptionsDto } from '../../../service/settings/model/global-dress-options.dto';



@Injectable()
export class OrderNumberValidationPipe implements PipeTransform {

  public check(arr: number[]): boolean {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] !== index + 1) return false;
    }
    return true;
  }

  public derive(obj: GlobalDressOptionsDto): boolean {
    let key: keyof typeof obj;
    let flag = true;
    for (key in obj) {
      if (key !== 'sizes') {
        let res: number[] = [];
        res = obj[key].map((item: { orderNumber: number; }) => item.orderNumber);
        if (!this.check(res)) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  }

  public transform(obj: GlobalDressOptionsDto): GlobalDressOptionsDto | never {
    if (!this.derive(obj)) throw new BadRequestException(IVALID_ORDER_NUMBER);
    else return obj;
  }
}
