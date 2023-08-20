import {BlogController} from "../../../../app/controller/api/blog/blog.controller";
import {IBlogService} from "../../../../app/service/blog/blog.service.abstraction";
import {Test} from "@nestjs/testing";
import {BlogDto} from "../../../../app/service/blog/model/blog.dto";
import {BlogSearchDto} from "../../../../app/service/blog/model/blog-search.dto";
import {BlogUploadResultDto} from "../../../../app/service/blog/model/blog-upload-result.dto";

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
                        createBlog: jest.fn(),
                        updateBlog: jest.fn(),
                        deleteBlog: jest.fn(),
                        searchBlog: jest.fn(),
                        uploadFileBlog: jest.fn(),
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

    describe('create', () => {
        it('should create blog', async () => {
            const blog = {} as BlogDto;
            const result = {} as Promise<BlogDto>;
            jest.spyOn(blogService, 'createBlog').mockImplementation(() => result);
            const actualResult = await blogController.createBlog(blog);
            expect(actualResult).toBe(result);
        });
    });

    describe('update', () => {
        it('should update blog', async () => {
            const id = 1;
            const blog = {} as BlogDto;
            const result = {} as Promise<BlogDto>;
            jest.spyOn(blogService, 'updateBlog').mockImplementation(() => result);
            const actualResult = await blogController.updateBlog(id, blog);
            expect(actualResult).toBe(result);
        });
    })

    describe('search', () => {
        it('should find blog by many options', async () => {
            const blogSearchDto = {} as BlogSearchDto;
            const result = {} as Promise<BlogDto[]>;
            jest.spyOn(blogService, 'searchBlog').mockImplementation(() => result);
            const actualResult = await blogController.searchBlog(blogSearchDto);
            expect(actualResult).toBe(result);
        });
    })

    describe('uploadFile', () => {
       it('should upload blog file', async () => {
           const file = {} as Express.Multer.File;
           const result = {} as Promise<BlogUploadResultDto>;
           jest.spyOn(blogService, 'uploadFileBlog').mockImplementation(() => result);
           const actualResult = await blogController.uploadBlogFile(file);
           expect(actualResult).toBe(result);
       });
    });

    describe('delete', () => {
        it('should delete blog', async () => {
            const ids = new Set([1]);
            const result = {} as Promise<void>;
            const deleteFunc = jest.spyOn(blogService, 'deleteBlog').mockImplementation(() => result);
            await blogController.deleteBlog(ids);
            expect(deleteFunc).toHaveBeenCalled();
        });
    })

})