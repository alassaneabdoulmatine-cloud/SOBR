import { zodResolver } from '@hookform/resolvers/zod';
import { updateProjectSchema, type UpdateProjectInput } from '@repo/validation';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Spinner } from './ui/spinner';
import { useProject } from '~/hooks/use-project';
import { toast } from './ui/toast';
import type { Project } from '@repo/validation';

type RenameProjectProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
};

export function RenameProjectDialog({ open, onOpenChange, project }: RenameProjectProps) {
  const { control, handleSubmit } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name,
    },
  });

  const { updateProjectMutateAsync, projectUpdateError, projectIsUpdating } = useProject();

  const onSubmit = async (data: UpdateProjectInput) => {
    try {
      await updateProjectMutateAsync({ id: project.id, data });
      onOpenChange(false);
      toast.add({
        title: 'Project updated successfully',
        description: `${project.name} has been updated to your workspace.`,
        type: 'success',
      });
    } catch {
      // Error is already handled by the mutation state.
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>Rename your project.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="project-name">Project Name</FieldLabel>

                  <Input
                    {...field}
                    id="project-name"
                    placeholder="My Project"
                    autoFocus
                    autoComplete="off"
                    disabled={projectIsUpdating}
                    aria-invalid={fieldState.invalid}
                    className="h-10 bg-background text-sm"
                  />

                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />

            {projectUpdateError && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-2 text-sm text-destructive">
                <p className="text-center font-medium">{projectUpdateError.message}</p>
              </div>
            )}
          </FieldGroup>

          {/* footer */}
          <div className="flex justify-end items-center gap-4 w-full">
            <DialogClose
              render={
                <Button variant="outline" className="cursor-pointer" size="lg">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" size="lg" disabled={projectIsUpdating} className="cursor-pointer">
              {projectIsUpdating && <Spinner />}
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
