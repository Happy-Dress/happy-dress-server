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
import { IBlogService } from '../../../service/blog/blog.service.abstraction';
import { BlogDto } from '../../../service/blog/model/blog.dto';
import { BlogSearchDto } from '../../../service/blog/model/blog-search.dto';
import { BlogUploadResultDto } from '../../../service/blog/model/blog-upload-result.dto';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { NullFileValidationPipe } from '../../../service/blog/validator/blog.validation.pipe';

@ApiTags('blog')
@Controller('blog')
export class BlogController {

    @Inject()
    private blogService: IBlogService;

    @Get(':id')
    @ApiOkResponse({
      description: 'successful get blog response',
      type: BlogDto,
    })
    async getBlog(@Param('id', new ParseIntPipe()) id: number): Promise<BlogDto> {
      return await this.blogService.getBlog(id);
    }

    @Post('/search')
    @ApiOkResponse({
      description: 'successful search blog response',
      type: BlogDto,
    })
    async searchBlog(@Body() blogSearchDto: BlogSearchDto): Promise<BlogDto[]> {
      return await this.blogService.searchBlog(blogSearchDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/uploadFile')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOkResponse({
      description: 'successful upload blog file response',
      type: BlogUploadResultDto,
    })
    async uploadBlogFile(@UploadedFile(NullFileValidationPipe) file: Express.Multer.File): Promise<BlogUploadResultDto> {
      return await this.blogService.uploadFileBlog(file);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @ApiOkResponse({
      description: 'successful create blog response',
      type: BlogDto,
    })
    async createBlog(@Body() blogDto: BlogDto): Promise<BlogDto> {
      return await this.blogService.createBlog(blogDto);
    }

    @UseGuards(JwtAuthGuard)
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
    
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    @ApiOkResponse({
      description: 'successful delete blog response',
    })
    async deleteBlog(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
      await this.blogService.deleteBlog(id);
    }


}