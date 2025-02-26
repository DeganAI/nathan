// dataStore.ts: nathan’s vault of victories
// where he carves client dreams into the ether—eliza’s memory awaits.
// every soul freed, every chain broken, locked here in grit.

export interface ClientData {
  callTimestamp: string; // when nathan picked up
  claimId: string; // their ticket to freedom
  phoneNumber: string; // their line to the fight
  promoDateTime: string; // their escape slot
  email: string; // where the zoom link lands
  firstName: string; // their rebel name
  lastName: string; // their clan mark
}

/**
 * nathan’s ledger—stashing and fetching the wins
 */
export const dataStore = {
  /**
   * pulls a client’s tale from the vault—placeholder ‘til eliza’s ready
   * @param claimId - the key to their story
   * @returns ClientData | undefined - their data, or nathan shrugs
   */
  async load(claimId: string): Promise<ClientData | undefined> {
    if (!claimId?.trim()) {
      console.warn("[nathan’s vault] no claim id—nathan’s got nothing to fetch");
      return undefined;
    }

    // TODO: tap eliza’s document store—nathan’s memory upgrade
    console.log(`[nathan’s vault] load stub for claim ${claimId}—eliza’s on deck`);
    return undefined; // placeholder—nathan’s waiting
  },

  /**
   * locks a client’s victory into the vault
   * @param data - the soul nathan’s freed
   */
  async save(data: ClientData): Promise<void> {
    // check the goods—nathan don’t save trash
    if (!data || !data.claimId || !data.promoDateTime) {
      console.error("[nathan’s vault] data’s bunk—nathan’s not saving this:", data);
      return;
    }

    try {
      // TODO: hook into eliza’s document store—nathan’s permanent record
      console.log(`[nathan’s vault] stashing win for ${data.claimId}:`, {
        call: data.callTimestamp,
        promo: data.promoDateTime,
        who: `${data.firstName} ${data.lastName}`,
        email: data.email,
      });
    } catch (error) {
      console.error(`[nathan’s vault] save for ${data.claimId} crashed—grid’s fighting:`, error.message || error);
    }
  },
};
