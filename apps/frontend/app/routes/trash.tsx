import { useProject } from '~/hooks/use-project';
import { ProjectCard } from '~/components/project-card';
import { Trash } from 'lucide-react';

export default function TrashPage() {
  const { deletedProjects, deletedProjectsIsPending } = useProject();
  console.log(deletedProjects);
  return (
    <div className="p-8 w-full">
      {/* Page header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-semibold tracking-tight">Trash projects</h1>
        </div>
        <div className="flex items-center justify-center w-full gap-2 bg-destructive/10 p-4 rounded-xl border border-destructive">
          <Trash className="size-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">projects in trash will be deleted in 30 days</span>
        </div>
      </div>

      <section
        className="
            mt-7
            grid
            grid-cols-10
            auto-rows-57.5
            gap-3
          "
      >
        {deletedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="trash" />
        ))}
      </section>
    </div>
  );
}
