import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IBlogService } from '../../../../service/blog/blog.service.abstraction';
import { BlogDto } from '../../../../service/blog/model/blog.dto';
import { BlogSearchDto } from '../../../../service/blog/model/blog-search.dto';
import { BlogViewDto } from '../../../../service/blog/model/blog-view.dto';

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
    async getBlog(@Param('id', new ParseIntPipe()) id: number): Promise<BlogViewDto> {
      return await this.blogService.getBlog(id);
    }

    @Post('/search')
    @ApiOkResponse({
      description: 'successful search blog response',
      type: BlogDto,
    })
    async searchBlog(@Body() blogSearchDto: BlogSearchDto): Promise<BlogViewDto[]> {
      return await this.blogService.searchBlog(blogSearchDto);
    }

}