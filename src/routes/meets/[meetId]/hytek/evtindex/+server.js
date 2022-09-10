import { json as json$1 } from '@sveltejs/kit';
import fetchDocument from "$lib/utils/fetchDocument.js";

/**
 * Get the hytek event index and returns the utf-8 encoded HTML page
 *
 * @param params
 * @returns {Promise<{body: *}|{status: number}>}
 */
export async function GET({ params, url }) {
  // per meet config w/ meetId...
  const { meetId } = params;
  const { origin } = url;

  let meetConfig;
  try {
    const res = await fetch(`${origin}/meets/${meetId}/config`);
    const data = await res.json();
    meetConfig = data.meetConfig;
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

    return json$1({ evtIndexHTML })
  } catch (e) {
    console.error('Error fetching evtindex', e);
    return new Response(undefined, { status: 404 })
  }
}
