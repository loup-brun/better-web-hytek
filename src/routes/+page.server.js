import { redirect } from '@sveltejs/kit';
import { getMeetsIndex } from '$lib/services/meetsService';

export async function load() {
  let configuration = await getMeetsIndex();

  const { meets } = configuration;

  /**
   * Redirect to event if there’s only a single event
   */
  if (meets.length === 1) {
    let firstmeetslug = meets[0];
    throw redirect(307, `/meets/${firstmeetslug}`);
  } else {
    // pass meets to page data
    return {
      meets: [...meets],
    };
  }
}

