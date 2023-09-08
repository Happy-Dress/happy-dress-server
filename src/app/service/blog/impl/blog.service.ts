import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBlogService } from '../blog.service.abstraction';
import { BlogSearchDto } from '../model/blog-search.dto';
import { BlogDto } from '../model/blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { BlogEntity } from '../../../repository/blog/blog.entity';
import { EntityNotFoundByFieldsException } from '../../../exception/entity-not-found-by-fields';
import { BlogUploadResultDto } from '../model/blog-upload-result.dto';
import { IGoogleDriveClient } from '../../../client/google-drive/google-drive.client.abstraction';
import { BlogConverter } from '../util/converters/blog.converter';
import { EntitiesNotFoundByIdsException } from '../../../exception/entities-not-found-by-ids.exception';
import { EntityDuplicateFieldException } from '../../../exception/entity-duplicate-field.exception';
import { INVALID_EXTENSION_MESSAGE } from '../../../messages/constants/messages.constants';
import { Transactional } from 'typeorm-transactional';
import { BlogViewDto } from '../model/blog-view.dto';


const BLOG = 'Блог';
const HTML_EXTENSION = 'html';

@Injectable()
export class BlogService implements IBlogService {
    
    @InjectRepository(BlogEntity)
    readonly blogRepository: Repository<BlogEntity>;

    @Inject()
    private readonly googleDriveClient: IGoogleDriveClient;
    
    @Inject()
    private readonly blogConverter: BlogConverter;

    @Transactional()
    public async searchBlog(blogSearchDto: BlogSearchDto): Promise<BlogViewDto[]> {
      const blogFindOptions = this.buildBlogFindOptions(blogSearchDto);  
      const blogEntities = await this.blogRepository.findBy(blogFindOptions);
      if (!blogEntities) {
        throw new EntityNotFoundByFieldsException(Object.values(blogSearchDto).map(value => String(value)), BLOG);
      }
      return await Promise.all(blogEntities.map(async (entity) => await this.getBlog(entity.id)));
    }
    
    public async uploadFileBlog(htmlBlog: Express.Multer.File): Promise<BlogUploadResultDto> {
      if (this.checkHtmlExtension(htmlBlog)) {
        return await this.googleDriveClient.uploadFile(htmlBlog, BLOG);
      } else {
        throw new HttpException(this.getInvalidExtensionMessage(htmlBlog.mimetype), HttpStatus.BAD_REQUEST);
      }
    }

    public async getBlog(id: number): Promise<BlogViewDto> {
      const blogEntity = await this.blogRepository.findOne({ where: { id } });
      if (!blogEntity) {
        throw new EntitiesNotFoundByIdsException([id], BLOG);
      }
      const blogFile = await this.googleDriveClient.downloadFile(blogEntity.htmlLinkId);
      return this.blogConverter.convertToDto(blogEntity, blogFile);
    }
    
    @Transactional()
    public async createBlog(blogDto: BlogDto): Promise<BlogViewDto> {
      blogDto = this.validateBlogDto(blogDto);
      const blogEntity = this.blogConverter.convertToEntity(blogDto);
      try {
        const blogEntitySaved = await this.blogRepository.save(blogEntity);
        return await this.getBlog(blogEntitySaved.id);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new EntityDuplicateFieldException(BLOG);
        } else {
          throw error;
        }
      }
    }
    
    @Transactional()
    public async updateBlog(id: number, blogDto: BlogDto): Promise<BlogViewDto> {
      await this.getBlog(id);
      blogDto = this.validateBlogDto(blogDto);
      blogDto.id = id;
      const blogEntity = this.blogConverter.convertToEntity(blogDto);
      const blogEntitySaved = await this.blogRepository.save(blogEntity);
      return this.getBlog(blogEntitySaved.id);
    } 
    
    @Transactional()
    public async deleteBlog(ids: Set<number>): Promise<void> {
      const deleteResult = await this.blogRepository.delete(Array.from(ids));
      if (deleteResult.affected === 0) {
        throw new EntitiesNotFoundByIdsException(ids, BLOG);
      }
    }

    private buildBlogFindOptions(blogSearchDto: BlogSearchDto): FindOptionsWhere<BlogDto> {
      const findOptions: Record<any, any> = {};
      if (blogSearchDto?.name) {
        findOptions.name = Like('%' + blogSearchDto.name + '%');
      }
      if (blogSearchDto?.shortDescription) {
        findOptions.shortDescription = Like('%' + blogSearchDto.shortDescription + '%');
      }
      return findOptions;
    }
    
    private checkHtmlExtension(htmlBlog: Express.Multer.File): boolean {
      return htmlBlog.originalname.endsWith(HTML_EXTENSION);
    }

    private getInvalidExtensionMessage(fileType: string): string {
      return INVALID_EXTENSION_MESSAGE
        .replace('$current', fileType)
        .replace('$valid', HTML_EXTENSION );
    }
    
    private validateBlogDto(blogDto: BlogDto): BlogDto {
      blogDto.name = blogDto.name.trim();
      blogDto.shortDescription = blogDto.shortDescription.trim();
      return blogDto;
    }
    
}