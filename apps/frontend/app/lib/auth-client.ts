import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';

const baseURL = 'https://sobr-backend-latest.onrender.com';
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
