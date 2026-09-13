import type { CreateProjectInput, Project, UpdateProjectInput } from '@repo/validation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/utils';

export function useProject() {
  const queryClient = useQueryClient();

  const queryKeys = {
    projects: ['projects'],
    activeProjects: ['activeProjects'],
    deletedProjects: ['deletedProjects'],
  };

  const invalidateAllQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    queryClient.invalidateQueries({ queryKey: queryKeys.activeProjects });
    queryClient.invalidateQueries({ queryKey: queryKeys.deletedProjects });
  };

  // Create project
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
      invalidateAllQuery();
    },
  });

  // Get all projects
  const {
    data: projects,
    isError: projectsIsError,
    isPending: projectsIsPending,
    error: projectsError,
  } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: async () => {
      return api<Project[]>('/project');
    },
  });

  // Get all active projects
  const {
    data: activeProjects,
    isError: activeProjectsIsError,
    isPending: activeProjectsIsPending,
    error: activeProjectsError,
  } = useQuery({
    queryKey: queryKeys.activeProjects,
    queryFn: async () => {
      return api<Project[]>('/project/active');
    },
  });

  // Get all deleted projects
  const {
    data: deletedProjects,
    isError: deletedProjectsIsError,
    isPending: deletedProjectsIsPending,
    error: deletedProjectsError,
  } = useQuery({
    queryKey: queryKeys.deletedProjects,
    queryFn: async () => {
      return api<Project[]>('/project/trash');
    },
  });

  // Update project
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
      invalidateAllQuery();
    },
  });

  // Move project to trash
  const {
    mutateAsync: moveToTrashMutateAsync,
    isPending: projectIsMovingToTrash,
    error: projectMoveToTrashError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return api<Project>(`/project/${id}/to-trash`, {
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      invalidateAllQuery();
    },
  });

  // Restore project from trash
  const {
    mutateAsync: restoreFromTrashMutateAsync,
    isPending: projectIsRestoringFromTrash,
    error: projectRestoreFromTrashError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return api<Project>(`/project/${id}/restore`, {
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      invalidateAllQuery();
    },
  });

  // Permanent delete project
  const {
    mutateAsync: permanentDeleteProjectMutateAsync,
    isPending: projectIsPermanentDeleting,
    error: projectPermanentDeleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      return api<Project>(`/project/${id}/permanent`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      invalidateAllQuery();
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

    activeProjects: activeProjects || [],
    activeProjectsError,
    activeProjectsIsPending,
    activeProjectsIsError,

    deletedProjects: deletedProjects || [],
    deletedProjectsError,
    deletedProjectsIsPending,
    deletedProjectsIsError,

    updateProjectMutateAsync,
    projectUpdateError,
    projectIsUpdating,

    moveToTrashMutateAsync,
    projectIsMovingToTrash,
    projectMoveToTrashError,

    restoreFromTrashMutateAsync,
    projectIsRestoringFromTrash,
    projectRestoreFromTrashError,

    permanentDeleteProjectMutateAsync,
    projectIsPermanentDeleting,
    projectPermanentDeleteError,
  };
}
