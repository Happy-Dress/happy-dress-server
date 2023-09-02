import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post, Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IBlogService } from '../../../../service/blog/blog.service.abstraction';
import { BlogDto } from '../../../../service/blog/model/blog.dto';
import { BlogSearchDto } from '../../../../service/blog/model/blog-search.dto';
import { JwtAccessAuthGuard } from '../../../security/guards/jwt.access.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogUploadResultDto } from '../../../../service/blog/model/blog-upload-result.dto';
import { NullFileValidationPipe } from '../../../../validation/file.validation.pipe';

@ApiTags('blog')
@Controller('blog')
export class BlogSecureController {

    @Inject()
    private blogService: IBlogService;

    @UseGuards(JwtAccessAuthGuard)
    @Get(':id')
    @ApiOkResponse({
      description: 'successful get blog response',
      type: BlogDto,
    })
    async getBlog(@Param('id', new ParseIntPipe()) id: number): Promise<BlogDto> {
      return await this.blogService.getBlog(id);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post('/search')
    @ApiOkResponse({
      description: 'successful search blog response',
      type: BlogDto,
    })
    async searchBlog(@Body() blogSearchDto: BlogSearchDto): Promise<BlogDto[]> {
      return await this.blogService.searchBlog(blogSearchDto);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post('/uploadFile')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOkResponse({
      description: 'successful upload blog file response',
      type: BlogUploadResultDto,
    })
    async uploadBlogFile(@UploadedFile(NullFileValidationPipe) file: Express.Multer.File): Promise<BlogUploadResultDto> {
      return await this.blogService.uploadFileBlog(file);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post('/create')
    @ApiOkResponse({
      description: 'successful create blog response',
      type: BlogDto,
    })
    async createBlog(@Body() blogDto: BlogDto): Promise<BlogDto> {
      return await this.blogService.createBlog(blogDto);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put('/update/:id')
    @ApiOkResponse({
      description: 'successful update blog response',
      type: BlogDto,
    })
    async updateBlog(
      @Param('id', new ParseIntPipe()) id: number,
        @Body() blogDto: BlogDto): Promise<BlogDto> {
      return await this.blogService.updateBlog(id, blogDto);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Delete('/delete')
    @ApiOkResponse({
      description: 'successful delete blog response',
    })
    async deleteBlog(@Body() ids: Set<number>): Promise<void> {
      await this.blogService.deleteBlog(ids);
    }


}