import type { CreateProjectInput, Project, UpdateProjectInput } from '@repo/validation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/utils';

export function useProject() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createProjectMutateAsync,
    isPending: isProjectSubmitting,
    error: projectSubmitError,
  } = useMutation({
    mutationFn: async ({ name }: CreateProjectInput) => {
      return api<Project>('/project', {
        method: 'POST',
        body: JSON.stringify({
          name,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const {
    data: projects,
    isError: projectsIsError,
    isPending: projectsIsPending,
    error: projectsError,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return api<Project[]>('/project');
    },
  });

  const {
    mutateAsync: updateProjectMutateAsync,
    isPending: projectIsUpdating,
    error: projectUpdateError,
  } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProjectInput }) => {
      return api<Project>(`/project/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const {
    mutateAsync: deleteProjectMutateAsync,
    isPending: projectIsDeleting,
    error: projectDeleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return api<Project>(`/project/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    createProjectMutateAsync,
    projectSubmitError,
    isProjectSubmitting,
    projects: projects || [],
    projectsError,
    projectsIsPending,
    projectsIsError,
    updateProjectMutateAsync,
    projectUpdateError,
    projectIsUpdating,
    deleteProjectMutateAsync,
    projectIsDeleting,
    projectDeleteError,
  };
}
