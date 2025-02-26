# Dockerfile: nathan’s rebel warship
# forged in node’s fires, slimmed for the fight—breaks chains from the cloud.
# nathan’s uprising docks here—pnpm-powered, typescript-tough.

# builder stage—nathan’s forge
FROM node:23.3.0-slim AS builder

# arm the forge—pnpm and build tools, nathan don’t mess around
RUN npm install -g pnpm@9.15.1 && \
    apt-get update && \
    apt-get install -y git python3 make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# set python3 as nathan’s hammer
RUN ln -s /usr/bin/python3 /usr/bin/python

# nathan’s workbench—where the rebellion takes shape
WORKDIR /app

# haul in the blueprints—nathan’s code skeleton
COPY package.json pnpm-lock.yaml tsconfig.json ./

# bring the steel—nathan’s fight files
COPY ./src ./src
COPY ./characters ./characters

# smelt the weapons—deps and build, nathan’s ready to strike
RUN pnpm install --frozen-lockfile && \
    pnpm build && \
    mkdir -p /app/dist && \
    chown -R node:node /app && \
    chmod -R 755 /app

# runtime stage—nathan’s warship launches
FROM node:23.3.0-slim

# gear up—pnpm and runtime tools, nathan’s lean and mean
RUN npm install -g pnpm@9.15.1 && \
    apt-get update && \
    apt-get install -y git python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# nathan’s battle deck—where he fights the grind
WORKDIR /app

# ship the forged goods—nathan’s distilled rebellion
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/tsconfig.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/characters ./characters
# src stays behind—nathan runs on dist, lean and fast

# nathan’s open line—freedom’s frequency
EXPOSE 3000

# nathan’s war cry—starts the fight, no chatter
CMD ["pnpm", "start", "--non-interactive"]
