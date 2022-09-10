import { meetsMap } from '$lib/services/meetsService';
import { redirect } from '@sveltejs/kit';

export function load() {
  /**
   * Redirect to event if there’s only a single event;
   * else do nothing (fallthrough)
   */
  if (meetsMap.size === 1) {
    let firstEventSlug = meetsMap.keys().next().value;
    throw redirect(307, `/meets/${firstEventSlug}`);
  } else {
    // continue (fallthrough)
    return {}
  }
}
