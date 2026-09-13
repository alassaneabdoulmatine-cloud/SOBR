import { Injectable } from '@nestjs/common';
import type { CreateProjectInput, UpdateProjectInput } from '@repo/validation';
import { and, eq, isNotNull, isNull } from 'drizzle-orm';
import { db } from 'src/db';
import { project } from 'src/db/schema';

@Injectable()
export class ProjectService {
  async create(userId: string, organizationId: string, createProjectDto: CreateProjectInput) {
    return db
      .insert(project)
      .values({
        name: createProjectDto.name,
        organizationId: organizationId,
        ownerId: userId,
      })
      .returning();
  }

  async findAll(organizationId: string) {
    return db.select().from(project).where(eq(project.organizationId, organizationId));
  }
  async findActiveProjects(organizationId: string) {
    return db
      .select()
      .from(project)
      .where(and(eq(project.organizationId, organizationId), isNull(project.deletedAt)));
  }

  async findDeletedProjects(organizationId: string) {
    return db
      .select()
      .from(project)
      .where(and(eq(project.organizationId, organizationId), isNotNull(project.deletedAt)));
  }

  async findOne(id: string, organizationId: string) {
    return db.query.project.findFirst({
      where: {
        id: id,
        organizationId: organizationId,
      },
    });
  }

  async update(id: string, organizationId: string, updateProjectDto: UpdateProjectInput) {
    return db
      .update(project)
      .set({
        name: updateProjectDto.name,
        thumbnailUrl: updateProjectDto.thumbnailUrl,
        format: updateProjectDto.format,
      })
      .where(and(eq(project.id, id), eq(project.organizationId, organizationId)))
      .returning();
  }

  async moveToTrash(id: string, organizationId: string) {
    return db
      .update(project)
      .set({
        deletedAt: new Date(),
      })
      .where(and(eq(project.id, id), eq(project.organizationId, organizationId), isNull(project.deletedAt)))
      .returning();
  }

  async restoreFromTrash(id: string, organizationId: string) {
    return db
      .update(project)
      .set({
        deletedAt: null,
      })
      .where(and(eq(project.id, id), eq(project.organizationId, organizationId), isNotNull(project.deletedAt)))
      .returning();
  }

  async permanentDelete(id: string, organizationId: string) {
    return db
      .delete(project)
      .where(and(eq(project.id, id), eq(project.organizationId, organizationId), isNotNull(project.deletedAt)))
      .returning();
  }
}
