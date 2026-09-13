import { Button } from '~/components/ui/button';
import { MoreHorizontal, Pencil, Play, Plus, Scissors, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { CreateProjectDialog } from '~/components/create-project-dialog';
import type { Project } from '@repo/validation';
import { useProject } from '~/hooks/use-project';
import { RenameProjectDialog } from '~/components/rename-project-dialog';

function ProjectCard({ project }: { project: Project }) {
  const [openRenameProject, setOpenRenameProject] = useState(false);
  const isHorizontal = project.format === 'Horizontal';

  const navigate = useNavigate();
  const goToEditor = () => {
    navigate(`/editor/${project.id}`);
  };

  return (
    <div
      className={`
        group relative min-w-
        ${isHorizontal ? 'col-span-2' : 'col-span-1'}
      `}
    >
      <div
        className="
          relative
          h-full overflow-hidden
          rounded-xl
          text-left
          transition
          cursor-pointer
        "
        onClick={goToEditor}
      >
        {project.thumbnailUrl ? (
          <img src={project.thumbnailUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-primary">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="size-8 text-secondary" />
            </div>
          </div>
        )}

        {/* Dark gradient */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-28
            bg-linear-to-t
            from-black/70
            to-transparent
          "
        />

        {/* Title */}
        <div className="absolute p-2 bottom-2 w-full">
          <p
            className="
              truncate
              text-sm
              font-medium
              text-secondary
            "
          >
            {project.name}
          </p>

          <p className="text-xs text-secondary/75">{project.createdAt}</p>
        </div>
      </div>

      {/* More */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="absolute right-2 bottom-4 rounded-full p-2 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent className="w-60 p-2" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              render={
                <Button variant="ghost" size="lg" onClick={goToEditor}>
                  <div className="flex items-center gap-2 justify-start w-full">
                    <Scissors />
                    <span>Edit</span>
                  </div>
                </Button>
              }
            ></DropdownMenuItem>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              render={
                <Button variant="ghost" size="lg" onClick={() => setOpenRenameProject(true)}>
                  <div className="flex items-center gap-2 justify-start w-full">
                    <Pencil />
                    <span>Rename</span>
                  </div>
                </Button>
              }
            ></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              render={
                <Button variant="ghost" size="lg">
                  <div className="flex items-center gap-2 justify-start w-full text-destructive">
                    <Trash />
                    <span>Delete</span>
                  </div>
                </Button>
              }
            ></DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
        <RenameProjectDialog open={openRenameProject} onOpenChange={setOpenRenameProject} project={project} />
      </DropdownMenu>
    </div>
  );
}

export default function VideosPage() {
  const [openCreateProject, setOpenCreateProject] = useState(false);

  const { projects, projectsIsPending } = useProject();
  return (
    <div className="p-8 w-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-semibold tracking-tight">Projects</h1>

        <Button className="cursor-pointer w-20" onClick={() => setOpenCreateProject(true)}>
          <Plus className="size-4" />
          New
        </Button>
      </div>

      {/* Videos */}
      <section
        className="
            mt-7
            grid
            grid-cols-10
            auto-rows-57.5
            gap-3
          "
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {/* modals */}
      <CreateProjectDialog open={openCreateProject} onOpenChange={setOpenCreateProject} />
    </div>
  );
}
