import { BlogDto } from './blog.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DownloadedFileModel } from '../../../client/google-drive/models/DownloadedFile.model';

export class BlogViewDto extends BlogDto {

    @ApiProperty()
    htmlFile: DownloadedFileModel;

}