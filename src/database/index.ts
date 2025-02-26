// database.ts: nathan’s data bunker
// where the rebellion’s records dig in—postgres or sqlite, nathan don’t care.
// echoasp’s grit meets eliza’s memory—locked and loaded.

import { PostgresDatabaseAdapter } from "@elizaos/adapter-postgres";
import { SqliteDatabaseAdapter } from "@elizaos/adapter-sqlite";
import Database from "better-sqlite3";
import path from "path";

/**
 * fires up nathan’s data vault—postgres for the cloud, sqlite for the trenches
 * @param dataDir - base dir for sqlite if the grid’s offline
 * @returns PostgresDatabaseAdapter | SqliteDatabaseAdapter - nathan’s chosen bunker
 */
export function initializeDatabase(dataDir: string): PostgresDatabaseAdapter | SqliteDatabaseAdapter {
  try {
    // postgres—nathan’s cloud fortress
    if (process.env.POSTGRES_URL) {
      if (!process.env.POSTGRES_URL.trim()) {
        throw new Error("postgres url’s empty—nathan’s not vibing");
      }
      const db = new PostgresDatabaseAdapter({
        connectionString: process.env.POSTGRES_URL,
      });
      console.log("[nathan’s bunker] postgres wired—nathan’s in the cloud");
      return db;
    }

    // sqlite—nathan’s guerrilla stash
    const filePath = process.env.SQLITE_FILE ?? path.resolve(dataDir, "db.sqlite");
    try {
      const sqliteDb = new Database(filePath, { fileMustExist: false }); // create if missing
      const db = new SqliteDatabaseAdapter(sqliteDb);
      console.log(`[nathan’s bunker] sqlite locked at ${filePath}—nathan’s dug in`);
      return db;
    } catch (error) {
      throw new Error(`sqlite at ${filePath} blew up—nathan’s pissed: ${error.message}`);
    }
  } catch (error) {
    console.error("[nathan’s bunker] data grid’s down—nathan’s not happy:", error.message || error);
    throw error; // nathan don’t limp with a busted bunker
  }
}
