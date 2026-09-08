import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organization } from '~/lib/auth-client';
import { useNavigate } from 'react-router';

export function useWorkspace() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutateAsync: createWorkspaceMutateAsync,
    isPending: isSubmitting,
    error: submitError,
  } = useMutation({
    mutationFn: async ({ name, slug }: { name: string; slug: string }) => {
      const result = await organization.create({
        name,
        slug,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to create workspace');
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      navigate('/dashboard');
    },
  });
  return {
    createWorkspaceMutateAsync,
    isSubmitting,
    submitError,
  };
}
