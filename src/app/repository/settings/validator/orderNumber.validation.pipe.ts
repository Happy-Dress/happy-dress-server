<<<<<<< HEAD
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { INVALID_ORDER_NUMBER } from '../../../messages/constants/messages.constants';
=======
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { IVALID_ORDER_NUMBER } from '../../../messages/constants/messages.constants';
>>>>>>> 46e706aebb09d660ebab4e5244128a561adbaeba
import { GlobalDressOptionsDto } from '../../../service/settings/model/global-dress-options.dto';
import { SimpleListSetting } from '../../../service/util/model/dto/simple.list.setting';
import { SettingType } from '../../../service/settings/util/constant/setting.type.enum';

@Injectable()
export class OrderNumberValidationPipe implements PipeTransform {
<<<<<<< HEAD
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

  public transform(
    globalDressOptionsDto: GlobalDressOptionsDto
  ): GlobalDressOptionsDto | never {
    this.validateSettingOrderNumbers(
      globalDressOptionsDto.models,
      SettingType.MODELS
    );
    this.validateSettingOrderNumbers(
      globalDressOptionsDto.colors,
      SettingType.COLORS
    );
    this.validateSettingOrderNumbers(
      globalDressOptionsDto.materials,
      SettingType.MATERIALS
    );
    this.validateSettingOrderNumbers(
      globalDressOptionsDto.categories,
      SettingType.CATEGORIES
    );
=======
  public validateSettingOrderNumbers(settings: SimpleListSetting[], settingType: SettingType): (void | never) {
    const problematicSetting = settings.find((setting, index) => setting.orderNumber != index);
    if (!!problematicSetting) {
      throw new BadRequestException(IVALID_ORDER_NUMBER.replace('$DTO_NAME', settingType));
    }
  }

  public transform(globalDressOptionsDto: GlobalDressOptionsDto): GlobalDressOptionsDto | never {
    this.validateSettingOrderNumbers(globalDressOptionsDto.models, SettingType.MODELS);
    this.validateSettingOrderNumbers(globalDressOptionsDto.colors, SettingType.COLORS);
    this.validateSettingOrderNumbers(globalDressOptionsDto.materials, SettingType.MATERIALS);
    this.validateSettingOrderNumbers(globalDressOptionsDto.categories, SettingType.CATEGORIES);
>>>>>>> 46e706aebb09d660ebab4e5244128a561adbaeba
    return globalDressOptionsDto;
  }
}
