import { BlogEntity } from "../../../../app/repository/blog/blog.entity";
import { BlogService } from "../../../../app/service/blog/impl/blog.service";
import {
  MockType,
  repositoryMockFactory,
} from "../../../test-utils/test-utils";
import { Repository } from "typeorm";
import { Test } from "@nestjs/testing";
import { BlogConverter } from "../../../../app/service/blog/util/converters/blog.converter";
import { getRepositoryToken } from "@nestjs/typeorm";
import { generateBlogEntity } from "../../../test-utils/mock-entity-generators";
import {
  generateBlogDto,
  generateBlogSearchDto,
  generateBlogUploadResultDto, generateBlogViewDto, generateDownloadedFileModel,
} from "../../../test-utils/mock-dto-generators";
import { IGoogleDriveClient } from "../../../../app/client/google-drive/google-drive.client.abstraction";
import { EntitiesNotFoundByIdsException } from "../../../../app/exception/entities-not-found-by-ids.exception";
import { EntityDuplicateFieldException } from "../../../../app/exception/entity-duplicate-field.exception";
import { EntityNotFoundByFieldsException } from "../../../../app/exception/entity-not-found-by-fields";
import { HttpException } from "@nestjs/common";

jest.mock("typeorm-transactional", () => ({
  Transactional: () => () => ({}),
}));

