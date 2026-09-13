CREATE INDEX "project_organizationId_idx" ON "project" ("organization_id");--> statement-breakpoint
CREATE INDEX "project_ownerId_idx" ON "project" ("owner_id");--> statement-breakpoint
CREATE INDEX "project_deletedAt_idx" ON "project" ("deleted_at");