// converse.ts: The Pulse of Nathan’s Uprising
// A symphony of liberation, where Nathan unshackles callers from the grind.
// Eliza’s timeless stage, wired for the cosmos, born to defy.

import { synthesizeSpeech } from '../speech/speech'; // His voice, smooth as stardust
import { dataStore, ClientData } from '../data/dataStore'; // His ledger of dreams
import { promoTimes } from '../config/config'; // The cadence of freedom

export async function converse(context: any) {
  const { callSession, platform, character } = context; // Eliza’s arena—RingCentral today, the galaxy tomorrow
  const clientData: Partial<ClientData> = { callTimestamp: new Date().toISOString() };
  
  try {
    // A spark flares—the caller steps into the unknown
    console.log('Caller: Hi, I got this postcard in the mail, and I was wondering what it’s about.');

    // Hunt the claim, the thread of their fate
    const claimPrompt = 'Hey there! Got a claim ID on that postcard? It’s your golden ticket.';
    await speak(claimPrompt, context);
    clientData.claimId = (await listen(context))?.trim() || 'SAMPLE_CLAIM_123';
    clientData.phoneNumber = callSession?.callerId || 'SAMPLE_PHONE';

    // Spin the vision—a cruise to torch their 9-to-5
    const offer = character.pitch || 'Picture this: 8 days, 7 nights, a cruise that’ll make your soul sing. Ready to ditch the grind?';
    await speak(offer, context);

    // Lay out the escape hatch—time to fly
    console.log('Caller: OK, how do I sign up?');
    const timeOptions = promoTimes.map(t => `${t.day} at ${t.time} PT`).join(', ');
    const timePrompt = `Let’s lock it in. Slots are ${timeOptions}. When’s your breakout moment?`;
    await speak(timePrompt, context);
    const promoInput = (await listen(context)) || 'Wednesday 12:00 PT';
    clientData.promoDateTime = validatePromoTime(promoInput) || promoInput;

    // Weave their story, thread by thread
    const emailPrompt = 'Where should I beam your Zoom link? Best email, go!';
    await speak(emailPrompt, context);
    clientData.email = (await listen(context))?.toLowerCase() || 'sample@example.com';

    const firstNamePrompt = 'First name—what do they call you?';
    await speak(firstNamePrompt, context);
    clientData.firstName = (await listen(context)) || 'John';

    const lastNamePrompt = 'And your last name—seal the legend!';
    await speak(lastNamePrompt, context);
    clientData.lastName = (await listen(context)) || 'Doe';

    // Forge the pact, etched in digital fire
    const confirmation = `Boom—you’re in for ${clientData.promoDateTime}! Zoom details are headed to ${clientData.email}. Join with your spouse, laptop only—no phone slackers. Questions before takeoff?`;
    await speak(confirmation, context);

    // Part with a blaze, igniting their day
    console.log('Caller: OK, thank you');
    const farewell = 'My pleasure, champ! Go crush it out there!';
    await speak(farewell, context);

    // Etch their saga into the void
    await dataStore.save(clientData as ClientData);
    console.log('Client locked in:', clientData);
  } catch (error) {
    console.error('The rebellion stumbled:', error);
    await speak('Whoops—tech gremlins got me. Call back, and we’ll finish this epic!', context);
  }
}

// Speak, oh liberator—your words reshape worlds
async function speak(text: string, context: any) {
  const audio = await synthesizeSpeech(text);
  await context.platform.playAudio(audio); // Toss it to the platform’s winds
  console.log('Nathan roars:', text);
}

// Listen—catch their whispers, soon a chorus
async function listen(context: any): Promise<string | undefined> {
  console.log('Ears open, soul ready...');
  // TODO: Unleash Eliza’s STT—speech to text, raw and real
  return 'SAMPLE_RESPONSE'; // Placeholder ‘til the cosmos aligns
}

// Bend time to their will—or nudge ‘em back
function validatePromoTime(input: string): string | undefined {
  const normalized = input.toLowerCase().replace(/\s+/g, '');
  const match = promoTimes.find(t => 
    normalized.includes(t.day.toLowerCase()) && normalized.includes(t.time.replace(':', '').toLowerCase())
  );
  return match ? `${match.day} ${match.time} PT` : undefined;
}