describe("BlogService", () => {
  let blogService: BlogService;
  let blogConverter: BlogConverter;
  let blogRepository: MockType<Repository<BlogEntity>>;
  let googleDriveClient: IGoogleDriveClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: IGoogleDriveClient,
          useValue: {
            uploadFile: jest.fn(),
            downloadFile: jest.fn(),
          },
        },
        {
          provide: BlogConverter,
          useValue: {
            convertToDto: jest.fn(),
            convertToEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BlogEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    blogService = moduleRef.get<BlogService>(BlogService);
    blogConverter = moduleRef.get<BlogConverter>(BlogConverter);
    googleDriveClient = moduleRef.get<IGoogleDriveClient>(IGoogleDriveClient);
    blogRepository = moduleRef.get(getRepositoryToken(BlogEntity));
  });

  describe("get", () => {
    it("should get blog", async () => {
      const id = generateBlogEntity().id;
      const blogEntity = generateBlogEntity();
      const blogDto = generateBlogViewDto();

      jest.spyOn(blogConverter, "convertToDto").mockReturnValue(blogDto);
      jest.spyOn(googleDriveClient, 'downloadFile').mockResolvedValue(generateDownloadedFileModel());

      blogRepository.findOne.mockReturnValue(blogEntity);
      const actualBlogDto = await blogService.getBlog(id);
      expect(actualBlogDto).toStrictEqual(blogDto);
    });

    it("should throw EntitiesNotFoundByIdsException when getting the blog", async () => {
      const id = 1;
      jest.spyOn(googleDriveClient, 'downloadFile').mockResolvedValue(generateDownloadedFileModel());
      blogRepository.findOne.mockReturnValue(null);
      try {
        await blogService.getBlog(id);
      } catch (error) {
        expect(error).toBeInstanceOf(EntitiesNotFoundByIdsException);
      }
    });
  });

  describe("create", () => {
    it("should create blog", async () => {
      const blogDto = generateBlogViewDto();
      const blogEntity = generateBlogEntity();

      jest.spyOn(blogConverter, "convertToEntity").mockReturnValue(blogEntity);
      jest.spyOn(blogConverter, "convertToDto").mockReturnValue(blogDto);

      jest.spyOn(googleDriveClient, 'downloadFile').mockResolvedValue(generateDownloadedFileModel());

      blogRepository.save.mockReturnValue(blogEntity);

      const actualBlogDto = await blogService.createBlog(blogDto);
      expect(actualBlogDto).toStrictEqual(blogDto);
    });

    it("should throw EntityDuplicateFieldException when adding the blog", async () => {
      const blogDto = generateBlogDto();
      const duplicateError = {
        code: "ER_DUP_ENTRY",
      } as never;

      blogRepository.save.mockRejectedValue(duplicateError);
      try {
        await blogService.createBlog(blogDto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityDuplicateFieldException);
      }
    });
  });

  describe("delete", () => {
    it("should delete the blog", async () => {
      const ids = new Set([1]);
      const deleteResult = {} as never;
      blogRepository.delete.mockResolvedValue(deleteResult);
      await blogService.deleteBlog(ids);
      expect(blogRepository.delete).toHaveBeenCalled();
    });

    it("should throw EntitiesNotFoundByIdsException", async () => {
      const ids = new Set([1]);
      const deleteResult = {
        affected: 0,
      } as never;
      blogRepository.delete.mockResolvedValue(deleteResult);
      try {
        await blogService.deleteBlog(ids);
      } catch (error) {
        expect(error).toBeInstanceOf(EntitiesNotFoundByIdsException);
      }
    });
  });

  describe("update", () => {
    it("should update the blog", async () => {
      const id = generateBlogDto().id;
      const blogDto = generateBlogViewDto();
      const blogEntity = generateBlogEntity();

      jest.spyOn(blogConverter, "convertToEntity").mockReturnValue(blogEntity);
      jest.spyOn(blogConverter, "convertToDto").mockReturnValue(blogDto);
      jest.spyOn(googleDriveClient, 'downloadFile').mockResolvedValue(generateDownloadedFileModel());


      blogRepository.save.mockReturnValue(blogEntity);

      const actualBlogDto = await blogService.updateBlog(id, blogDto);
      expect(actualBlogDto).toStrictEqual(blogDto);
    });

    it("should throw EntitiesNotFoundByIdsException", async () => {
      const id = 1;
      const blogDto = generateBlogDto();
      jest.spyOn(googleDriveClient, 'downloadFile').mockResolvedValue(generateDownloadedFileModel());
      blogRepository.findOne.mockReturnValue(null);
      try {
        await blogService.updateBlog(id, blogDto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntitiesNotFoundByIdsException);
      }
    });
  });

  describe("search", () => {
    it("should search the blog", async () => {
      const blogDto = generateBlogViewDto();
      const searchResult = [blogDto];
      const blogEntity = generateBlogEntity();
      const mockSearchResultEntity = [blogEntity];
      const blogSearchDto = generateBlogSearchDto();

      blogRepository.findBy.mockReturnValue(mockSearchResultEntity);
      jest.spyOn(blogConverter, "convertToDto").mockReturnValue(blogDto);
      jest.spyOn(googleDriveClient, 'downloadFile').mockResolvedValue(generateDownloadedFileModel());


      const actualSearchResult = await blogService.searchBlog(blogSearchDto);

      expect(actualSearchResult).toStrictEqual(searchResult);
    });

    it("should throw EntityNotFoundByFieldsException", async () => {
      const blogSearchDto = generateBlogSearchDto();

      blogRepository.findBy.mockReturnValue(null);
      try {
        await blogService.searchBlog(blogSearchDto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundByFieldsException);
      }
    });
  });

  describe("uploadFile", () => {
    it("should upload blog file", async () => {
      const file = {
        originalname: {
          endsWith: jest.fn().mockResolvedValue(true),
        },
      } as any;
      const blogUploadResultDto = generateBlogUploadResultDto();
      jest
        .spyOn(googleDriveClient, "uploadFile")
        .mockResolvedValue(blogUploadResultDto);
      const actualBlogUploadResultDto = await blogService.uploadFileBlog(file);
      expect(actualBlogUploadResultDto).toStrictEqual(blogUploadResultDto);
    });

    it("should throw HttpException when uploading the file with no html extension", async () => {
      const file = {
        originalname: {
          endsWith: jest.fn().mockResolvedValue(false),
        },
      } as any;
      try {
        await blogService.uploadFileBlog(file);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
