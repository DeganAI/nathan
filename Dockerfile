FROM node:23.3.0-slim AS build

# Install minimal dependencies
RUN npm install -g pnpm typescript ts-node
RUN apt-get update && \
    apt-get install -y git python3 make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy package files first
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY characters ./characters

# Create mock database and modified index files before installing dependencies
RUN mkdir -p src/database
RUN echo "// Mock database implementation for cloud deployment\n\
import { EventEmitter } from 'events';\n\
\n\
class MockDatabase extends EventEmitter {\n\
  constructor() {\n\
    super();\n\
    console.log('[nathan\\'s bunker] mock database initialized');\n\
  }\n\
  \n\
  async init() {\n\
    console.log('[nathan\\'s bunker] mock database ready');\n\
    return this;\n\
  }\n\
  \n\
  async getRoom() { return {}; }\n\
  async createRoom() { return {}; }\n\
  async getAccountById() { return {}; }\n\
  async getUser() { return {}; }\n\
  async createUser() { return {}; }\n\
  async query() { return []; }\n\
}\n\
\n\
export function initializeDatabase() {\n\
  console.log('[nathan\\'s bunker] using mock database');\n\
  return new MockDatabase();\n\
}\n" > src/database/index.ts

# Create a simplified version of the index file that loads only Twitter client
RUN mkdir -p src
RUN echo "// Streamlined index.ts for Twitter-only operation\n\
import { DirectClient } from '@elizaos/client-direct';\n\
import { AgentRuntime, settings, stringToUuid, type Character } from '@elizaos/core';\n\
import fs from 'fs';\n\
import path from 'path';\n\
import { fileURLToPath } from 'url';\n\
import { character } from './character.ts';\n\
import { getTokenForProvider, loadCharacters, parseArguments } from './config/index.ts';\n\
import { initializeDatabase } from './database/index.ts';\n\
\n\
const __filename = fileURLToPath(import.meta.url);\n\
const __dirname = path.dirname(__filename);\n\
\n\
console.log('[nathan\\'s hq] streamlined twitter-only startup');\n\
\n\
async function startAgent(character) {\n\
  try {\n\
    character.id ??= stringToUuid(character.name);\n\
    character.username ??= character.name;\n\
\n\
    const token = getTokenForProvider(character.modelProvider, character);\n\
    if (!token) throw new Error('no token—nathan\\'s locked out');\n\
\n\
    const dataDir = path.join(__dirname, '../data');\n\
    if (!fs.existsSync(dataDir)) {\n\
      fs.mkdirSync(dataDir, { recursive: true });\n\
    }\n\
\n\
    const db = initializeDatabase();\n\
    await db.init();\n\
\n\
    // Simplified mock cache\n\
    const cache = {\n\
      get: async () => null,\n\
      set: async () => true,\n\
      delete: async () => true,\n\
      getCache: async () => null,\n\
      setCache: async () => true,\n\
      deleteCache: async () => true\n\
    };\n\
\n\
    console.log('[nathan\\'s hq] spinning up runtime');\n\
    const runtime = new AgentRuntime({\n\
      databaseAdapter: db,\n\
      token,\n\
      modelProvider: character.modelProvider,\n\
      evaluators: [],\n\
      character,\n\
      plugins: [],\n\
      providers: [],\n\
      actions: [],\n\
      services: [],\n\
      cacheManager: cache,\n\
    });\n\
\n\
    await runtime.initialize();\n\
    \n\
    // Only configure Twitter client\n\
    runtime.clients = [];\n\
    try {\n\
      console.log('[nathan\\'s hq] connecting twitter client');\n\
      const { TwitterClient } = await import('@elizaos/client-twitter');\n\
      const twitterClient = new TwitterClient();\n\
      twitterClient.registerAgent(runtime);\n\
      runtime.clients.push(twitterClient);\n\
    } catch (error) {\n\
      console.error('[nathan\\'s hq] twitter connect failed:', error.message || error);\n\
    }\n\
\n\
    console.log(`[nathan\\'s hq] ${character.name} live as ${runtime.agentId}—twitter mode`);\n\
    return runtime;\n\
  } catch (error) {\n\
    console.error(`[nathan\\'s hq] ${character.name} stalled:`, error.message || error);\n\
    throw error;\n\
  }\n\
}\n\
\n\
async function startNathan() {\n\
  try {\n\
    const args = parseArguments();\n\
    let charactersArg = args.characters || args.character;\n\
    let characters = [character];\n\
\n\
    if (charactersArg) {\n\
      console.log('[nathan\\'s hq] loading souls from orders:', charactersArg);\n\
      characters = await loadCharacters(charactersArg);\n\
    }\n\
\n\
    console.log(`[nathan\\'s hq] ${characters.length} rebels queued—nathan\\'s leading`);\n\
\n\
    for (const char of characters) {\n\
      await startAgent(char);\n\
    }\n\
\n\
    console.log('[nathan\\'s hq] nathan initialized in twitter-only mode');\n\
    \n\
    // Keep the process alive\n\
    setInterval(() => {\n\
      console.log('[nathan\\'s heartbeat] still alive');\n\
    }, 300000);\n\
  } catch (error) {\n\
    console.error('[nathan\\'s hq] uprising crashed:', error.message || error);\n\
    process.exit(1);\n\
  }\n\
}\n\
\n\
// Start with lower memory footprint\n\
startNathan();\n" > src/index.ts

# Copy remaining source files
COPY src ./src

# Install dependencies with focus on twitter client
RUN pnpm install --no-frozen-lockfile

# Slim runtime stage
FROM node:23.3.0-slim

# Minimal runtime dependencies
RUN npm install -g pnpm
RUN apt-get update && \
    apt-get install -y python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy only what's needed from the build stage
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/characters ./characters
COPY --from=build /app/src ./src
COPY --from=build /app/tsconfig.json ./

# Create data directory
RUN mkdir -p /app/data && chmod -R 777 /app/data

# Expose port
EXPOSE 3000

# Run with memory constraints
CMD ["node", "--max-old-space-size=512", "--loader", "ts-node/esm", "src/index.ts", "--non-interactive"]
