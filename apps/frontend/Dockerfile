# # ─── Base ────────────────────────────────────────────────────────────────────
# FROM node:24.19.0-bookworm-slim AS base

# WORKDIR /app

# ENV CI=true

# RUN npm install -g pnpm@11.22.0


# # ─── Pruner ──────────────────────────────────────────────────────────────────
# FROM base AS pruner

# COPY . .

# RUN pnpm dlx turbo prune frontend --docker


# # ─── Dependencies ────────────────────────────────────────────────────────────
# FROM base AS deps

# COPY --from=pruner /app/out/json/ ./

# RUN pnpm install --frozen-lockfile


# # ─── Build ───────────────────────────────────────────────────────────────────
# FROM base AS builder

# COPY --from=deps /app/ ./
# COPY --from=pruner /app/out/full/ ./

# RUN pnpm turbo run build --filter=frontend

# RUN pnpm prune --prod


# # ─── Runtime ──────────────────────────────────────────────────────────────────
# FROM node:24.19.0-bookworm-slim AS runtime

# WORKDIR /app

# RUN npm install -g pnpm@11.22.0

# ENV NODE_ENV=production

# # COPY --from=builder /app/apps/frontend/package.json ./package.json
# # COPY --from=builder /app/apps/frontend/build ./build
# # COPY --from=builder /app/apps/frontend/public ./public

# # COPY --from=builder /app/node_modules ./node_modules

# COPY --from=builder --chown=node:node /app/apps/frontend/package.json ./package.json
# COPY --from=builder --chown=node:node /app/apps/frontend/build ./build
# COPY --from=builder --chown=node:node /app/apps/frontend/public ./public
# COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# USER node

# EXPOSE 3000

# CMD ["pnpm", "run", "start"]



# ─── Base ────────────────────────────────────────────────────────────────────
FROM node:24.19.0-bookworm-slim AS base

WORKDIR /app

ENV CI=true

RUN npm install -g pnpm@11.22.0


# ─── Pruner ──────────────────────────────────────────────────────────────────
FROM base AS pruner

COPY . .

RUN pnpm dlx turbo prune frontend --docker


# ─── Dependencies ────────────────────────────────────────────────────────────
FROM base AS deps

COPY --from=pruner /app/out/json/ ./

RUN pnpm install --frozen-lockfile


# ─── Build ───────────────────────────────────────────────────────────────────
FROM base AS builder

COPY --from=deps /app/ ./
COPY --from=pruner /app/out/full/ ./

RUN pnpm turbo run build --filter=frontend

RUN pnpm prune --prod


# ─── Runtime ──────────────────────────────────────────────────────────────────
FROM node:24.19.0-bookworm-slim AS runtime

RUN npm install -g pnpm@11.22.0

WORKDIR /app

ENV NODE_ENV=production
# pnpm 11 active par défaut "verifyDepsBeforeRun", qui déclenche une réinstallation
# automatique avant tout script si node_modules ne matche pas exactement le lockfile.
# Dans un container non-TTY, la purge de node_modules qu'elle tente échoue avec
# ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY. On désactive: l'image est déjà construite,
# on ne veut jamais qu'elle réinstalle quoi que ce soit au démarrage.
ENV PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false

# On copie TOUT le monorepo élagué depuis builder, pas juste des bouts,
# pour préserver les symlinks pnpm entre apps/frontend/node_modules et /app/node_modules.
COPY --from=builder --chown=node:node /app ./

# --chown sur COPY ne touche pas le dossier /app lui-même (créé par WORKDIR,
# donc appartenant à root). pnpm écrit un fichier temporaire à la racine
# de /app au démarrage (runDepsStatusCheck) -> il faut que /app soit writable par node.
RUN chown node:node /app

USER node

WORKDIR /app/apps/frontend

EXPOSE 3000

CMD ["pnpm", "run", "start"]