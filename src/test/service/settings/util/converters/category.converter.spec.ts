import { CategoryConverter } from "../../../../../app/service/settings/util/converters/category.converter";
import { CategoryEntity } from "../../../../../app/repository/settings/category/entity/category.entity";
import { generateCategoryEntity } from "../../../../test-utils/mock-entity-generators";
import { CategoryDto } from "../../../../../app/service/settings/model/category.dto";
import { generateCategoryDto } from "../../../../test-utils/mock-dto-generators";

describe("CategoryConverter", () => {

  let categoryConverter: CategoryConverter;

  beforeEach(() => {
    categoryConverter = new CategoryConverter();
  });

  describe("convert", () => {
    it("should convert to DTOs", () => {
      const categoryEntities: CategoryEntity[] = [generateCategoryEntity()];
      const categoryDTOs: CategoryDto[] = [generateCategoryDto()];
      const convertResult = categoryConverter.convertToDTOs(categoryEntities);
      expect(convertResult).toStrictEqual(categoryDTOs);
    });
    it("should convert to Entities", () => {
      const categoryEntities: CategoryEntity[] = [generateCategoryEntity()];
      const categoryDTOs: CategoryDto[] = [generateCategoryDto()];
      const convertResult = categoryConverter.convertToEntities(categoryDTOs);
      expect(convertResult).toStrictEqual(categoryEntities);
    });
  });
});

