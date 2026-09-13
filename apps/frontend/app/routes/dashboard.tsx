import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateProjectDialog } from '~/components/create-project-dialog';
import { useProject } from '~/hooks/use-project';
import { ProjectCard } from '~/components/project-card';

export default function VideosPage() {
  const [openCreateProject, setOpenCreateProject] = useState(false);

  const { activeProjects, activeProjectsIsPending } = useProject();
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
        {activeProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {/* modals */}
      <CreateProjectDialog open={openCreateProject} onOpenChange={setOpenCreateProject} />
    </div>
  );
}
