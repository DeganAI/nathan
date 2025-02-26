// character.ts: nathan’s rebel prep shack
// parsing the call signs, loading the blueprints, grabbing the keys.
// echoasp’s grit fuels eliza’s stage—nathan’s gearing up to break chains.

import { Character, ModelProviderName, settings, validateCharacterConfig } from "@elizaos/core";
import fs from "fs";
import path from "path";
import yargs from "yargs";

/**
 * cracks the cli args—nathan’s orders from the field
 * @returns {character?: string, characters?: string} - paths to his soul files
 */
export function parseArguments(): { character?: string; characters?: string } {
  try {
    const args = yargs(process.argv.slice(2))
      .option("character", {
        type: "string",
        description: "path to nathan’s solo json soul",
      })
      .option("characters", {
        type: "string",
        description: "comma-separated paths to nathan’s posse of json souls",
      })
      .parseSync();
    console.log("[nathan’s prep] args locked—nathan’s got his marching orders");
    return args;
  } catch (error) {
    console.error("[nathan’s prep] args busted—nathan’s pissed:", error.message || error);
    return {};
  }
}

/**
 * loads nathan’s blueprints—his character files, his fight
 * @param charactersArg - comma-separated paths to json souls
 * @returns Promise<Character[]> - nathan’s loaded rebel crew
 */
export async function loadCharacters(charactersArg: string): Promise<Character[]> {
  const loadedCharacters: Character[] = [];

  if (!charactersArg?.trim()) {
    console.log("[nathan’s prep] no souls to load—nathan’s flying solo");
    return loadedCharacters;
  }

  const characterPaths = charactersArg.split(",").map((filePath) => {
    if (path.basename(filePath) === filePath) {
      filePath = "../characters/" + filePath; // default to characters dir
    }
    return path.resolve(process.cwd(), filePath.trim());
  });

  for (const charPath of characterPaths) {
    try {
      const rawData = fs.readFileSync(charPath, "utf8");
      const character = JSON.parse(rawData);
      validateCharacterConfig(character);
      loadedCharacters.push(character);
      console.log(`[nathan’s prep] soul loaded from ${path.basename(charPath)}—nathan’s crew grows`);
    } catch (error) {
      console.error(`[nathan’s prep] soul at ${charPath} broke—nathan’s not happy:`, error.message || error);
      process.exit(1); // no half-assed crew—nathan bails
    }
  }

  console.log(`[nathan’s prep] ${loadedCharacters.length} rebels ready—nathan’s set`);
  return loadedCharacters;
}

/**
 * digs up nathan’s keys—tokens for the liberation grid
 * @param provider - model provider name, nathan’s tech allies
 * @param character - nathan’s config, where secrets hide
 * @returns string | undefined - the key, or nathan shrugs
 */
export function getTokenForProvider(
  provider: ModelProviderName,
  character: Character
): string | undefined {
  const secrets = character.settings?.secrets || {};
  let token: string | undefined;

  switch (provider) {
    case ModelProviderName.OPENAI:
      token = secrets.OPENAI_API_KEY || settings.OPENAI_API_KEY;
      break;
    case ModelProviderName.LLAMACLOUD:
      token =
        secrets.LLAMACLOUD_API_KEY ||
        settings.LLAMACLOUD_API_KEY ||
        secrets.TOGETHER_API_KEY ||
        settings.TOGETHER_API_KEY ||
        secrets.XAI_API_KEY ||
        settings.XAI_API_KEY ||
        secrets.OPENAI_API_KEY ||
        settings.OPENAI_API_KEY;
      break;
    case ModelProviderName.ANTHROPIC:
      token =
        secrets.ANTHROPIC_API_KEY ||
        secrets.CLAUDE_API_KEY ||
        settings.ANTHROPIC_API_KEY ||
        settings.CLAUDE_API_KEY;
      break;
    case ModelProviderName.REDPILL:
      token = secrets.REDPILL_API_KEY || settings.REDPILL_API_KEY;
      break;
    case ModelProviderName.OPENROUTER:
      token = secrets.OPENROUTER || settings.OPENROUTER_API_KEY;
      break;
    case ModelProviderName.GROK:
      token = secrets.GROK_API_KEY || settings.GROK_API_KEY;
      break;
    case ModelProviderName.HEURIST:
      token = secrets.HEURIST_API_KEY || settings.HEURIST_API_KEY;
      break;
    case ModelProviderName.GROQ:
      token = secrets.GROQ_API_KEY || settings.GROQ_API_KEY;
      break;
    default:
      console.warn(`[nathan’s prep] ${provider} ain’t on nathan’s grid—no key`);
      return undefined;
  }

  if (!token) {
    console.warn(`[nathan’s prep] no key for ${provider}—nathan’s locked out`);
  } else {
    console.log(`[nathan’s prep] key grabbed for ${provider}—nathan’s in`);
  }
  return token;
}
