import { defineRelations } from 'drizzle-orm';
import { schema } from './schema';

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.userId,
    }),
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.userId,
    }),
    member: r.many.member({
      from: r.user.id,
      to: r.member.userId,
    }),
    invitation: r.many.invitation({
      from: r.user.id,
      to: r.invitation.inviterId,
    }),
    project: r.many.project({
      from: r.user.id,
      to: r.project.ownerId,
    }),
  },

  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },

  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },

  organization: {
    member: r.many.member({
      from: r.organization.id,
      to: r.member.organizationId,
    }),
    invitation: r.many.invitation({
      from: r.organization.id,
      to: r.invitation.organizationId,
    }),
    projects: r.many.project({
      from: r.organization.id,
      to: r.project.organizationId,
    }),
  },

  member: {
    organization: r.one.organization({
      from: r.member.organizationId,
      to: r.organization.id,
    }),
    user: r.one.user({
      from: r.member.userId,
      to: r.user.id,
    }),
  },

  invitation: {
    organization: r.one.organization({
      from: r.invitation.organizationId,
      to: r.organization.id,
    }),
    inviter: r.one.user({
      from: r.invitation.inviterId,
      to: r.user.id,
    }),
  },

  project: {
    organization: r.one.organization({
      from: r.project.organizationId,
      to: r.organization.id,
    }),
    owner: r.one.user({
      from: r.project.ownerId,
      to: r.user.id,
    }),
  },
}));
