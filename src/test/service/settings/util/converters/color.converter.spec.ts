import { ColorConverter } from "../../../../../app/service/settings/util/converters/color.converter";
import { generateColorEntity } from "../../../../test-utils/mock-entity-generators";
import { ColorEntity } from "../../../../../app/repository/settings/color/entity/color.entity";
import { ColorDto } from "../../../../../app/service/settings/model/color.dto";
import { generateColorDto } from "../../../../test-utils/mock-dto-generators";


describe("ColorConverter", () => {

  let colorConverter: ColorConverter;

  beforeEach(() => {
    colorConverter = new ColorConverter();
  });

  describe("convert", () => {
    it("should convert to DTOs", () => {
      const colorEntities: ColorEntity[] = [generateColorEntity()];
      const convertResult = colorConverter.convertToDTOs(colorEntities);
      expect(convertResult.length).toBe(colorEntities.length);
      expect(convertResult[0].id).toBe(colorEntities[0].id);
      expect(convertResult[0].name).toBe(colorEntities[0].name);
      expect(convertResult[0].firstColor).toBe(colorEntities[0].firstColor);
      expect(convertResult[0].secondColor).toBe(colorEntities[0].secondColor);
    });

    it("should convert to Entities", () => {
      const colorDTOs: ColorDto[] = [generateColorDto()];
      const convertResult = colorConverter.convertToEntities(colorDTOs);
      expect(convertResult.length).toBe(colorDTOs.length);
      expect(convertResult[0].id).toBe(colorDTOs[0].id);
      expect(convertResult[0].name).toBe(colorDTOs[0].name);
      expect(convertResult[0].firstColor).toBe(colorDTOs[0].firstColor);
      expect(convertResult[0].secondColor).toBe(colorDTOs[0].secondColor);
    });
  });
});

