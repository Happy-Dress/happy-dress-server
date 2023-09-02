import {BlogController} from "../../../../../app/controller/api/unsecure/blog/blog.controller";
import {IBlogService} from "../../../../../app/service/blog/blog.service.abstraction";
import {Test} from "@nestjs/testing";
import {BlogDto} from "../../../../../app/service/blog/model/blog.dto";
import {BlogSearchDto} from "../../../../../app/service/blog/model/blog-search.dto";

describe('BlogController', () => {
    let blogController: BlogController;
    let blogService: IBlogService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: IBlogService,
                    useValue: {
                        getBlog: jest.fn(),
                        searchBlog: jest.fn(),
                    },
                }
            ],
            controllers: [BlogController],
        }).compile();

        blogService = moduleRef.get<IBlogService>(IBlogService);
        blogController = moduleRef.get<BlogController>(BlogController);
    });

    describe('get', () => {
        it('should return blog by id', async () => {
            const id = 1;
            const result = {} as Promise<BlogDto>;
            jest.spyOn(blogService, 'getBlog').mockImplementation(() => result);
            const actualResult = await blogController.getBlog(id);
            expect(actualResult).toBe(result);
        });
    });

    describe('search', () => {
        it('should find blog by many options', async () => {
            const blogSearchDto = {} as BlogSearchDto;
            const result = {} as Promise<BlogDto[]>;
            jest.spyOn(blogService, 'searchBlog').mockImplementation(() => result);
            const actualResult = await blogController.searchBlog(blogSearchDto);
            expect(actualResult).toBe(result);
        });
    })
})