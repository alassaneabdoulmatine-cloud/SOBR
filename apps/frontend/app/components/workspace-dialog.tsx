import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { createWorkspaceSchema, type CreateWorkspaceFormType } from '@repo/validation/workspace';
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
import { toast } from '~/components/ui/toast';
import { Spinner } from '~/components/ui/spinner';
import { useWorkspace } from '~/hooks/use-workspace';
import { slugify } from '~/lib/utils';

export interface WorkspaceDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  description?: string;
}

export function WorkspaceDialog({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  description,
}: WorkspaceDialogProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (open: boolean) => {
    if (isControlled) {
      setControlledOpen?.(open);
    } else {
      setUncontrolledOpen(open);
    }
    if (!open) {
      reset();
    }
  };

  const queryClient = useQueryClient();

  const { control, handleSubmit, reset, watch } = useForm<CreateWorkspaceFormType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const watchedName = watch('name') || '';

  const { createWorkspaceMutateAsync, isSubmitting, submitError } = useWorkspace();

  const onSubmit = async (data: CreateWorkspaceFormType) => {
    const slug = slugify(data.name);

    try {
      await createWorkspaceMutateAsync({
        name: data.name.trim(),
        slug: slug || 'workspace',
      });

      toast.add({
        type: 'success',
        title: 'Workspace created',
        description: `Workspace "${data.name.trim()}" has been created successfully.`,
      });

      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      handleOpenChange(false);
      reset();
    } catch {
      // Error is caught and displayed via submitError
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg p-6 gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader className="gap-1.5 text-left">
            <DialogTitle className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Create workspace
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {description || 'Enter a name for your new workspace to get started.'}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="workspace-name" className="text-sm font-medium text-foreground">
                    Workspace name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="workspace-name"
                    placeholder="Acme Inc"
                    autoFocus
                    autoComplete="off"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    className="h-10 text-sm bg-background border-border"
                  />
                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />

            {submitError && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-2 text-sm text-destructive">
                <FieldError className="text-center font-medium">
                  {submitError.message === 'Organization already exists'
                    ? 'Workspace already exists. Please choose a different name.'
                    : submitError.message}
                </FieldError>
              </div>
            )}
          </FieldGroup>

          <div className="flex justify-between">
            <DialogClose
              render={
                <Button variant="outline" size="lg" type="button" disabled={isSubmitting} className="cursor-pointer">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" size="lg" disabled={isSubmitting || !watchedName.trim()} className="cursor-pointer ">
              {isSubmitting && <Spinner />}
              Create workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
