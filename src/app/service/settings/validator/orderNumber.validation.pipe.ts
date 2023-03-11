
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { INVALID_ORDER_NUMBER } from '../../../messages/constants/messages.constants';
import { GlobalDressOptionsDto } from '../../../service/settings/model/global-dress-options.dto';
import { SimpleListSetting } from '../../../service/util/model/dto/simple.list.setting';
import { SettingType } from '../../../service/settings/util/constant/setting.type.enum';

@Injectable()
export class OrderNumberValidationPipe implements PipeTransform {
  public validateSettingOrderNumbers(
    settings: SimpleListSetting[],
    settingType: SettingType
  ): void | never {
    const problematicSetting = settings.find(
      (setting, index) => setting.orderNumber != index + 1
    );
    if (!!problematicSetting) {
      throw new BadRequestException(
        INVALID_ORDER_NUMBER.replace('$DTO_NAME', settingType)
      );
    }
  }

  public transform(globalDressOptionsDto: GlobalDressOptionsDto): GlobalDressOptionsDto | never {
    this.validateSettingOrderNumbers(globalDressOptionsDto.models, SettingType.MODELS);
    this.validateSettingOrderNumbers(globalDressOptionsDto.colors, SettingType.COLORS);
    this.validateSettingOrderNumbers(globalDressOptionsDto.materials, SettingType.MATERIALS);
    this.validateSettingOrderNumbers(globalDressOptionsDto.categories, SettingType.CATEGORIES);
    return globalDressOptionsDto;
  }
}

