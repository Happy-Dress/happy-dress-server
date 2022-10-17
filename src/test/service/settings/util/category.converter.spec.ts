import {CategoryConverter} from "../../../../app/service/settings/util/category.converter";
import {CategoryEntity} from "../../../../app/repository/settings/category/entity/category.entity";
import {CategoryDTO} from "../../../../app/service/settings/model/CategoryDTO";

describe('CategoryConverter', () => {

    let categoryConverter: CategoryConverter;

    beforeEach( () => {
        categoryConverter = new CategoryConverter();
    });

    describe('convert',  () => {
        it('should convert to DTO', () => {
            const categoryEntities: CategoryEntity[] = [{id: 1, name: 'plain text', description: 'plain text', imageUrl: 'example.png'}];
            const categoryDTOs: CategoryDTO[] = [{id: 1, name: 'plain text', description: 'plain text', imageUrl: 'example.png'}];
            const convertResult = categoryConverter.convertToDTO(categoryEntities);
            expect(convertResult).toStrictEqual(categoryDTOs);
        });
        it('should convert to Entity', () => {
            const categoryEntities: CategoryEntity[] = [{id: 1, name: 'plain text', description: 'plain text', imageUrl: 'example.png'}];
            const categoryDTOs: CategoryDTO[] = [{id: 1, name: 'plain text', description: 'plain text', imageUrl: 'example.png'}];
            const convertResult = categoryConverter.convertToEntity(categoryDTOs);
            expect(convertResult).toStrictEqual(categoryEntities);
        });
    });
});

