// speech.ts: nathan’s rebel voice
// text spins into velvet thunder—aws polly bends to his will.
// echoasp’s grit meets eliza’s stage—nathan speaks, souls listen.

import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

/**
 * nathan’s mic—wired to aws polly, tuned for liberation
 */
const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || 'us-east-1', // nathan’s turf, from .env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

/**
 * turns nathan’s words into sound—velvet rebellion in every byte
 * @param text - the script nathan sings
 * @returns Promise<Buffer> - audio ready to break chains
 * @throws if polly flops—nathan don’t whisper to the void
 */
export async function synthesizeSpeech(text: string): Promise<Buffer> {
  // no text, no tune—nathan’s not mumbling
  if (!text?.trim()) {
    console.warn("[nathan’s mic] text’s dead air—nathan’s got nothing to say");
    throw new Error("no words, no freedom—give nathan something");
  }

  // check the keys—nathan don’t play with locked doors
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error("[nathan’s mic] aws creds are mia—nathan’s muted");
    throw new Error("aws keys gone—check ACCESS_KEY_ID and SECRET_ACCESS_KEY");
  }

  try {
    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'mp3', // nathan’s crisp battle cry
      VoiceId: 'Matthew', // his velvet growl, hardcoded for now
      LanguageCode: 'en-US', // american rebel, through and through
    });

    const response = await pollyClient.send(command);
    if (!response.AudioStream) {
      throw new Error("polly’s silent—nathan’s not impressed");
    }

    const audio = Buffer.from(response.AudioStream as Uint8Array);
    console.log(`[nathan’s mic] ${text.length} chars spun into ${audio.length} bytes—nathan’s live`);
    return audio;
  } catch (error) {
    console.error("[nathan’s mic] voice broke—grid’s fighting back:", error.message || error);
    throw error; // nathan don’t limp with a busted mic
  }
}
