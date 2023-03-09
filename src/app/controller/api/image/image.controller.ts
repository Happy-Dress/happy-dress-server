import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../../service/image/image.service.abstraction';
import { ImageUploadResult } from '../../../service/image/model/ImageUploadResult';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { NullFileValidationPipe } from '../../../service/image/validator/image.validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImageController {

  constructor(private readonly imageService: IImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadImages(@UploadedFiles(NullFileValidationPipe) files: Express.Multer.File[]): Promise<ImageUploadResult> {
    return this.imageService.uploadImages(files);
  }
}
