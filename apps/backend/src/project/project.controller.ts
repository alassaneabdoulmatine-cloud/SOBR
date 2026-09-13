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

  @Get('active')
  findActiveProjects(@Session() session: UserSession) {
    return this.projectService.findActiveProjects(session.session.activeOrganizationId as string);
  }

  @Get('trash')
  findDeletedProjects(@Session() session: UserSession) {
    return this.projectService.findDeletedProjects(session.session.activeOrganizationId as string);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: UserSession) {
    return this.projectService.findOne(id, session.session.activeOrganizationId as string);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Session() session: UserSession, @Body() updateProjectDto: UpdateProjectInput) {
    return this.projectService.update(id, session.session.activeOrganizationId as string, updateProjectDto);
  }

  @Patch(':id/to-trash')
  moveToTrash(@Param('id') id: string, @Session() session: UserSession) {
    return this.projectService.moveToTrash(id, session.session.activeOrganizationId as string);
  }

  @Patch(':id/restore')
  restoreFromTrash(@Param('id') id: string, @Session() session: UserSession) {
    return this.projectService.restoreFromTrash(id, session.session.activeOrganizationId as string);
  }

  @Delete(':id/permanent')
  permanentDelete(@Param('id') id: string, @Session() session: UserSession) {
    return this.projectService.permanentDelete(id, session.session.activeOrganizationId as string);
  }
}
