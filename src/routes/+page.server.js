import { meetsMap } from '$lib/services/meetsService';
import { redirect } from '@sveltejs/kit';

export function load() {
  /**
   * Redirect to event if there’s only a single event
   * or else do nothing (fallthrough)
   */
  if (meetsMap.size === 1) {
    let firstEventSlug = meetsMap.keys().next().value;
    // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
    throw redirect(307, `/meets/${firstEventSlug}`);
  } else {
    // continue (fallthrough)
    return {}
  }
}
