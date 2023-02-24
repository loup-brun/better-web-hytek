import { error } from '@sveltejs/kit';
import { meetsMap } from '$lib/services/meetsService';

export async function load({ fetch, params }) {
  const { meetId, eventId } = params;

  // early check if meet exists in DB
  if (!meetsMap.has(meetId)) {
    throw error(404, `Event with meetId '${meetId}' not found.`);
  }

  // get the event list
  try {
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
      meetConfig: meetsMap.get(meetId),
      meetId,
      eventId,
      evtIndexHTML: null
    }
  }
}
