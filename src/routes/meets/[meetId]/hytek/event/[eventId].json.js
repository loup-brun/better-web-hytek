import fetchDocument from "$lib/utils/fetchDocument.js";
import { APP_CONFIG } from "$lib/../config.js";

/**
 * Endpoint for use with [eventId].svelte
 *
 * @param params
 * @returns {Promise<{body: {eventHTML: *, error: null}}|{error: {message: string}, status: number}>}
 */
export async function get({ params }) {
  const { eventId } = params;
  console.log('evntId', eventId)

  try {
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: APP_CONFIG.hytekHtmlEncoding,
      baseLocation: APP_CONFIG.hytekFtpLocation,
    });
    return {
      body: {
        eventHTML,
        error: null
      }
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
