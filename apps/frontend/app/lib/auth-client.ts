import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';

const baseURL = import.meta.env.VITE_BETTER_AUTH_URL || 'http://localhost:4000';

export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [organizationClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  organization,
  useActiveOrganization,
  useActiveMember,
  useListOrganizations,
} = authClient;
