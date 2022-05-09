import fetchDocument from "$lib/utils/fetchDocument.js";
import { APP_CONFIG } from "$lib/../config.js";

/**
 * Get the hytek event index and returns the utf-8 encoded HTML page
 *
 * @param params
 * @returns {Promise<{body: *}|{status: number}>}
 */
export async function get({ params }) {
  // per meet config w/ meetId...
  const { meetId } = params;

  try {
    // get the event list
    // beware of CORS configuration (prefetching evtindex through SSR is preferable here)
    const evtIndexHTML = await fetchDocument(fetch, 'evtindex.htm', {
      encoding: APP_CONFIG.hytekHtmlEncoding, // should be ISO-8859-15 (Latin3)
      baseLocation: APP_CONFIG.hytekFtpLocation, // should be adjusted for meetId
    });

    return {
      body: { evtIndexHTML },
    }
  } catch (e) {
    console.error('Error fetching evtindex', e);
    return {
      status: 404,
    }
  }
}
