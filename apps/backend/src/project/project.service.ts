import { Injectable } from '@nestjs/common';
import type { CreateProjectInput, UpdateProjectInput } from '@repo/validation';
import { and, eq } from 'drizzle-orm';
import { db } from 'src/db';
import { project } from 'src/db/schema';

@Injectable()
export class ProjectService {
  async create(userId: string, organizationId: string, createProjectDto: CreateProjectInput) {
    const projectCreated = await db
      .insert(project)
      .values({
        name: createProjectDto.name,
        organizationId: organizationId,
        ownerId: userId,
      })
      .returning();
    return projectCreated;
  }

  async findAll(organizationId: string) {
    const projects = await db.select().from(project).where(eq(project.organizationId, organizationId));
    return projects;
  }

  async findOne(id: string, organizationId: string) {
    const project = await db.query.project.findFirst({
      where: {
        id: id,
        organizationId: organizationId,
      },
    });
    return project;
  }

  async update(id: string, organizationId: string, updateProjectDto: UpdateProjectInput) {
    const projectUpdated = await db
      .update(project)
      .set({
        name: updateProjectDto.name,
        thumbnailUrl: updateProjectDto.thumbnailUrl,
        format: updateProjectDto.format,
      })
      .where(and(eq(project.id, id), eq(project.organizationId, organizationId)))
      .returning();
    return projectUpdated;
  }

  async remove(id: string, organizationId: string) {
    const projectRemoved = await db
      .delete(project)
      .where(and(eq(project.id, id), eq(project.organizationId, organizationId)))
      .returning();
    return projectRemoved;
  }
}
