import { generateSizeEntity} from "../../../../test-utils/mock-entity-generators";
import { generateSizeDto} from "../../../../test-utils/mock-dto-generators";
import {SizeConverter} from "../../../../../app/service/settings/util/converters/size.converter";
import {SizeEntity} from "../../../../../app/repository/settings/size/enitity/size.entity";
import {SizeDto} from "../../../../../app/service/settings/model/size.dto";

describe('SizeConverter', () => {

    let sizeConverter: SizeConverter;

    beforeEach(() => {
        sizeConverter = new SizeConverter();
    });

    describe('convert', () => {
        it('should convert to DTOs', async () => {
            const sizeEntities: SizeEntity[] = [generateSizeEntity()];
            const convertResult = await sizeConverter.convertToDTOs(sizeEntities);
            expect(convertResult.length).toBe(sizeEntities.length);
            expect(convertResult[0].id).toBe(sizeEntities[0].id);
            expect(convertResult[0].sizeValue).toBe(sizeEntities[0].sizeValue);
        });

        it('should convert to Entities', async () => {
            const sizeDTOs: SizeDto[] = [generateSizeDto()];
            const convertResult = await sizeConverter.convertToEntities(sizeDTOs);
            expect(convertResult.length).toBe(sizeDTOs.length);
            expect(convertResult[0].id).toBe(sizeDTOs[0].id);
            expect(convertResult[0].sizeValue).toBe(sizeDTOs[0].sizeValue);
        });
    });
});