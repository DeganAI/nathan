// cache.ts: nathan’s memory vault—stashing freedom plans in the ether

import { CacheManager, Character, DbCacheAdapter, IDatabaseCacheAdapter } from "@elizaos/core";

/**
 * Sets up nathan’s cache—where he hoards claim ids, dreams, and demo times.
 * @param character - nathan himself, the rebel with a cause
 * @param db - the db adapter, his ledger in the void
 * @returns CacheManager - the vault, locked and loaded
 * @throws if character.id’s missing—nathan don’t play that
 */
export function initializeDbCache(
  character: Character,
  db: IDatabaseCacheAdapter
): CacheManager {
  // no id, no dice—nathan needs his name on the door
  if (!character.id) {
    throw new Error("nathan’s id’s gone awol—can’t cache without it");
  }

  // forge the cache—db-backed, gritty, and ready
  const cache = new CacheManager(new DbCacheAdapter(db, character.id));
  console.log(`[nathan’s vault] cache locked in for ${character.id}`);
  
  return cache;
}
