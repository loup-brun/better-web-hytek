import { meetsMap } from '$lib/services/meetsService';

/**
 * Pass meets data to index page
 */
export function load() {
  let events = meetsMap.entries();

  return {
    events
  };
}
