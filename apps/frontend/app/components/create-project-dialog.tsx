import { zodResolver } from '@hookform/resolvers/zod';
import { createProjectSchema, type CreateProjectInput } from '@repo/validation';
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
import { useNavigate } from 'react-router';

type CreateProjectProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectProps) {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
    },
  });

  const { createProjectMutateAsync, isProjectSubmitting, projectSubmitError } = useProject();

  const onSubmit = async (data: CreateProjectInput) => {
    try {
      const createdProject = await createProjectMutateAsync(data);
      if (createdProject.id) {
        navigate(`/editor/${createdProject.id}`);
      }
      onOpenChange(false);
      toast.add({
        title: 'Project created successfully',
        description: `${data.name} has been added to your workspace.`,
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
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>Enter a name for your new project to get started.</DialogDescription>
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
                    disabled={isProjectSubmitting}
                    aria-invalid={fieldState.invalid}
                    className="h-10 bg-background text-sm"
                  />

                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />

            {projectSubmitError && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-2 text-sm text-destructive">
                <p className="text-center font-medium">{projectSubmitError.message}</p>
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
            <Button type="submit" size="lg" disabled={isProjectSubmitting} className="cursor-pointer">
              {isProjectSubmitting && <Spinner />}
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
