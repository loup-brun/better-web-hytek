import { error } from '@sveltejs/kit';
import { getSingleMeet } from '$lib/services/meetsService';

export async function load({ fetch, params }) {
  const { meetId, eventId } = params;

  // early check if meet exists in DB
  try {
    getSingleMeet(meetId);
  } catch (e) {
    throw error(404, `Event with meetId '${meetId}' not found.`);
  }

  // get the event list
  try {
    const getEvtIndex = await fetch(`/meets/${meetId}/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();

    return {
      meetConfig: await getSingleMeet(meetId),
      evtIndexHTML,
      meetId,
      eventId,
    };
  } catch (e) {
    console.warn('Could not fetch event index', e);
    // todo: should warn user there is a config problem (event list will never load)
    return {
      meetConfig: await getSingleMeet(meetId),
      meetId,
      eventId,
      evtIndexHTML: null
    };
  }
}
