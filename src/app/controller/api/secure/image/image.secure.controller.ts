import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../../../service/image/image.service.abstraction';
import { ImageUploadResult } from '../../../../service/image/model/ImageUploadResult';
import { JwtAccessAuthGuard } from '../../../security/guards/jwt.access.auth.guard';
import { NullFileValidationPipe } from '../../../../service/image/validator/image.validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('secure/images')
export class ImageSecureController {

  constructor(private readonly imageService: IImageService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadImages(@UploadedFiles(NullFileValidationPipe) files: Express.Multer.File[]): Promise<ImageUploadResult> {
    return this.imageService.uploadImages(files);
  }
}
