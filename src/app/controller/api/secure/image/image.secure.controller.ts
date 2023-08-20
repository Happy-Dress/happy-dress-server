import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadResult } from '../../../../service/image/model/FilesUploadResult';
import { NullFilesValidationPipe } from '../../../../validation/files.validation.pipe';
import { IImageService } from '../../../../service/image/image.service.abstraction';
import { JwtAuthGuard } from '../../../security/guards/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('secure/images')
export class ImageSecureController {

  constructor(private readonly imageService: IImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadImages(@UploadedFiles(NullFilesValidationPipe) files: Express.Multer.File[]): Promise<FilesUploadResult> {
    return this.imageService.uploadImages(files);
  }
}
