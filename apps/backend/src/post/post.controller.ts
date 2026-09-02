import { Controller, Post, Body, Param, Put, Get, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  async create(@Body() data: CreatePostDto) {
    return this.postService.create(data);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreatePostDto>) {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

}
