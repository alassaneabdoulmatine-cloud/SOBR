import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';

const baseURL = process.env.BETTER_AUTH_URL || 'http://localhost:4000';
console.log('auth base url', process.env.BETTER_AUTH_URL);
console.log('base url', baseURL);

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
