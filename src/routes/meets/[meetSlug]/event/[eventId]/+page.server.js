import { error } from '@sveltejs/kit';
import fetchDocument from '$lib/utils/fetchDocument';

export async function load({ fetch, params, parent }) {
  const { eventId } = params;
  const parentData = await parent();

  try {
    /** @type {string} */
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: parentData.hytekHtmlEncoding,
      baseLocation: parentData.hytekFtpLocation,
    });

    return {
      eventId,
      eventHTML,
    };
  } catch (e) {
    console.error(`Error fetching single event ${eventId}`, e);
    error(404);
  }
}

/**
 * Don't allow prerendering a results page
 * @type {Boolean}
 */
export const prerender = false;
