import { AlertTriangleIcon, Trash2Icon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { type Project } from '@repo/validation';
import { useProject } from '~/hooks/use-project';
import { toast } from './ui/toast';
import { Spinner } from './ui/spinner';

type DeleteProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
};

export function DeleteProjectDialog({ open, onOpenChange, project }: DeleteProjectDialogProps) {
  const { permanentDeleteProjectMutateAsync, projectIsPermanentDeleting } = useProject();

  async function handleDelete() {
    try {
      await permanentDeleteProjectMutateAsync(project.id);
      toast.add({
        title: 'Project deleted',
        description: 'The project has been deleted successfully',
        type: 'success',
      });
    } catch (error) {
      toast.add({
        title: 'Failed to delete project',
        description: 'An error occurred while deleting the project',
        type: 'error',
      });
    } finally {
      onOpenChange(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm" className="p-8">
        <AlertDialogHeader className="items-center text-center ">
          {/* Icône d'alerte dans un cercle rouge */}
          <div className="flex items-center justify-center bg-destructive text-white rounded-full h-12 w-12">
            <AlertTriangleIcon />
          </div>

          <AlertDialogTitle className=" font-semibold">Delete Project</AlertDialogTitle>

          <AlertDialogDescription>
            <div>Delete {project.name}?</div>
            <div>
              <span className="text-xs font-semibold">This action cannot be undone.</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center space-x-6">
          <AlertDialogCancel size="lg" className="rounded-full px-8 py-4 cursor-pointer" variant="outline">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size="lg"
            className="rounded-full px-8 py-4 cursor-pointer"
            variant="destructive"
            onClick={handleDelete}
            disabled={projectIsPermanentDeleting}
          >
            {projectIsPermanentDeleting && <Spinner />}
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
