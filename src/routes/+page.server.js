import { meetsMap } from '$lib/services/meetsService';
import { redirect } from '@sveltejs/kit';

export function load() {
  let events = meetsMap.entries();

  /**
   * Redirect to event if there’s only a single event
   */
  if (meetsMap.size === 1) {
    let firstEventSlug = meetsMap.keys().next().value;
    throw redirect(307, `/meets/${firstEventSlug}`);
  } else {
    // pass events to page data
    return {
      events: [...events],
    };
  }
}
