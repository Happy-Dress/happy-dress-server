import { BlogDto } from '../../model/blog.dto';
import { BlogEntity } from '../../../../repository/blog/blog.entity';

export class BlogConverter {
  public convertToDto(blog: BlogEntity): BlogDto {
    return {
      id: blog.id,
      name: blog.name,
      shortDescription: blog.shortDescription,
      isPublished: blog.isPublished,
      htmlLinkBlog: blog.htmlLinkBlog,
    };
  }
  
  public convertToEntity(blogDto: BlogDto): BlogEntity {
    return {
      id: blogDto.id,
      name: blogDto.name,
      shortDescription: blogDto.shortDescription,
      isPublished: blogDto.isPublished,
      htmlLinkBlog: blogDto.htmlLinkBlog,
    };
  }
}