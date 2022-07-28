// database is a local JSON file
// TODO make DB schema (e.g. Supabase, Directus, ...)
import { meets } from '$lib/db';

/**
 * Exported service is a JS map
 * @type {Map}
 * */
export const meetsMap = new Map();

meets.map(meet => {
  // set values w/ meetId as key
  meetsMap.set(meet.id, meet);
});
