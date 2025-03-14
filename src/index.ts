// index.ts: nathan's rebellion hq
// where the liberator boots up, lines connect, and freedom rings.
// echoasp's grit meets eliza's wild stage—nathan's war starts here.

import { DirectClient } from "@elizaos/client-direct";
import {
  AgentRuntime,
  elizaLogger,
  settings,
  stringToUuid,
  type Character,
} from "@elizaos/core";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
import { createNodePlugin } from "@elizaos/plugin-node";
import { solanaPlugin } from "@elizaos/plugin-solana";
import fs from "fs";
import net from "net";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDbCache } from "./cache/index.ts";
import { character } from "./character.ts";
import { startChat } from "./chat/index.ts";
import { initializeClients } from "./clients/index.ts";
import {
  getTokenForProvider,
  loadCharacters,
  parseArguments,
} from "./config/index.ts";
import { initializeDatabase } from "./database/index.ts";
import { EventEmitter } from "events";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** nathan's breather—random wait between moves */
export const wait = (minTime: number = 1000, maxTime: number = 3000) =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime)
  );

let nodePlugin: any | undefined;

// In-memory storage for mock database
const rooms = new Map();
const accounts = new Map();
const messages = new Map();
const agents = new Map();

// Mock database classes for Windows compatibility
class MockDatabase extends EventEmitter {
  constructor() {
    super();
    console.log("[nathan's bunker] mock database initialized");
  }
  
  async init() {
    console.log("[nathan's bunker] mock database ready for action");
    return this;
  }
  
  // Room methods
  async getRoom(roomId) {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        id: roomId,
        name: `Room ${roomId}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {}
      });
    }
    return rooms.get(roomId);
  }
  
  async createRoom(room) {
    rooms.set(room.id, room);
    return room;
  }
  
  async updateRoom(room) {
    rooms.set(room.id, room);
    return room;
  }
  
  // Account methods
  async getAccountById(accountId) {
    if (!accounts.has(accountId)) {
      accounts.set(accountId, {
        id: accountId,
        username: `user_${accountId}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {}
      });
    }
    return accounts.get(accountId);
  }
  
  async createAccount(account) {
    accounts.set(account.id, account);
    return account;
  }
  
  async updateAccount(account) {
    accounts.set(account.id, account);
    return account;
  }
  
  // Message methods
  async getMessages() { return []; }
  async createMessage(message) {
    const id = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newMessage = { ...message, id, createdAt: new Date() };
    messages.set(id, newMessage);
    return newMessage;
  }
  
  // Agent methods
  async getAgents() { return []; }
  async createAgent(agent) {
    agents.set(agent.id, agent);
    return agent;
  }
  
  // User methods (may be needed)
  async getUser(userId) {
    return this.getAccountById(userId);
  }
  async createUser(user) {
    return this.createAccount(user);
  }
  
  // General database methods
  async query() { return []; }
  async execute() { return true; }
  async transaction() { return true; }
  async close() { return true; }
  
  // Additional methods that might be needed
  async getCharacters() { return []; }
  async upsertCharacter(character) { return character; }
  
  // Add any method that could be called by the runtime
  async getById(collection, id) {
    switch(collection) {
      case 'accounts': return this.getAccountById(id);
      case 'rooms': return this.getRoom(id);
      case 'agents': return agents.get(id) || null;
      default: return null;
    }
  }
  
  // Wildcard method to handle any other calls
  async any(...args) {
    console.log(`[nathan's db] mock called with:`, args);
    return null;
  }
}

