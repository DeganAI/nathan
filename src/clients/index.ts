// clients.ts: nathan’s comms hub—wiring up the rebellion
// from ringcentral to discord, he’s breaking chains across the grid.
// echoasp’s grit meets eliza’s reach—multi-platform freedom unleashed.

import { AutoClientInterface } from "@elizaos/client-auto";
import { DiscordClientInterface } from "@elizaos/client-discord";
import { TelegramClientInterface } from "@elizaos/client-telegram";
import { TwitterClientInterface } from "@elizaos/client-twitter";
import { Character, IAgentRuntime } from "@elizaos/core";

/**
 * fires up nathan’s client squad—each one a weapon against the grind
 * @param character - nathan’s blueprint, listing his battlegrounds
 * @param runtime - eliza’s engine, powering the fight
 * @returns Promise<any[]> - array of live clients, ready to roll
 */
export async function initializeClients(
  character: Character,
  runtime: IAgentRuntime
): Promise<any[]> {
  const clients: any[] = [];
  const clientTypes = character.clients?.map((str) => str.toLowerCase()) || [];

  // no clients? nathan’s still plotting
  if (!clientTypes.length && (!character.plugins || !character.plugins.length)) {
    console.log("[nathan’s comms] no lines to wire—nathan’s on standby");
    return clients;
  }

  try {
    // auto client—nathan’s wildcard
    if (clientTypes.includes("auto")) {
      const autoClient = await AutoClientInterface.start(runtime);
      if (autoClient) {
        clients.push(autoClient);
        console.log("[nathan’s comms] auto client live—nathan’s got wheels");
      } else {
        console.warn("[nathan’s comms] auto client fizzled—check the logs");
      }
    }

    // discord—nathan’s chat trenches
    if (clientTypes.includes("discord")) {
      const discordClient = await DiscordClientInterface.start(runtime);
      if (discordClient) {
        clients.push(discordClient);
        console.log("[nathan’s comms] discord locked in—nathan’s in the fray");
      } else {
        console.warn("[nathan’s comms] discord dropped—grid’s glitchy");
      }
    }

    // telegram—nathan’s stealth line
    if (clientTypes.includes("telegram")) {
      const telegramClient = await TelegramClientInterface.start(runtime);
      if (telegramClient) {
        clients.push(telegramClient);
        console.log("[nathan’s comms] telegram’s hot—nathan’s whispering freedom");
      } else {
        console.warn("[nathan’s comms] telegram’s cold—signal’s weak");
      }
    }

    // twitter—nathan’s megaphone
    if (clientTypes.includes("twitter")) {
      const twitterClient = await TwitterClientInterface.start(runtime);
      if (twitterClient) {
        clients.push(twitterClient);
        console.log("[nathan’s comms] twitter’s buzzing—nathan’s shouting liberty");
      } else {
        console.warn("[nathan’s comms] twitter’s mute—check the creds");
      }
    }

    // plugins—nathan’s secret weapons
    if (character.plugins?.length > 0) {
      for (const plugin of character.plugins) {
        if (plugin.clients?.length > 0) {
          for (const client of plugin.clients) {
            const pluginClient = await client.start(runtime);
            if (pluginClient) {
              clients.push(pluginClient);
              console.log(`[nathan’s comms] plugin ${plugin.name || "unknown"} client live—nathan’s arsenal grows`);
            } else {
              console.warn(`[nathan’s comms] plugin ${plugin.name || "unknown"} client stalled—debug it`);
            }
          }
        }
      }
    }

    console.log(`[nathan’s comms] ${clients.length} lines live—nathan’s ready to liberate`);
    return clients;
  } catch (error) {
    console.error("[nathan’s comms] grid’s down—nathan’s pissed:", error.message || error);
    return clients; // return what’s live, don’t crash
  }
}
