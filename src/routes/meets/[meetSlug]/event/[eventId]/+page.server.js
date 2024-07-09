import { error } from '@sveltejs/kit';
import fetchDocument from '$lib/utils/fetchDocument';

export async function load({ fetch, params, parent }) {
  const { eventId } = params;
  const parentData = await parent();

  try {
    /**
     * beware of CORS configuration (prefetching evtindex through SSR is preferable here,
     * hence the `.server.js` route)
     * @type {string}
     */
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
