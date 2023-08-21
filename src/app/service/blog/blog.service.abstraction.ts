import { BlogSearchDto } from './model/blog-search.dto';
import { BlogDto } from './model/blog.dto';
import { BlogUploadResultDto } from './model/blog-upload-result.dto';

export abstract class IBlogService {
  abstract searchBlog(blogSearchDto: BlogSearchDto): Promise<BlogDto[]>;
  abstract getBlog(id: number): Promise<BlogDto>;
  abstract uploadFileBlog(htmlBlog: Express.Multer.File): Promise<BlogUploadResultDto>;
  abstract createBlog(blogDto: BlogDto): Promise<BlogDto>;
  abstract updateBlog(id: number, blogDto: BlogDto): Promise<BlogDto>;
  abstract deleteBlog(ids: Set<number>): Promise<void>;
}