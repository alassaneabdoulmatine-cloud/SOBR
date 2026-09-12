import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import type { CreateProjectInput, UpdateProjectInput } from '@repo/validation';
import { RequireActiveOrg, Session, UserSession } from '@thallesp/nestjs-better-auth';

@RequireActiveOrg()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Session() session: UserSession, @Body() createProjectDto: CreateProjectInput) {
    return this.projectService.create(
      session.session.userId as string,
      session.session.activeOrganizationId as string,
      createProjectDto,
    );
  }

  @Get()
  findAll(@Session() session: UserSession) {
    return this.projectService.findAll(session.session.activeOrganizationId as string);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: UserSession) {
    return this.projectService.findOne(id, session.session.activeOrganizationId as string);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Session() session: UserSession, @Body() updateProjectDto: UpdateProjectInput) {
    return this.projectService.update(id, session.session.activeOrganizationId as string, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: UserSession) {
    return this.projectService.remove(id, session.session.activeOrganizationId as string);
  }
}
