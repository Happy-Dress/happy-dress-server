import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../../service/image/image.service.abstraction';
import { FilesUploadResult } from '../../../service/image/model/FilesUploadResult';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { NullFilesValidationPipe } from '../../../validation/files.validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImageController {

  constructor(private readonly imageService: IImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadImages(@UploadedFiles(NullFilesValidationPipe) files: Express.Multer.File[]): Promise<FilesUploadResult> {
    return this.imageService.uploadImages(files);
  }
}
