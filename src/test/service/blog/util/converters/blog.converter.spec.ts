import {BlogConverter} from "../../../../../app/service/blog/util/converters/blog.converter";
import {Test} from "@nestjs/testing";
import {generateBlogDto} from "../../../../test-utils/mock-dto-generators";
import {generateBlogEntity} from "../../../../test-utils/mock-entity-generators";

describe('BlogConverter', () => {
    let blogConverter: BlogConverter;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [BlogConverter]
        }).compile();

        blogConverter = moduleRef.get<BlogConverter>(BlogConverter);
    });

    it('should convert to entity', () => {
        const blogDto = generateBlogDto();
        const blogEntity = generateBlogEntity();
        const actualBlogEntity = blogConverter.convertToEntity(blogDto);
        expect(actualBlogEntity).toStrictEqual(blogEntity);
    });

    it('should convert to dto',  () => {
        const blogDto = generateBlogDto();
        const blogEntity = generateBlogEntity();
        const actualBlogEntity = blogConverter.convertToEntity(blogDto);
        expect(actualBlogEntity).toStrictEqual(blogEntity);
    });


})