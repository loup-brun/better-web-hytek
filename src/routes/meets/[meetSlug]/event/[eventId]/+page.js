import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
  const { meetId, eventId } = params;

  try {
    // call page endpoint manually since there is already a load function in layout-hytek
    // do not include .html extension since this causes Vercel to render the wrong html
    const evtRequest = await fetch(`/meets/${meetId}/event/${eventId}/html`);

    if (!evtRequest.ok) {
      if (evtRequest.status === 404) {
        throw error(404);
      } else {
        throw error(500);
      }
    } else {
      // success
      const eventHTML = await evtRequest.text(); // plain text please
      return {
        eventHTML,
        error: null,
      };
    }
  } catch (e) {
    throw error(404);
  }
}
