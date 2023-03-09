import { BadRequestException } from '@nestjs/common';
import { GlobalDressOptionsDto } from './../../../../../app/service/settings/model/global-dress-options.dto';
import { INVALID_ORDER_NUMBER } from './../../../../../app/messages/constants/messages.constants';
import { OrderNumberValidationPipe } from './../../../../../app/service/settings/validator/orderNumber.validation.pipe';
import { generateGlobalDressOptionsDto } from './../../../../../test/test-utils/mock-dto-generators';
import { SettingType } from './../../../../../app/service/settings/util/constant/setting.type.enum';

describe('OrderNumberValidationPipe', () => {
  let orderNumberValidationPipe: OrderNumberValidationPipe;
  const error = new BadRequestException(INVALID_ORDER_NUMBER);
  const mockValue = {
    categories: [
      {
        id: 14,
        name: "",
        description: "",
        imageUrl: "",
        orderNumber: 10,
      },
    ],
    models: [
      {
        id: 1054,
        name: "Короткие",
        orderNumber: 10,
      },
    ],
    materials: [
      {
        id: 134,
        name: "Атлас",
        orderNumber: 10,
      },
    ],
    colors: [
      {
        id: 184,
        name: "белый",
        firstColor: "#FFFFFF",
        secondColor: null,
        orderNumber: 10,
      },
    ],
    sizes: [
      {
        id: 14,
        sizeValue: 40,
        orderNumber: 10,
      },
    ],
  };
  const files: GlobalDressOptionsDto = generateGlobalDressOptionsDto();
  beforeEach(() => {
    orderNumberValidationPipe = new OrderNumberValidationPipe();
  });
  describe('orderNumber', () => {
    it('should validate files and return it', () => {
      const result = files;
      const actualResult = orderNumberValidationPipe.transform(files);
      expect(actualResult).toBe(result);
    });

    it('should throw an exception 400', ()=>{
      expect(() =>
        orderNumberValidationPipe.transform(
          mockValue
        )
      ).toThrow();
    });
  });
});
