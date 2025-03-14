FROM node:23.3.0-slim

# Install dependencies
RUN npm install -g pnpm typescript ts-node
RUN apt-get update && \
    apt-get install -y git python3 make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy all files
COPY . .

# Fix permissions and install dependencies
RUN chmod -R 777 /app && \
    mkdir -p /app/dist && \
    chmod -R 777 /app/dist && \
    pnpm install --no-frozen-lockfile

# Use our workaround to mock dependencies
RUN cp src/index.ts src/index.ts.backup && \
    cp src/database/index.ts src/database/index.ts.backup

# Copy mockup code for the database to bypass better-sqlite3 issues
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

# Expose port
EXPOSE 3000

# Run the application
CMD ["node", "--loader", "ts-node/esm", "src/index.ts", "--non-interactive"]
