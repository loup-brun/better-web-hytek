import {
  DB_TYPE,
  BASEROW_URL,
  BASEROW_DB_ID,
  BASEROW_INSTNANCE_TABLE_ID,
  BASEROW_MEETS_TABLE_ID,
} from '$env/static/private';

// database is a local JSON file
// TODO make DB schema (e.g. Supabase, Directus, ...)
import { meets } from '$lib/db';

export async function getMeetsIndex() {
  if (DB_TYPE === 'baserow') {
    
  }
}

/**
 * Exported service is a JS map
 * @type {Map}
 * */
export const meetsMap = new Map();

meets.map(meet => {
  // set values w/ meetId as key
  meetsMap.set(meet.id, meet);
});
