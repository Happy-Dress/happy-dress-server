import { GlobalDressOptionsDto } from './../../../../../app/service/settings/model/global-dress-options.dto';
import { BadRequestException } from '@nestjs/common';
import { IVALID_ORDER_NUMBER } from 'src/app/messages/constants/messages.constants';
import { OrderNumberValidationPipe } from './../../../../../app/repository/settings/validator/orderNumber.validation.pipe';


describe('OrderNumberValidationPipe', () => {
  let orderNumberValidationPipe: OrderNumberValidationPipe;
  const error = new BadRequestException(IVALID_ORDER_NUMBER);
  
  beforeEach(() => {
    orderNumberValidationPipe = new OrderNumberValidationPipe();
  });
  describe('orderNumber', () => {
    it('should validate files and return it', () => {
      const files: GlobalDressOptionsDto = {
        categories: [
          {
            id: 14,
            name: 'Деловой Стиль',
            description:
              'Любая вечеринка станет незабываемой году управляла 487 магазинами.',
            imageUrl:
              'http://drive.google.com/uc?export=view&id=1nqtbehgBr1B-yexWuPY5WFz2ioxtOsk9',
            orderNumber: 1,
          },
          {
            id: 24,
            name: 'Вечерние',
            description: 'В 2019 году HAPPYDRESS управляла 487 магазинами.',
            imageUrl:
              'http://drive.google.com/uc?export=view&id=1sGnX9iA9Eji3HQNdg6DLSETflmgbhKIS',
            orderNumber: 2,
          },
          {
            id: 34,
            name: 'Детские',
            description: 'Радуйте своих детей с нами.',
            imageUrl:
              'http://drive.google.com/uc?export=view&id=1BV2Eau8tcCjbajQuz9gxRR8sLU2nutQp',
            orderNumber: 3,
          },
          {
            id: 44,
            name: 'Коктейльные',
            description: 'Любая вечеринка станет незабываемой.',
            imageUrl:
              'http://drive.google.com/uc?export=view&id=1mwjmrNd6eqce6vCdEXE8koKAcnk7hiP2',
            orderNumber: 4,
          },
        ],
        models: [
          {
            id: 1054,
            name: 'Короткие',
            orderNumber: 1,
          },
          {
            id: 1044,
            name: 'Прямые',
            orderNumber: 2,
          },
          {
            id: 1034,
            name: 'Пышные',
            orderNumber: 3,
          },
        ],
        materials: [
          {
            id: 134,
            name: 'Атлас',
            orderNumber: 1,
          },
          {
            id: 104,
            name: 'Кружево',
            orderNumber: 2,
          },
          {
            id: 144,
            name: 'Оргганза',
            orderNumber: 3,
          },
          {
            id: 124,
            name: 'Фатин',
            orderNumber: 4,
          },
          {
            id: 114,
            name: 'Шифон',
            orderNumber: 5,
          },
        ],
        colors: [
          {
            id: 184,
            name: 'белый',
            firstColor: '#FFFFFF',
            secondColor: null,
            orderNumber: 1,
          },
          {
            id: 194,
            name: 'RRR',
            firstColor: '#d11e1e',
            secondColor: null,
            orderNumber: 2,
          },
          {
            id: 244,
            name: 'желтый',
            firstColor: '#d11e1e',
            secondColor: null,
            orderNumber: 3,
          },
          {
            id: 254,
            name: 'красно-зеленый',
            firstColor: '#f80101',
            secondColor: '#33f600',
            orderNumber: 4,
          },
        ],
        sizes: [
          {
            id: 14,
            sizeValue: 40,
          },
        ],
      };
      const result = files;
      const actualResult = orderNumberValidationPipe.transform(files);
      expect(actualResult).toBe(result);
    });

    it.each([
      {
        files: {
          colors: [
            {
              id: 184,
              name: 'белый',
              firstColor: '#FFFFFF',
              secondColor: null,
              orderNumber: null,
            },
            {
              id: 194,
              name: 'RRR',
              firstColor: '#d11e1e',
              secondColor: null,
              orderNumber: 5,
            },
            {
              id: 244,
              name: 'желтый',
              firstColor: '#d11e1e',
              secondColor: null,
              orderNumber: '3',
            },
            {
              id: 254,
              name: 'красно-зеленый',
              firstColor: '#f80101',
              secondColor: '#33f600',
              orderNumber: 4,
            },
          ],
        } as GlobalDressOptionsDto,
      },
      { files: null as GlobalDressOptionsDto },
    ])('should throw an exception 400', ({ files }) => {
      expect(() => orderNumberValidationPipe.transform(files)).toThrow(error);
    });
  });
});
