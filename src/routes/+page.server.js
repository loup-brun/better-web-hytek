import { meetsMap } from '$lib/services/meetsService';
import { redirect } from '@sveltejs/kit';

export function load() {
  if (meetsMap.size === 1) {
    let firstEventSlug = meetsMap.keys().next().value;
    console.log('Redirecting')
    // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
    throw redirect(307, `/meets/${firstEventSlug}`);
  } else {
    // continue (fallthrough)
    return
  }
}
