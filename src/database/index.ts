// database.ts: nathan's data bunker - MOCKED VERSION
import { EventEmitter } from 'events';

// Mock the adapter classes to match the original imports
export class PostgresDatabaseAdapter extends EventEmitter {
  constructor() {
    super();
    console.log("[nathan's bunker] mock postgres adapter initialized");
  }
  
  async init() {
    console.log("[nathan's bunker] mock postgres initialized");
    return this;
  }
  
  // Add more methods as needed
  async query() { return []; }
  async execute() { return true; }
}

export class SqliteDatabaseAdapter extends EventEmitter {
  constructor() {
    super();
    console.log("[nathan's bunker] mock sqlite adapter initialized");
  }
  
  async init() {
    console.log("[nathan's bunker] mock sqlite initialized");
    return this;
  }
  
  // Add more methods as needed
  async query() { return []; }
  async execute() { return true; }
}

/**
 * fires up nathan's mock data vault—in-memory only
 * @param dataDir - ignored in mock version
 * @returns SqliteDatabaseAdapter with init function
 */
export function initializeDatabase(dataDir: string) {
  console.log(`[nathan's bunker] mock database ready—nathan's running lite`);
  
  // Create and return the adapter based on environment
  if (process.env.POSTGRES_URL) {
    return new PostgresDatabaseAdapter();
  } else {
    return new SqliteDatabaseAdapter();
  }
}
