import fetchDocument from "$lib/utils/fetchDocument.js";
import { APP_CONFIG } from "$lib/../config.js";

/**
 * Get the hytek event index and returns the utf-8 encoded HTML page
 *
 * @param params
 * @returns {Promise<{body: *}|{status: number}>}
 */
export async function get({ params, url }) {
  // per meet config w/ meetId...
  const { meetId } = params;
  const { origin } = url;

  let meetConfig;
  try {
    const res = await fetch(`${origin}/meets/${meetId}/config`);
    meetConfig = await res.json();
  } catch (e) {
    console.error('Error fetching event config', e);
  }

  try {
    // get the event list
    // beware of CORS configuration (prefetching evtindex through SSR is preferable here)
    const evtIndexHTML = await fetchDocument(fetch, 'evtindex.htm', {
      encoding: meetConfig.hytekHtmlEncoding, // usually ISO-8859-15 (Latin3)
      baseLocation: meetConfig.hytekFtpLocation, // with trailing slash
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
