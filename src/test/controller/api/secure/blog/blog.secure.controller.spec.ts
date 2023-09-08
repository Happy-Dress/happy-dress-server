import {IBlogService} from "../../../../../app/service/blog/blog.service.abstraction";
import {Test} from "@nestjs/testing";
import {BlogSecureController} from "../../../../../app/controller/api/secure/blog/blog.secure.controller";
import {BlogDto} from "../../../../../app/service/blog/model/blog.dto";
import {BlogSearchDto} from "../../../../../app/service/blog/model/blog-search.dto";
import {BlogUploadResultDto} from "../../../../../app/service/blog/model/blog-upload-result.dto";
import {BlogViewDto} from "../../../../../app/service/blog/model/blog-view.dto";

describe('BlogSecureController', () => {
    let blogSecureController: BlogSecureController;
    let blogService: IBlogService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: IBlogService,
                    useValue: {
                        getBlog: jest.fn(),
                        createBlog: jest.fn(),
                        updateBlog: jest.fn(),
                        deleteBlog: jest.fn(),
                        searchBlog: jest.fn(),
                        uploadFileBlog: jest.fn(),
                    },
                }
            ],
            controllers: [BlogSecureController],
        }).compile();

        blogService = moduleRef.get<IBlogService>(IBlogService);
        blogSecureController = moduleRef.get<BlogSecureController>(BlogSecureController);
    });

    describe('get', () => {
        it('should return blog by id', async () => {
            const id = 1;
            const result = {} as Promise<BlogViewDto>;
            jest.spyOn(blogService, 'getBlog').mockImplementation(() => result);
            const actualResult = await blogSecureController.getBlog(id);
            expect(actualResult).toBe(result);
        });
    });

    describe('create', () => {
        it('should create blog', async () => {
            const blog = {} as BlogDto;
            const result = {} as Promise<BlogViewDto>;
            jest.spyOn(blogService, 'createBlog').mockImplementation(() => result);
            const actualResult = await blogSecureController.createBlog(blog);
            expect(actualResult).toBe(result);
        });
    });

    describe('update', () => {
        it('should update blog', async () => {
            const id = 1;
            const blog = {} as BlogDto;
            const result = {} as Promise<BlogViewDto>;
            jest.spyOn(blogService, 'updateBlog').mockImplementation(() => result);
            const actualResult = await blogSecureController.updateBlog(id, blog);
            expect(actualResult).toBe(result);
        });
    })

    describe('search', () => {
        it('should find blog by many options', async () => {
            const blogSearchDto = {} as BlogSearchDto;
            const result = {} as Promise<BlogViewDto[]>;
            jest.spyOn(blogService, 'searchBlog').mockImplementation(() => result);
            const actualResult = await blogSecureController.searchBlog(blogSearchDto);
            expect(actualResult).toBe(result);
        });
    })

    describe('uploadFile', () => {
        it('should upload blog file', async () => {
            const file = {} as Express.Multer.File;
            const result = {} as Promise<BlogUploadResultDto>;
            jest.spyOn(blogService, 'uploadFileBlog').mockImplementation(() => result);
            const actualResult = await blogSecureController.uploadBlogFile(file);
            expect(actualResult).toBe(result);
        });
    });

    describe('delete', () => {
        it('should delete blog', async () => {
            const ids = new Set([1]);
            const result = {} as Promise<void>;
            const deleteFunc = jest.spyOn(blogService, 'deleteBlog').mockImplementation(() => result);
            await blogSecureController.deleteBlog(ids);
            expect(deleteFunc).toHaveBeenCalled();
        });
    })
});