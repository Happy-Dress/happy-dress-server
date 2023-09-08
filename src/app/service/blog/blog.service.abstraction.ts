import { BlogSearchDto } from './model/blog-search.dto';
import { BlogDto } from './model/blog.dto';
import { BlogUploadResultDto } from './model/blog-upload-result.dto';
import { BlogViewDto } from './model/blog-view.dto';

export abstract class IBlogService {
  abstract searchBlog(blogSearchDto: BlogSearchDto): Promise<BlogViewDto[]>;
  abstract getBlog(id: number): Promise<BlogViewDto>;
  abstract uploadFileBlog(htmlBlog: Express.Multer.File): Promise<BlogUploadResultDto>;
  abstract createBlog(blogDto: BlogDto): Promise<BlogViewDto>;
  abstract updateBlog(id: number, blogDto: BlogDto): Promise<BlogViewDto>;
  abstract deleteBlog(ids: Set<number>): Promise<void>;
}