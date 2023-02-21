import { meetsMap } from '$lib/services/meetsService.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params, parent }) {
  const data = await parent();
  const { meetId, eventId } = params;
  const { meetConfig } = data ;

  // get the event list
  try {
    // early check if meet exists in DB
    if (!meetsMap.has(meetId)) {
      throw error(404, `Event with meetId '${meetId}' not found.`);
    }

    const getEvtIndex = await fetch(`/meets/${meetId}/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();

    return {
      meetConfig: meetsMap.get(meetId),
      evtIndexHTML,
      meetId,
      eventId,
    }
  } catch (e) {
    console.warn('Could not fetch event index', e);
    // todo: should warn user there is a config problem (event list will never load)
    return {
      meetConfig,
      meetId,
      eventId,
      evtIndexHTML: null
    }
  }
}
