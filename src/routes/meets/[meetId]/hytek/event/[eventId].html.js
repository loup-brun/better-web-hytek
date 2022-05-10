import fetchDocument from "$lib/utils/fetchDocument.js";

/**
 * Endpoint for use with [eventId].svelte
 *
 * @param params
 * @returns {Promise<{body: {eventHTML: *, error: null}}|{error: {message: string}, status: number}>}
 */
export async function get({ params, url }) {
  const { eventId, meetId } = params;
  const { origin } = url;

  let meetConfig;
  try {
    const res = await fetch(`${origin}/meets/${meetId}/config`);
    meetConfig = await res.json();
  } catch (e) {
    console.error('Error fetching event config', e);
  }
  try {
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: meetConfig.hytekHtmlEncoding,
      baseLocation: meetConfig.hytekFtpLocation,
    });
    return {
      headers: {
        'Mimetype': 'text/html'
      },
      body: eventHTML,
    };
  } catch (e) {
    return {
      status: 404,
      error: {
        message: 'Épreuve non trouvée.'
      }
    };
  }
}
