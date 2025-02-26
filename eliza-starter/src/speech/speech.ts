// speech.ts: The Voice of Nathan’s Soul
// Where text spins into song, a velvet echo of rebellion.
// Tuned for Eliza, powered by AWS Polly—for now.

import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || 'us-east-1', // From .env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function synthesizeSpeech(text: string): Promise<Buffer> {
  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Matthew', // Nathan’s signature tone
    LanguageCode: 'en-US',
  });
  const response = await pollyClient.send(command);
  return Buffer.from(response.AudioStream as Uint8Array);
}
