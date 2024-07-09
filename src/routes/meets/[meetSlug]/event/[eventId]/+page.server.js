import { error } from '@sveltejs/kit';
import fetchDocument from '$lib/utils/fetchDocument';

export async function load({ fetch, params, parent }) {
  const { eventId } = params;
  const parentData = await parent();

  try {
    console.log({ meetConfig: parentData.meetConfig })
    /** @type {string} */
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: parentData.meetConfig.hytekHtmlEncoding,
      baseLocation: parentData.meetConfig.hytekFtpLocation,
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
