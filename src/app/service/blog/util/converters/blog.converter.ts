import { BlogDto } from '../../model/blog.dto';
import { BlogEntity } from '../../../../repository/blog/blog.entity';
import { DownloadedFileModel } from '../../../../client/google-drive/models/DownloadedFile.model';
import { BlogViewDto } from '../../model/blog-view.dto';

export class BlogConverter {
  public convertToDto(blog: BlogEntity, blogFile: DownloadedFileModel): BlogViewDto {
    return {
      id: blog.id,
      name: blog.name,
      shortDescription: blog.shortDescription,
      isPublished: blog.isPublished,
      htmlLinkId: blog.htmlLinkId,
      htmlFile: blogFile,
    };
  }
  
  public convertToEntity(blogDto: BlogDto): BlogEntity {
    return {
      id: blogDto.id,
      name: blogDto.name,
      shortDescription: blogDto.shortDescription,
      isPublished: blogDto.isPublished,
      htmlLinkId: blogDto.htmlLinkId,
    };
  }
}