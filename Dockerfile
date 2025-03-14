# Dockerfile: nathan's rebel warship
# forged in node's fires, slimmed for the fight—breaks chains from the cloud.
# nathan's uprising docks here—pnpm-powered, typescript-tough.

# Single-stage build for simplicity
FROM node:23.3.0-slim

# arm the forge—pnpm and build tools
RUN npm install -g pnpm@9.15.1 typescript ts-node && \
    apt-get update && \
    apt-get install -y git python3 make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# set python3 as the default
RUN ln -s /usr/bin/python3 /usr/bin/python

# nathan's workbench—where the rebellion takes shape
WORKDIR /app

# Copy all project files
COPY . .

# Install dependencies WITHOUT frozen lockfile
RUN pnpm install --no-frozen-lockfile && \
    pnpm build && \
    mkdir -p /app/dist

# nathan's open line—freedom's frequency
EXPOSE 3000

# Change ownership to node user
USER node

# nathan's war cry—starts the fight
CMD ["pnpm", "start", "--non-interactive"]
