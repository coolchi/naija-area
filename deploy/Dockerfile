# Naija Area: container image (launch PREPARATION, NOT BUILT OR RUN: no Docker on the machine this was written on).
# Build from the app folder:   docker build -f deploy/Dockerfile -t naija-area:local .
# Three stages: (1) build the browser bundle with dev tools, (2) install only runtime packages, (3) a small runtime image. No secrets are baked in; everything comes from environment variables.
FROM node:20-bookworm-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci
COPY client ./client
COPY server ./server
COPY tools/build-client.mjs ./tools/build-client.mjs
RUN NODE_ENV=production node tools/build-client.mjs

FROM node:20-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-bookworm-slim
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000 NA_DATA_DIR=/data NA_TRUST_PROXY=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY server ./server
COPY public ./public
COPY --from=build /app/public/game.js ./public/game.js
COPY scripts/check-config.mjs scripts/backup-sqlite.mjs ./scripts/
RUN mkdir -p /data && chown -R node:node /data /app
USER node
VOLUME ["/data"]
EXPOSE 3000
# liveness only (no curl in the slim image): /healthz answers "ok" while the process is up
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server/index.js"]
