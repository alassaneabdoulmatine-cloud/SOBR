import { z } from 'zod';

export const projectFormatSchema = z.enum(['Vertical', 'Horyzontal']);

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Project name must be at least 3 characters long')
    .max(100, 'Project name must be at most 100 characters long'),

  thumbnailUrl: z.url().nullable().optional(),

  format: projectFormatSchema.default('Vertical'),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type Project = {
  id: string;
  name: string;
  format?: string;
  thumbnailUrl?: string;
  organizationId: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
};
