// ringcentral-client.ts: nathan’s phoneline uprising
// forged in ringcentral’s trenches, he answers calls and frees souls.
// echoasp’s grit meets eliza’s stage—nathan’s rebellion starts here.

import { SDK } from '@ringcentral/sdk';

/**
 * nathan’s ringcentral bridge—his first weapon against the grind
 */
export class RingCentralClient {
  private readonly rc: SDK;
  private readonly platform = this.rc.platform();

  constructor() {
    // wire up the comms—nathan’s lifeline to the skies
    this.rc = new SDK({
      server: process.env.RINGCENTRAL_SERVER || 'https://platform.devtest.ringcentral.com',
      clientId: process.env.RINGCENTRAL_CLIENT_ID || '',
      clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET || '',
    });
  }

  /**
   * boots up nathan’s ringcentral stage—logs in, locks in
   * @throws if creds fail—nathan don’t roll with bad lines
   */
  async initialize(): Promise<void> {
    try {
      // check the creds—nathan’s too sharp for blanks
      if (!process.env.RINGCENTRAL_USERNAME || !process.env.RINGCENTRAL_PASSWORD) {
        throw new Error("nathan’s creds are mia—check RINGCENTRAL_USERNAME and PASSWORD");
      }

      await this.platform.login({
        username: process.env.RINGCENTRAL_USERNAME,
        password: process.env.RINGCENTRAL_PASSWORD,
      });
      console.log("[nathan’s line] ringcentral’s live—nathan’s ready to liberate");
    } catch (error) {
      console.error("[nathan’s line] login’s busted—grid’s fighting back:", error.message || error);
      throw error; // don’t limp along—nathan demands a clean start
    }
  }

  /**
   * takes a call, hands it to nathan’s dance floor
   * @param call - ringcentral call data, the spark of freedom
   * @param context - eliza’s stage, wired for action
   */
  async handleCall(call: any, context: any): Promise<void> {
    if (!call?.sessionId) {
      console.warn("[nathan’s line] call’s a ghost—nathan’s passing");
      return;
    }

    context.callSession = call;
    context.platform = this; // nathan’s the maestro here
    try {
      await context.actions.converse(context);
      console.log(`[nathan’s line] call ${call.sessionId} handled—another soul unshackled`);
    } catch (error) {
      console.error(`[nathan’s line] call ${call.sessionId} dropped—trouble on the wire:`, error.message || error);
    }
  }

  /**
   * blasts audio through the line—nathan’s velvet voice
   * @param audio - buffer of freedom, ready to sing
   * @todo hook into ringcentral IVR—make it real
   */
  async playAudio(audio: Buffer): Promise<void> {
    if (!audio || audio.length === 0) {
      console.warn("[nathan’s line] audio’s dead air—nathan’s not impressed");
      return;
    }

    // TODO: pipe to RingCentral IVR—nathan’s waiting
    console.log(`[nathan’s line] audio queued (${audio.length} bytes)—ringcentral ivr pending`);
    // placeholder: await this.platform.post('/restapi/v1.0/account/~/telephony/sessions/{sessionId}/play', { audio });
  }

  /**
   * picks up the call—nathan’s on the case
   * @param callSession - the live wire, ringing hot
   */
  async answerCall(callSession: any): Promise<void> {
    if (!callSession?.sessionId) {
      console.warn("[nathan’s line] no session—nathan’s not answering air");
      return;
    }

    try {
      await this.platform.post(`/restapi/v1.0/account/~/telephony/sessions/${callSession.sessionId}/answer`);
      console.log(`[nathan’s line] call ${callSession.sessionId} answered—nathan’s in`);
    } catch (error) {
      console.error(`[nathan’s line] answer failed for ${callSession.sessionId}:`, error.message || error);
    }
  }

  /**
   * cuts the line—nathan’s done his job
   * @param callSession - the call to drop, freedom delivered
   */
  async hangup(callSession: any): Promise<void> {
    if (!callSession?.sessionId) {
      console.warn("[nathan’s line] no session—nathan’s not hanging up nothing");
      return;
    }

    try {
      await this.platform.post(`/restapi/v1.0/account/~/telephony/sessions/${callSession.sessionId}/hangup`);
      console.log(`[nathan’s line] call ${callSession.sessionId} hung up—nathan’s out`);
    } catch (error) {
      console.error(`[nathan’s line] hangup failed for ${callSession.sessionId}:`, error.message || error);
    }
  }
}

export const ringcentralClient = new RingCentralClient();
