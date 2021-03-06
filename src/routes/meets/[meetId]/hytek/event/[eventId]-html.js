import fetchDocument from "$lib/utils/fetchDocument.js";

/**
 * Endpoint for use with [eventId].svelte
 *
 * @param params
 * @returns {Promise<{body: {eventHTML: *, error: null}}|{error: {message: string}, status: number}>}
 */
export async function get({ params, url }) {
  const { eventId, meetId } = params;
  const { origin } = url; // since this is a page endpoint, origin is always current env
  let meetConfig;

  try {
    const res = await fetch(`${origin}/meets/${meetId}/config`);
    const data = await res.json();
    meetConfig = data.meetConfig;
  } catch (e) {
    console.error('Error fetching meet config', e);
  }
  try {
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: meetConfig.hytekHtmlEncoding,
      baseLocation: meetConfig.hytekFtpLocation,
    });
    return {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
      body: eventHTML,
    };
  } catch (e) {
    console.error(`Error fetching event`, e);
    return {
      status: 404,
      error: {
        message: 'Épreuve non trouvée.'
      }
    };
  }
}