// Make the mock database handle any method call
const proxyHandler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    console.log(`[nathan's db] unknown method called: ${String(prop)}`);
    return async (...args) => {
      console.log(`[nathan's db] mock handled unknown call to ${String(prop)}`);
      
      // If it's a get operation, return an empty object
      if (String(prop).startsWith('get')) {
        return {};
      }
      
      // If it's an update operation, return the first argument
      if (String(prop).startsWith('update') || String(prop).startsWith('upsert')) {
        return args[0] || {};
      }
      
      // If it's a create operation, return the first argument with an id
      if (String(prop).startsWith('create')) {
        const id = `generated-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        return { id, ...(args[0] || {}) };
      }
      
      // Default return
      return null;
    };
  }
};

// Mock cache with in-memory storage
const inMemoryCache = new Map();

const mockCache = {
  get: async (key) => {
    console.log(`[nathan's cache] get: ${key}`);
    return inMemoryCache.get(key);
  },
  
  set: async (key, value, ttl) => {
    console.log(`[nathan's cache] set: ${key}`);
    inMemoryCache.set(key, value);
    return true;
  },
  
  delete: async (key) => {
    console.log(`[nathan's cache] delete: ${key}`);
    return inMemoryCache.delete(key);
  },
  
  // Aliases for compatibility
  getCache: async (key) => mockCache.get(key),
  setCache: async (key, value, ttl) => mockCache.set(key, value, ttl),
  deleteCache: async (key) => mockCache.delete(key)
};

/**
 * spins up nathan's runtime—his soul wired to the fight
 * @param character - nathan's blueprint
 * @param db - data bunker
 * @param cache - memory vault
 * @param token - key to the grid
 * @returns AgentRuntime - nathan's live wire
 */
export function createAgent(
  character: Character,
  db: any,
  cache: any,
  token: string
): AgentRuntime {
  console.log(`[nathan's hq] firing up ${character.name}—rebellion's live`);
  nodePlugin ??= createNodePlugin();

  return new AgentRuntime({
    databaseAdapter: db,
    token,
    modelProvider: character.modelProvider,
    evaluators: [],
    character,
    plugins: [
      bootstrapPlugin,
      nodePlugin,
      character.settings?.secrets?.WALLET_PUBLIC_KEY ? solanaPlugin : null,
    ].filter(Boolean),
    providers: [],
    actions: [],
    services: [],
    managers: [],
    cacheManager: cache,
  });
}

/**
 * launches nathan into battle—agent online, clients hot
 * @param character - nathan's soul
 * @param directClient - his direct line
 * @returns Promise<AgentRuntime> - nathan's running fight
 */
async function startAgent(character: Character, directClient: DirectClient): Promise<AgentRuntime> {
  try {
    character.id ??= stringToUuid(character.name);
    character.username ??= character.name;

    const token = getTokenForProvider(character.modelProvider, character);
    if (!token) throw new Error("no token—nathan's locked out");

    const dataDir = path.join(__dirname, "../data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log("[nathan's hq] data dir carved—nathan's got ground");
    }

    // Use mock database instead of actual database
    console.log("[nathan's bunker] using mock database for Windows compatibility");
    const mockDb = new MockDatabase();
    // Create a proxy to handle any method calls
    const db = new Proxy(mockDb, proxyHandler);
    await db.init();

    // Use mock cache instead of initializing from database
    console.log("[nathan's bunker] using mock cache—memory only");
    const cache = mockCache;
    
    const runtime = createAgent(character, db, cache, token);

    await runtime.initialize();
    runtime.clients = await initializeClients(character, runtime);
    directClient.registerAgent(runtime);

    console.log(`[nathan's hq] ${character.name} live as ${runtime.agentId}—grind's on notice`);
    return runtime;
  } catch (error) {
    console.error(`[nathan's hq] ${character.name} stalled—grid's fighting:`, error.message || error);
    throw error;
  }
}

/** hunts for an open line—nathan don't share frequencies */
const checkPortAvailable = (port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err: NodeJS.ErrnoException) => resolve(err.code === "EADDRINUSE" ? false : true));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port);
  });

/** unleashes nathan's rebellion—agents up, lines hot, chat rolling */
const startAgents = async () => {
  const directClient = new DirectClient();
  let serverPort = parseInt(settings.SERVER_PORT || "3000", 10);
  const args = parseArguments();

  let charactersArg = args.characters || args.character;
  let characters = [character];

  if (charactersArg) {
    console.log("[nathan's hq] loading souls from orders:", charactersArg);
    characters = await loadCharacters(charactersArg);
  }

  console.log(`[nathan's hq] ${characters.length} rebels queued—nathan's leading`);

  for (const char of characters) {
    await startAgent(char, directClient);
  }

  while (!(await checkPortAvailable(serverPort))) {
    console.warn(`[nathan's hq] port ${serverPort} jammed—nathan's bumping to ${serverPort + 1}`);
    serverPort++;
  }

  directClient.startAgent = async (char: Character) => startAgent(char, directClient);
  directClient.start(serverPort);

  if (serverPort !== parseInt(settings.SERVER_PORT || "3000", 10)) {
    console.log(`[nathan's hq] line's hot on ${serverPort}—nathan's rerouted`);
  }

  const isDaemonProcess = process.env.DAEMON_PROCESS === "true";
  if (!isDaemonProcess) {
    console.log("[nathan's hq] chat's live—type 'exit' to cut the line");
    const chat = startChat(characters);
    chat();
  }
};

// fire it up—nathan's rebellion begins
startAgents().catch((error) => {
  console.error("[nathan's hq] uprising crashed—nathan's pissed:", error.message || error);
  process.exit(1);
});
