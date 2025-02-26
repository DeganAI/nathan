// converse.ts: The Heartbeat of Nathan’s Rebellion
// A dance of words and dreams, where Nathan frees callers from the grind.
// An Eliza action—timeless, bold, ready for the cosmos.

import { synthesizeSpeech } from '../speech/speech'; // His velvet voice
import { dataStore, ClientData } from '../data/dataStore'; // His scribe of souls
import { promoTimes } from '../config/config'; // The rhythm of freedom

export async function converse(context: any) {
  const { callSession, platform, character } = context; // Eliza’s stage—RingCentral for now
  const clientData: Partial<ClientData> = { callTimestamp: new Date().toISOString() };

  // The caller’s spark ignites the tale
  console.log('Caller: Hi, I got this postcard in the mail, and I was wondering what it’s about.');

  // Seek the claim, a key to their destiny
  const claimPrompt = 'Is there a claim ID number on that piece of mail?';
  await speak(claimPrompt, context);
  clientData.claimId = await listen(context) || 'SAMPLE_CLAIM_123';
  clientData.phoneNumber = callSession?.callerId || 'SAMPLE_PHONE';

  // Paint the dream, a cruise to steal their breath
  const offer = character.pitch; // From nathan.json
  await speak(offer, context);

  // Offer the hour, a window to escape
  console.log('Caller: OK, how do I sign up?');
  const timeOptions = promoTimes.map(t => `${t.day} at ${t.time} PT`).join(', ');
  const timePrompt = `I can reserve your spot. We’ve got ${timeOptions}. What works for you?`;
  await speak(timePrompt, context);
  const promoTime = await listen(context) || 'Wednesday 12:00 PT';
  clientData.promoDateTime = validatePromoTime(promoTime) || promoTime;

  // Gather their essence, stitch by stitch
  const emailPrompt = 'What’s the best email to send your confirmation to?';
  await speak(emailPrompt, context);
  clientData.email = await listen(context) || 'sample@example.com';

  const firstNamePrompt = 'And your first name, please?';
  await speak(firstNamePrompt, context);
  clientData.firstName = await listen(context) || 'John';

  const lastNamePrompt = 'Last name?';
  await speak(lastNamePrompt, context);
  clientData.lastName = await listen(context) || 'Doe';

  // Seal the vow, a promise in the ether
  const confirmation = `You’re all set for ${clientData.promoDateTime}. We’ll email you the Zoom details. Please join with your spouse on a laptop—no phones allowed. Any questions?`;
  await speak(confirmation, context);

  // Bid adieu, a spark to light their day
  console.log('Caller: OK, thank you');
  const farewell = 'My pleasure! Have a fantastic day!';
  await speak(farewell, context);

  // Carve their tale into memory’s stone
  await dataStore.save(clientData as ClientData);
  console.log('Client data saved:', clientData);
}

// Speak, oh rebel, let your voice take wing
async function speak(text: string, context: any) {
  const audio = await synthesizeSpeech(text);
  await context.platform.playAudio(audio); // Hand off to the client
  console.log('Nathan says:', text);
}

// Listen, a canvas for their soul—soon to awaken
async function listen(context: any): Promise<string> {
  console.log('Listening...');
  return 'SAMPLE_RESPONSE'; // Placeholder till Eliza’s ears bloom
  // TODO: Tap Eliza’s STT when ready
}

// Align the stars, validate their choice
function validatePromoTime(input: string): string | undefined {
  const normalized = input.toLowerCase();
  return promoTimes.find(t => normalized.includes(t.day.toLowerCase()) && normalized.includes(t.time.toLowerCase()))
    ? `${input}`
    : undefined;
}
