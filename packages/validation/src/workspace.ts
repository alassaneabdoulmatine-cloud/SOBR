import * as z from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, 'Workspace name must be at least 3 characters long')
    .max(32, 'Workspace name must be at most 32 characters long')
    .nonempty('Workspace name is required'),
});

export type CreateWorkspaceFormType = z.infer<typeof createWorkspaceSchema>;
