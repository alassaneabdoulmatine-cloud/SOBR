import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createWorkspaceSchema, type CreateWorkspaceFormType } from '@repo/validation/workspace';
import { Button } from '~/components/ui/button';
import { Field, FieldError, FieldGroup } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Spinner } from '~/components/ui/spinner';
import { slugify } from '~/lib/utils';
import { useWorkspace } from '~/hooks/use-workspace';
import { redirect } from 'react-router';
import type { Route } from './+types/workspace';
import { organization } from '~/lib/auth-client';
import { useState } from 'react';

export async function loader({ request }: Route.LoaderArgs) {
  const { data } = await organization.list({
    fetchOptions: { headers: request.headers },
  });
  console.log('data', data);
  if (data && data.length > 0) {
    throw redirect('/dashboard');
  }
  return;
}

export default function WorkspacePage() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { control, handleSubmit } = useForm<CreateWorkspaceFormType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const { createWorkspaceMutateAsync, isSubmitting, submitError } = useWorkspace();

  const onSubmit = async (data: CreateWorkspaceFormType) => {
    const slug = slugify(data.name);

    try {
      await createWorkspaceMutateAsync({
        name: data.name.trim(),
        slug: slug || 'workspace',
      });
      setIsRedirecting(true);
    } catch {
      setIsRedirecting(false);
    }
  };
  return (
    <div className="flex w-full h-screen p-4 items-center justify-center">
      <div className="w-1/4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full h-full flex flex-col items-center justify-center p-4"
        >
          <FieldGroup className="gap-4 w-full">
            <div className="gap-1.5 text-center">
              <h1 className="text-xl font-semibold">Create workspace</h1>
              <p className="text-sm text-muted-foreground">Enter a name for your new workspace to get started.</p>
            </div>

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
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

            <Button type="submit" size="lg" disabled={isSubmitting || isRedirecting} className="cursor-pointer">
              {(isSubmitting || isRedirecting) && <Spinner />}
              Continue
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
