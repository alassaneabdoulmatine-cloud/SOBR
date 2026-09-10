import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { member, schema } from './db/schema';
import { organization } from 'better-auth/plugins';
import { asc, eq } from 'drizzle-orm';

async function getInitialOrganization(userId: string) {
  const [firstMember] = await db
    .select({ organizationId: member.organizationId })
    .from(member)
    .where(eq(member.userId, userId))
    .orderBy(asc(member.createdAt))
    .limit(1);

  return firstMember ?? null;
}

const weburl = process.env.WEB_URL || 'http://localhost:5173';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  trustedOrigins: [weburl],
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const firstMember = await getInitialOrganization(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: firstMember.organizationId,
            },
          };
        },
      },
    },
  },

  plugins: [organization()],
});
