import { Test } from '@nestjs/testing';
import { SettingsService } from '../../../../app/service/settings/impl/settings.service';
import { MaterialsCrudService } from '../../../../app/service/settings/crud/materials.crud.service';
import { CategoriesCrudService } from '../../../../app/service/settings/crud/categories.crud.service';
import { ModelsCrudService } from '../../../../app/service/settings/crud/models.crud.service';
import { ColorsCrudService } from '../../../../app/service/settings/crud/colors.crud.service';
import { CategoryDto } from '../../../../app/service/settings/model/category.dto';
import { ModelDto } from '../../../../app/service/settings/model/model.dto';
import { MaterialDto } from '../../../../app/service/settings/model/material.dto';
import { ColorDto } from '../../../../app/service/settings/model/color.dto';
import { GlobalDressOptionsDto } from '../../../../app/service/settings/model/global-dress-options.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../test-utils/test-utils';
import { CategoryEntity } from '../../../../app/repository/settings/category/entity/category.entity';
import { ModelEntity } from '../../../../app/repository/settings/model/entity/model.entity';
import { MaterialEntity } from '../../../../app/repository/settings/material/entity/material.entity';
import { ColorEntity } from '../../../../app/repository/settings/color/entity/color.entity';
import {
  generateCategoryDto,
  generateColorDto, generateGlobalDressOptionsDto,
  generateMaterialDto,
  generateModelDto,
} from '../../../test-utils/mock-dto-generators';

jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
}));

describe('SettingsService', () => {

  let settingsService: SettingsService;
  let materialsCrudService: MaterialsCrudService;
  let categoriesCrudService: CategoriesCrudService;
  let modelsCrudService: ModelsCrudService;
  let colorsCrudService: ColorsCrudService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          SettingsService,
          MaterialsCrudService,
          CategoriesCrudService,
          ModelsCrudService,
          ColorsCrudService,
          { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(ModelEntity), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(MaterialEntity), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(ColorEntity), useFactory: repositoryMockFactory },
        ],

      }).compile();

      settingsService = moduleRef.get<SettingsService>(SettingsService);

      materialsCrudService = moduleRef.get<MaterialsCrudService>(MaterialsCrudService);
      categoriesCrudService = moduleRef.get<CategoriesCrudService>(CategoriesCrudService);
      modelsCrudService = moduleRef.get<ModelsCrudService>(ModelsCrudService);
      colorsCrudService = moduleRef.get<ColorsCrudService>(ColorsCrudService);


        jest.mock('typeorm-transactional', () => ({
          Transactional: () => () => ({}),
        }));
    });

    it('should get all dress options', async () => {
      const categoryDTOs: CategoryDto[] = [generateCategoryDto()];
      const modelDTOs: ModelDto[] = [generateModelDto()];
      const materialDTOs: MaterialDto[] = [generateMaterialDto()];
      const colorDTOs: ColorDto[] = [generateColorDto()];

        jest.spyOn(categoriesCrudService, 'getAll').mockResolvedValue(categoryDTOs);
        jest.spyOn(modelsCrudService, 'getAll').mockResolvedValue(modelDTOs);
        jest.spyOn(materialsCrudService, 'getAll').mockResolvedValue(materialDTOs);
        jest.spyOn(colorsCrudService, 'getAll').mockResolvedValue(colorDTOs);

        const dressOptions: GlobalDressOptionsDto = await settingsService.getGlobalDressOptions();
        expect(dressOptions.colors).toBe(colorDTOs);
        expect(dressOptions.categories).toBe(categoryDTOs);
        expect(dressOptions.models).toBe(modelDTOs);
        expect(dressOptions.materials).toBe(materialDTOs);
    });

    it('should update all dress options', async () => {
      const globalDressOptionsDto: GlobalDressOptionsDto = generateGlobalDressOptionsDto();
        jest.spyOn(settingsService, 'getGlobalDressOptions').mockResolvedValue(globalDressOptionsDto);
        jest.spyOn(materialsCrudService, 'update').mockResolvedValue();
        jest.spyOn(categoriesCrudService, 'update').mockResolvedValue();
        jest.spyOn(colorsCrudService, 'update').mockResolvedValue();
        jest.spyOn(modelsCrudService, 'update').mockResolvedValue();

        settingsService.onModuleInit();
        const dressOptions: GlobalDressOptionsDto = await settingsService.setGlobalDressOptions(globalDressOptionsDto);

        expect(categoriesCrudService.update).toHaveBeenCalled();
        expect(modelsCrudService.update).toHaveBeenCalled();
        expect(colorsCrudService.update).toHaveBeenCalled();
        expect(materialsCrudService.update).toHaveBeenCalled();
        expect(dressOptions).toBe(globalDressOptionsDto);
    });
});
