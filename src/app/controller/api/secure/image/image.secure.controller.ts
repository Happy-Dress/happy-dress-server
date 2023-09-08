import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../../../service/image/image.service.abstraction';
import { ApiTags } from '@nestjs/swagger';
import { NullFilesValidationPipe } from '../../../../validation/files.validation.pipe';
import { JwtAccessAuthGuard } from '../../../security/guards/jwt.access.auth.guard';
import { ImagesUploadResult } from '../../../../service/image/model/ImagesUploadResult.model';

@ApiTags('images')
@Controller('secure/images')
export class ImageSecureController {

  constructor(private readonly imageService: IImageService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadImages(@UploadedFiles(NullFilesValidationPipe) files: Express.Multer.File[]): Promise<ImagesUploadResult> {
    return this.imageService.uploadImages(files);
  }
}
