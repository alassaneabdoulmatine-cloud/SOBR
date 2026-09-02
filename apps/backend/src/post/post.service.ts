import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db';
import { post } from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreatePostDto } from './type';

@Injectable()
export class PostService {
  async create(createPostDto: CreatePostDto) {
    return db.insert(post).values(createPostDto);
  }

  async findAll() {
    return db.select().from(post);
  }

  async findOne(id: string) {
    const result = await db.select().from(post).where(eq(post.id, id));
    if (result.length === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return result[0];
  }

  async update(id: string, updatePostDto: Partial<CreatePostDto>) {
    const result = await db.update(post).set(updatePostDto).where(eq(post.id, id)).returning();
    if (result.length === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return result[0];
  }

  async remove(id: string) {
    const result = await db.delete(post).where(eq(post.id, id)).returning();
    if (result.length === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return result[0];
  }
}
