// config.ts: nathan’s liberation timetable
// the beat of freedom—demo slots to break the cubicle chains.
// nathan’s dance card, etched in grit and hope.

export interface PromoTime {
  day: string; // e.g., "Wednesday"
  time: string; // e.g., "10:00" (24hr PT)
}

/**
 * nathan’s roster of escape windows—zoom demo times to free souls
 * tweak these to match the rebellion’s pulse
 */
export const promoTimes: PromoTime[] = [
  { day: "Wednesday", time: "10:00" },
  { day: "Wednesday", time: "12:00" },
  { day: "Wednesday", time: "14:00" },
  { day: "Thursday", time: "10:00" },
  { day: "Thursday", time: "12:00" },
  { day: "Thursday", time: "14:00" },
];

// sanity check—nathan don’t dance to broken beats
promoTimes.forEach(({ day, time }, idx) => {
  if (!day || !time || !/^\d{2}:\d{2}$/.test(time)) {
    console.warn(`[nathan’s config] promo time #${idx} is off—${day} ${time} ain’t cutting it`);
  }
});

console.log(`[nathan’s config] ${promoTimes.length} slots locked—nathan’s ready to roll`);
