import { Button } from '~/components/ui/button';
import { MoreHorizontal, Pencil, Play, Scissors, Trash, RotateCcw } from 'lucide-react';

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

import type { Project } from '@repo/validation';

import { RenameProjectDialog } from '~/components/rename-project-dialog';
import { useProject } from '~/hooks/use-project';
import { DeleteProjectDialog } from './delete-project-dialog';

type ProjectCardProps = {
  project: Project;
  variant?: 'default' | 'trash';
};

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const [openRenameProject, setOpenRenameProject] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);

  const { moveToTrashMutateAsync, restoreFromTrashMutateAsync, permanentDeleteProjectMutateAsync } = useProject();

  const navigate = useNavigate();

  const isTrash = variant === 'trash';
  const isHorizontal = project.format === 'Horizontal';

  const goToEditor = () => {
    if (isTrash) return;

    navigate(`/editor/${project.id}`);
  };

  const handleMoveToTrash = async () => {
    await moveToTrashMutateAsync(project.id);
  };

  const handleRestore = async () => {
    await restoreFromTrashMutateAsync(project.id);
  };

  return (
    <div
      className={`
        group relative
        ${isHorizontal ? 'col-span-2' : 'col-span-1'}
      `}
    >
      {/* Project thumbnail */}
      <div
        className={`
          relative
          h-full
          overflow-hidden
          rounded-xl
          text-left
          transition
          ${!isTrash ? 'cursor-pointer' : ''}
        `}
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
        <div className="absolute bottom-2 w-full p-2">
          <p className="truncate text-sm font-medium text-secondary">{project.name}</p>

          <p className="text-xs text-secondary/75">{project.createdAt}</p>
        </div>
      </div>

      {/* More */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="
                absolute right-2 bottom-4
                cursor-pointer
                rounded-full
                p-2
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent className="w-60 p-2" align="start">
          {!isTrash ? (
            <>
              {/* Edit */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  render={
                    <Button variant="ghost" size="lg" onClick={goToEditor}>
                      <div className="flex w-full items-center justify-start gap-2">
                        <Scissors />
                        <span>Edit</span>
                      </div>
                    </Button>
                  }
                />
              </DropdownMenuGroup>

              {/* Rename */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  render={
                    <Button variant="ghost" size="lg" onClick={() => setOpenRenameProject(true)}>
                      <div className="flex w-full items-center justify-start gap-2">
                        <Pencil />
                        <span>Rename</span>
                      </div>
                    </Button>
                  }
                />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Move to trash */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  render={
                    <Button variant="ghost" size="lg" onClick={handleMoveToTrash}>
                      <div className="flex w-full items-center justify-start gap-2 text-destructive">
                        <Trash />
                        <span>Move to trash</span>
                      </div>
                    </Button>
                  }
                />
              </DropdownMenuGroup>
            </>
          ) : (
            <>
              {/* Restore */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  render={
                    <Button variant="ghost" size="lg" onClick={handleRestore}>
                      <div className="flex w-full items-center justify-start gap-2">
                        <RotateCcw />
                        <span>Restore</span>
                      </div>
                    </Button>
                  }
                />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Delete permanently */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  render={
                    <Button variant="ghost" size="lg" onClick={() => setOpenDeleteProject(true)}>
                      <div className="flex w-full items-center justify-start gap-2 text-destructive">
                        <Trash />
                        <span>Delete permanently</span>
                      </div>
                    </Button>
                  }
                />
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>

        {!isTrash ? (
          <RenameProjectDialog open={openRenameProject} onOpenChange={setOpenRenameProject} project={project} />
        ) : (
          <DeleteProjectDialog open={openDeleteProject} onOpenChange={setOpenDeleteProject} project={project} />
        )}
      </DropdownMenu>
    </div>
  );
}
